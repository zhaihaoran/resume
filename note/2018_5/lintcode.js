/* 面试算法 */

var arr = [1, 3, 5, 7, 9, 11, 13, 15, 17];

// 传入一个参数，返回这个参数在arr里的位置pos

// 1 --- 0    
// 7 --- 3
// 11 --- 5 //靠左的一个
// 要求：1. 二分查找  2. 非递归实现

function findIndex(arr, n) {
    let low = 0,
        high = arr.length - 1,
        mid;
    while (low <= high) {
        mid = ~~((low + high) / 2);
        if (n === arr[mid]) {
            return mid;
        }
        if (n < arr[mid]) {
            high = mid - 1;
        }
        if (n > arr[mid]) {
            low = mid + 1;
        }
    }
    return -1;
}


var arrs = [1, 3, 5, 7, 9, 11, 11, 13, 15, 17];

function findIndex(arr, pos) {
    let low = 0,
        high = arr.length - 1;
    while (low <= high) {
        let mid = ~~((low + high) / 2);
        if (pos > arr[mid]) {
            high = mid - 1;
        }
        if (pos < arr[mid]) {
            low = mid + 1;
        }
        if (pos === arr[mid]) {
            return mid;
        }
    }
    return -1;
}

console.log(findIndex(arrs, 5));


/* trim 实现 */
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, '')
}

let testAry = [5, 4, 2, 9, 1, 5, 3, 12, 16, 14]

function bubleSort(arr) {
    let i, l = arr.length;
    for (i = 0; i < l; i++) {
        for (j = l - 1; j > i; j--) {
            /* 从后往前冒！ */
            if (arr[j] < arr[j - 1]) {
                [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
            }
        }
    }
    return arr
}

console.log(bubleSort(testAry));


/* 八皇后 */
/**
 * 算法竞赛 ---- 回溯法
 */

/* row:第n行，total：总可能数， */
var n = 8;
var arr = [];
var total = 0;

function queen(index) {
    if (index === n) {
        console.log(arr); //每次完成一种情况，输出数组；
        total++;
    } else {
        for (var i = 0; i < n; ++i) {
            arr[index] = i; //为第一行的皇后寻找位置，从0开始，直到7
            var flag = true; //这里主要是为判定可攻击性提供一个开关，如果在攻击范围内
            // 则不进入下一列，继续向下寻找，如果找到了合适的位置，则进入下一行
            for (var j = 0; j < index; ++j) {
                //这里是为了判定攻击范围，把所有已经放置的皇后与当前放置的皇后做位置计算，如果在攻击范围内，flag为false，不在所有已经放置的皇后的攻击范围内，则不改变flag的属性：true
                if (arr[index] === arr[j] || arr[index] - arr[j] === index - j || arr[index] - arr[j] === j - index) {
                    flag = false;
                    break;
                };
            };
            if (flag) {
                //这里是根据flag的属性判定是否进入下一行的循环；
                queen(index + 1);
            }
        }
    }

};
queen(0); //从第0行进行试探
console.log(total);