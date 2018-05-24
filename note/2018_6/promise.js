/* promise all 接受一个promise的对象数组作为参数，只有当所有的promise都执行到resolve时，或有reject出现时，才会执行 */
var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 'foo')
})

console.log(p3)

Promise.all([p1, p2, p3]).then(val => {
    console.log(val, "all"); // [ 3, 1337, 'foo' ] 'all'
})

var m1 = Promise.resolve(1),
    m2 = Promise.reject(2),
    m3 = Promise.resolve(3);
Promise.all([m1, m2, m3]).then(function(val) {
    //then方法不会被执行
    console.log(val);
}).catch(function(val) {
    console.log(val); // 输出为2
});

/* 如果参数包含非Promise,值将被忽略 ,但仍然会作为参数传回到返回数组中*/

Promise.all([3, 4, 5, p3]).then(val => {
    console.log(val, "include num"); // [ 3, 4, 5, 'foo' ] 'include num'
})

console.log(Object.prototype.toString.call(Promise.resolve(33))); // [object Promise] 本身就是一个promise


/**
 * 手动实现Promise
 * 
 * 记住Promise是和语言无关的，本身就是一种语法糖，在任何语言上都可以复现使用，理解思想最重要
 */

/**
 * new SimplePromise(fn) // 内部参数是resolve和rejected
 */


// resolver为 function(resolve, reject){ ... }
function SimplePromise(resolver) {
    if (resolver && typeof resolver !== 'function') {
        throw new Error('Promise resolver is not a function')
    }
    //当前promise对象的状态
    this.state = "PENDING";
    //当前promise对象的数据（成功或失败）
    this.data = "UNDEFINED";
    //当前promise对象注册的回调队列
    this.callbackQueue = [];
    //执行resove()或reject()方法
    if (resolver) executeResolver.call(this, resolver);
}
SimplePromise.prototype.then = function(onResolved, onRejected) {
    //[标准 2.2.1 - 2.2.2] 状态已经发生改变并且参数不是函数时，则忽略
    if (typeof onResolved !== 'function' && this.state === "RESOLVED" ||
        typeof onRejected !== 'function' && this.state === "REJECTED") {
        return this;
    }

    // 实例化一个新的Promise对象
    var promise = new this.constructor();

    // 一般情况下，状态发生改变时，走这里
    if (this.state !== "PENDING") {
        var callback = this.state === "RESOLVED" ? onResolved : onRejected;
        // 将上一步 resolve(value)或rejecte(value) 的 value 传递给then中注册的 callback
        // [标准 2.2.4] 异步调用callback
        executeCallbackAsync.bind(promise)(callback, this.data);
    } else {
        // var promise = new Promise(resolve=>resolve(1)); promise.then(...); promise.then(...); ...
        // 一个实例执行多次then, 这种情况会走这里 [标准 2.2.6]
        this.callbackQueue.forEach(v => v["resolve"](this.data));
    }

    // 返回新的实例 [标准 2.2.7]
    return promise;
}

// 用于异步执行 .then(onResolved, onRejected) 中注册的回调
function executeCallbackAsync(callback, value) {
    var _this = this;
    setTimeout(function() {
        var res;
        try {
            res = callback(value);
        } catch (e) {
            return executeCallback.bind(_this)('reject', e);
        }

        if (res !== _this) {
            return executeCallback.bind(_this)('resolve', res);
        } else {
            return executeCallback.bind(_this)('reject', new TypeError('Cannot resolve promise with itself'));
        }
    }, 1)
}

// 用于执行 new Promise(function(resolve, reject){}) 中的resove或reject方法
function executeResolver(resolver) {
    //[标准 2.3.3.3.3] 如果resove()方法多次调用，只响应第一次，后面的忽略
    var called = false, // 用来控制resolve响应一次
        _this = this;

    function onError(value) {
        if (called) {
            return;
        }
        called = true;
        //[标准 2.3.3.3.2] 如果是错误 使用reject方法
        executeCallback.bind(_this)('reject', value);
    }

    function onSuccess(value) {
        if (called) {
            return;
        }
        called = true;
        //[标准 2.3.3.3.1] 如果是成功 使用resolve方法
        executeCallback.bind(_this)('resolve', value);
    }

    // 使用try...catch执行
    //[标准 2.3.3.3.4] 如果调用resolve()或reject()时发生错误，则将状态改成rejected，并将错误reject出去
    try {
        resolver(onSuccess, onError);
    } catch (e) {
        onError(e);
    }
}

/**
 * 因为执行 resolved() 或 reject() 内部主要作用是更改当前实例的状态为 rejected 或 resolved，
 * 然后执行当前实例 then() 中注册的 成功或失败的回调函数， 所以从过程上来看，大致是相同的，抽象出来共用
 */

// 用于执行成功或失败的回调 new Promise((resolve, reject) => { resolve(1)或 reject(1) })
function executeCallback(type, x) {
    var isResolve = type === 'resolve',
        thenable;

    // [标准 2.3.3] 如果x是一个对象或一个函数
    if (isResolve && (typeof x === 'object' || typeof x === 'function')) {
        //[标准 2.3.3.2]
        try {
            thenable = getThen(x);
        } catch (e) {
            return executeCallback.bind(this)('reject', e);
        }
    }
    if (isResolve && thenable) {
        executeResolver.bind(this)(thenable);
    } else {
        //[标准 2.3.4]
        this.state = isResolve ? "RESOLVED" : "REJECTED";
        this.data = x;
        this.callbackQueue && this.callbackQueue.length && this.callbackQueue.forEach(v => v[type](x));
    }
    return this;
}

/**
 * 用于判断是否是thenable对象，如果是，则返回一个执行thenable中then方法的函数
 */
function getThen(obj) {
    var then = obj && obj.then;
    if (obj && typeof obj === 'object' && typeof then === 'function') {
        return function appyThen() {
            then.apply(obj, arguments);
        };
    }
}




/**
 * 如果要想实现连续异步，必须确保then返回的也是一个Promise实例，这样才能保证连续then之后代码
 * 顺序一直性，要不然then之后就会一直是同步调用
 * 
 * 
 */

/* 
   浏览器的事件轮循是4ms间距，nodejs中的Event Loop是1ms，为了确保then中的回调执行顺序，onFulfilled或onRejected必须
   是异步调用，在浏览器里，只能使用settimeout，如果是nodejs环境下，可以用immediate模块来实现异步无延迟执行回调
*/