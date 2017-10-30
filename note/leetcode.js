// Longest Substring without Repeating Characters

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    const map = {};
    let left = 0;
    return s.split('').reduce((max, v, i) => {
        left = map[v] >= left ? map[v] + 1 : left;
        map[v] = i;
        return Math.max(max, i - left + 1);
    }, 0)
};

console.log(lengthOfLongestSubstring("abcabcbb"));
console.log(lengthOfLongestSubstring("pwwkew"));

/**
 * 将N维数组展开为一维
 */
var foo0 = [1, [2, 3],
    [4, 5, [6, 7, [8]]],
    [9], 10
];
console.log(foo0);
var foo1 = foo0.join(",").split(",");
console.log(foo1)

/**
 * 测量是否是质数
 * 
 * 通过构造111111，让正则引擎实现一个除法
 */
function isPrime(n) {
    return !(/^.?$|^(..+?)\1+$/).test('1'.repeat(n))
}

1e3

/**
 * 插入排序
 */

function insertSort(array) {
    let result = array.slice(0),
        i, j, l = array.length,
        temp;
    // 从第二个元素开始插入
    for (i = 1; i < l; i++) {
        // temp为需要插入的元素
        temp = result[i];
        j = i - 1;
        while (j >= 0 && temp < result[j]) {
            // 如果需要插入的值大于比较值，则腾位置
            result[j + 1] = result[j];
            j--;
        }
        result[j + 1] = temp;
    }
    return result;
}

console.log(insertSort([2, 3, 1, 4, 5, 8, 6, 12, 10]))

/**
 * 二分插入排序
 * 
 * 先在排好的有序区通过二分查找找好移动元素的位置
 * 然后直接将起始位置的所有元素后移腾位置
 */

function binaryInsertSort(array) {
    let i, j, l = array.length,
        high, mid, low,
        temp, result = array.slice(0);
    for (i = 1; i < l; i++) {
        temp = result[i]
        high = i - 1;
        low = 0;
        while (low <= high) {
            mid = ~~((low + high) / 2);
            if (temp < result[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        // 找到了插入元素的位置mid,开始腾地方
        for (j = i - 1; j >= high + 1; j--) {
            // 右移
            result[j + 1] = result[j];
        }
        // 平移完后，再将temp 复值给result[j+1]
        result[j + 1] = temp;
    }
    return result;
}

console.log(binaryInsertSort([2, 3, 1, 4, 5, 8, 6, 12, 10]))

/**
 * 冒泡排序
 * 
 * 冒泡优化，如果一边遍历数组不产生变化时，说明数组已经有序，结束排序
 */

function bubbleSort(array) {
    let i, l = array.length,
        exchange,
        result = array.slice(0);
    for (i = 0; i < l; i++) {
        exchange = false;
        // 从最右侧开始，将最小的依次放到左边
        for (j = l - 1; j > i; j--) {
            // 如果左大于右
            if (result[j] < result[j - 1]) {
                [result[j], result[j - 1]] = [result[j - 1], result[j]]
                exchange = true;
            }
        }
        // 如果没有变化则说明已经遍历完成，直接返回数组即可
        if (!exchange) {
            return result;
        }
    }
    return result;
}

console.log(bubbleSort([2, 3, 1, 4, 5, 8, 6, 12, 10]))

/**
 * 快速排序
 * 
 * 1.递归实现
 * 2.迭代实现
 * 3.不能影响原数组
 */

function quickSort(array) {
    var tmp_array = array.slice(0),
        result,
        _sort = function(arr) {
            if (arr.length <= 1) {
                return arr;
            }
            var pivotIndex = ~~(arr.length / 2);
            var pivot = arr.splice(pivotIndex, 1)[0];
            var left = [],
                right = [],
                i, l = arr.length;

            for (i = 0; i < l; i++) {
                if (arr[i] < pivot) {
                    left.push(arr[i])
                } else {
                    right.push(arr[i])
                }
            }

            return _sort(left).concat([pivot], _sort(right));
        };
    result = _sort(tmp_array);
    return result;
}

console.log(quickSort([2, 3, 1, 4, 5, 8, 6, 12, 10]))