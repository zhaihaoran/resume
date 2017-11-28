/**
 * fibonacci
 */

// 1.递归实现，效率极低，在js语言中，超过30就会卡成狗
const time = 40;

function recurFib(n) {
    if (n < 2) {
        return n;
    }
    return recurFib(n - 1) + recurFib(n - 2)
}
console.time("recurFib")
console.log(recurFib(time))
console.timeEnd("recurFib")
/**
 * 为什么会很慢？
 * 
 * 很明显，因为有很多值在递归中被重新计算并被记录下来，实际上很多都只是作为中间值而已。
 */

// 2. 采用动态规划实现
function dynFib(n) {
    // 先创建一个长度为n+1，全为0的数组
    let val = Array.from({
        length: n + 1
    }).fill(0);

    if (n === 0 || n === 1) {
        val[n] = n;
    } else {
        val[1] = 1;
        for (let i = 2; i <= n; i++) {
            val[i] = val[i - 1] + val[i - 2]
        }
    }
    // 此数组即为斐波那契数列
    console.log(val)
    return val[n]
}

console.time("recurFib")
console.log(dynFib(5))
console.timeEnd("recurFib")

console.log(Array.from({
    length: 0
}))

/**
 * 背包问题 (01)
 * 
 * 保险箱中有5个宝物，它们的尺寸分别为3,4,7,8,9; 价值分别为4,5,10,11,13，且背包的容积为16，问如何取确保价值最大，价值多少？
 * 
 * 
 * 有n个物品，每个物品的重量为weight[i]，每个物品的价值为value[i]。现在有一个背包，它所能容纳的重量为total
 * 问：当你面对这么多有价值的物品时，你的背包所能带走的最大价值是多少？
 * 
 * 其中tab为价值，i表示放第几个物体，j表示背包的容量
 * 
 * 状态公式：tab[i][j] = max(tab[i-1][j-weight[i]]+value[i],tab[i-1][j]) ({i,j|0<i<=n,0<=j<=total})
 * 
 * 其中tab[i-1][j]为装到上一个物体在背包中的最佳值， 
 */

/**
 * 动态规划方案
 * 。
 * 核心就是使用数组保存临时数据，即解决子问题并记录子问题的解，这样就不用重复解决子问题了
 * 
 * @param {any} capacity 背包体积
 * @param {any} size 宝物尺寸
 * @param {any} value 价值
 * @param {any} n 几个物体
 */
function knapsack(capacity, size, value, n) {
    // 建立数组保存临时数据
    let K = Array.from({
        length: capacity + 2
    }).fill([]);

    for (let i = 0; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (i == 0 || w == 0) {
                K[i][w] = 0;
            } else if (size[i - 1] <= w) {
                K[w][w] = Math.max(value[i - 1] + K[i - 1][w - size[i - 1]], K[i - 1][w]);
            } else {
                K[i][w] = K[i - 1][w];
            }
        }
    }
    console.log(K);
    return K[n][capacity];
}

var value = [4, 5, 10, 11, 13];
var size = [3, 4, 7, 8, 9];
var capacity = 16;
var n = 5;

console.log(knapsack(capacity, size, value, n));



console.log(Array.from({
    length: 10
}).fill([]))


/**
 * 无序数组查找
 * 
 * @param {any} arr 
 * @returns 
 */

// 查找最大值
function findMax(arr) {
    return arr.reduce((l, c) => {
        return l > c ? l : c;
    })
}

// 查找最小值
function findMin(arr) {
    return arr.reduce((l, c) => {
        return l < c ? l : c;
    })
}

const arrs = [1, 2, 3, 4, 5, 1, 7, 4, 8, 5, 2, 4];

console.log(findMin(arrs))
console.log(findMax(arrs))

/**
 * 有序数组查找，最好方式是二分查找
 */

function binSearch(arr, data) {
    var length = arr.length;
    var upperBound = length - 1;
    var lowerBound = 0;
    while (lowerBound <= upperBound) {
        var mid = Math.floor((upperBound + lowerBound) / 2);
        if (arr[mid] < data) {
            lowerBound = mid + 1;
        } else if (arr[mid] > data) {
            upperBound = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}

console.log(binSearch([1, 2, 3, 4, 5, 6, 9, 13, 15, 17, 18, 20], 4))

/**
 * 随机排序
 */
function randomSort1(array) {
    var result = array.slice(0);
    result.sort(function() {
        return Math.random() - 0.5;
    })
    return result;
}

function randomSort2(array) {
    var result = array.slice(0),
        i, len = result.length;
    for (i = 0; i < len; i++) {
        var rand = parseInt(Math.random() * (len - i), 10);
        [result[i], result[rand]] = [result[rand], result[i]]
    }
    return result;
}

var sortArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(randomSort1(sortArr));
console.log(randomSort2(sortArr));

// 写一个通用的事件侦听器函数
var Event = {
    // 页面加载完成后
    ready: function(fn) {
        if (fn === null) {
            fn = document
        }
        var oldonload = window.onload;
        // window.onload 默认是null
        if (typeof window.onload !== 'function') {
            window.onload = fn;
        } else {
            // 说明之前有绑定的函数
            window.onload = function() {
                oldonload();
                fn();
            }
        }
    },

    add: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false)
            // ie
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, function() {
                handler.call(element);
            });
        } else {
            element['on' + type] = handler;
        }
    },


    remove: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false)
        } else if (element.datachEvent) {
            element.datachEvent('on' + type, handler)
        } else {
            element['on' + type] = handler
        }

    }
}