let obj = {
    *[Symbol.iterator]() {
        yield this.mask;
        yield this.old;
        yield 3;
    },
    mask: "abcs",
    old: "jllk"
}

/* array.from 主要用于类数组对象和可迭代对象转化为数组,同时可以做转化 */
console.log(Array.from(obj, item => item + 1)); // [ 'abcs1', 'jllk1', 4 ]


/**
 * 求出从矩阵长为n,宽为m左上角到右下角，且只能向右向下移动，一共有多少种可能性
 */

let uniquePaths = function(m, n) {
    const pos = new Array(m)
    for (let i = 0; i < m; i++) {
        pos[i] = new Array(n);
    }

    for (let i = 0; i < n; i++) {
        pos[0][i] = 1;
    }

    for (let i = 0; i < m; i++) {
        pos[i][0] = 1
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            pos[i][j] = pos[i - 1][j] + pos[i][j - 1]
        }
    }

    return pos[m - 1][n - 1]
}

console.log(uniquePaths(4, 4));
/* 这题就是使用了动态规划dp逐步列出每一格的可能性，最后返回右下角的可能性。 */


/* js 执行机制 */

setTimeout(function() {
    console.log('定时器开始啦')
});

new Promise(function(resolve) {
    console.log('马上执行for循环啦');
    for (var i = 0; i < 10000; i++) {
        i == 99 && resolve();
    }
}).then(function() {
    console.log('执行then函数啦')
});

console.log('代码执行结束');

/* 输出顺序是什么 */


/**
 * js首先是单线程语言，执行时从上到下，所有的任务可以分为两类：
 * 
 * 同步任务
 * 异步任务
 * 
 * 执行过程如下：
 * 
 * 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数。
 * 当指定的事情完成时，Event Table会将这个函数移入Event Queue。
 * 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。
 * 上述过程会不断重复，也就是常说的Event Loop(事件循环)。
 */

/**
 * 除了广义的同步任务和异步任务，我们对任务有更精细的定义：
 * 
 * macro-task 宏任务、包括整体代码script、setTimeout、setInterval
 * micro-task 微任务：Promise、process.nextTick
 */


console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})

new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})

// 1 - 7 - 6 - 8 - 2 - 4 - 3 - 5 - 9 - 11 - 10 - 12  前端浏览器环境！
// 1 - 7 - 6 - 8 - 2 - 4 - 9 - 11 - 3 - 10 - 5 - 12  后端node环境下，因为node环境下事件监听依赖libuv，与前端环境不相同，输出会有误差

const first = () => (new Promise((resovle, reject) => {
    console.log(3);
    let p = new Promise((resovle, reject) => {
        console.log(7);
        setTimeout(() => {
            console.log(5);
            resovle(6);
        }, 0)
        resovle(1);
    });
    resovle(2);
    p.then((arg) => {
        console.log(arg);
    });

}));

first().then((arg) => {
    console.log(arg);
});
console.log(4);

// 3 - 7 - 4 - 1 - 2 - 5 - 6 错！
// 3 - 7 - 4 - 1 - 2 - 5   6不会输出，因为p这个Promise的状态一旦改变，就不会存在了。所以最终输出顺序不会包含6