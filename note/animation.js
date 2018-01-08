function log() {
    // arguments 转数组
    /**
     * 1.Array.prototype.slice.call(arguments)
     * 2.Array.from
     */
    var array = Array.from(arguments);
    array.unshift('(app)');

    console.log.apply(console, array);
}

function spacify(str) {
    return str.split('').join(' ');
}

log('222');
log('222', '2123');
console.log(spacify('kljk'));

String.prototype.spacify = function(space) {
    console.log(this);
    return this.split('').join(space);
};

console.log('asds'.spacify(' '));

// 实现bind函数,为了兼容老浏览器
Function.prototype.bind =
    Function.prototype.bind ||
    function(context) {
        var self = this;
        return self.apply(context, arguments);
    };

/**
 * generator
 */

function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

var hw = helloWorldGenerator();

var a = hw.next();
console.log(a);
var b = hw.next();
console.log(b);
var c = hw.next();
console.log(c);
var d = hw.next();
console.log(d);

function* notes(i) {
    console.log(i);
}
// 可以作为函数暂缓执行，直到调用next才执行
var generator = notes(22);

setTimeout(() => {
    generator.next();
}, 2000);

// yield 只能放在*函数中，而且，如果在表达式中，需要放在圆括号里,yield 本身是没值的，本身代表的是next传入的值
function* demos() {
    // 必须分开申明，要不然就直接用yield
    console.log('hello ' + (yield));
    console.log('hello ' + (yield));
    console.log('hello ' + (yield));
}

var tlm = demos();
// next 的参数会传给上一个yield表达式的返回值

tlm.next(1);
tlm.next(2);
tlm.next(3);
tlm.next(4);
tlm.next(5);

// 2,3,4

/**
 * 执行过程分析：
 *
 * 首先，调用next(1)时，函数走到第一个console.log的yield时，停止，因为没有执行完第一个console.log，所以没有任何值打印出来
 * 调用next(2)时，给上一个截止的yield赋值为2，然后继续执行，走到第二个yield停止，此时会把第一个console.log打印出来，值自然是2
 * 调用next(3)时，给上一个截止的yield赋值为3，然后继续执行，走到第三个yield停止，此时会把第二个console.log打印出来，值自然是3
 * 同理
 */

/**
 * generator 实现斐波那契
 * 两种生成条件
 *
 * @param {any} index 数列长度
 * @param {any} maxValue 末尾最大值
 * @returns
 */
var fibonacii = function(index, maxValue) {
    let array = [];

    function* fibon() {
        let [prev, curr] = [0, 1];
        for (let i = 0; i < index; i++) {
            [prev, curr] = [curr, prev + curr];
            yield curr;
        }
    }
    for (let n of fibon()) {
        if (n > maxValue) {
            break;
        }
        array.push(n);
    }
    return array;
};

// 最大值为多少的斐波那契数列
var asd = fibonacii(4, 1000);
console.log(asd);

/**
 * 状态机
 *
 * 最适合用generator生成
 */

/**
 * example：
 *
 * clock函数有两种状态，tick和tock，每运行一次就改变一次状态
 */
var clock = function*() {
    while (true) {
        console.log('Ticks');
        yield;
        console.log('Tocks');
        yield;
    }
};

var clocks = clock();

clocks.next();
clocks.next();
clocks.next();
