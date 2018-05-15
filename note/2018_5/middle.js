/* koa 中间件 */

// var koa = require('koa');
// var app = koa();

// // response-time中间件
// app.use(function*(next) {
//     var start = new Date;
//     yield next;
//     var ms = new Date - start;
//     this.set('X-Response-Time', ms + 'ms');
// });

// // logger中间件
// app.use(function*(next) {
//     var start = new Date;
//     yield next;
//     var ms = new Date - start;
//     console.log('%s %s - %s', this.method, this.url, ms);
// });

// // 响应中间件
// app.use(function*() {
//     this.body = 'Hello World';
// });

// app.listen(3000);

/* 执行顺序： */

/**
 *  更详细描述就是：请求进来，先进到response-time中间件，执行 var start = new Date; 然后遇到yield next，则暂停         response-time中间件的执行，跳转进logger中间件，同理，最后进入响应中间件，响应中间件中没有yield next代码，则开始逆序执行，也就是再先是回到logger中间件，执行yield next之后的代码，执行完后再回到response-time中间件执行yield next之后的代码
 */

/**
 * 整个co函数说白了，就是Promise递归调用generator的next方法，并且在后一次调用的时候把前一次返回的数据传入，直到调用完毕。而co函数同时把非Promise对象的function、generator、array等也组装成了Promise对象
 */


/* co的简易实现 */

function co(generator) {
    var gen = generator();

    var next = function(data) {
        var result = gen.next(data);

        if (result.done) {
            return;
        }

        if (result.value instanceof Promise) {
            result.value.then(function(d) {
                next(d);
            }, function(error) {
                next(error)
            })
        } else {
            next();
        }
    }

    next();
}

co(function*() {
    var text1 = yield new Promise(function(resolve) {
        setTimeout(function() {
            resolve("I am text1");
        }, 1000)
    })

    console.log(text1);

    var text2 = yield new Promise(function(resolve) {
        setTimeout(function() {
            resolve("I am text2")
        })
    })

    console.log(text2);
})


