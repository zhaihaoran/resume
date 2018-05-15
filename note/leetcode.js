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


/* 判断质数 */
function isPrimes(n) {
    if (typeof n !== "number" || !Number.isInteger(n)) {
        return false;
    }

    if (n == 2 || n === 3 || n == 1) {
        return true;
    } else if (n % 2 == 0) {
        return false;
    } // 排除偶数

    // 依次判断能否被奇数整除,循环最大值为更号n，因为一个数为如果可以分解，一定是有两个数的，其中一个大于sqrtn,另一个小于sqrt（n），所以只需要遍历到sqrt（n）
    // 质数分布的规律：大于等于5的质数一定和6的倍数相邻。例如5和7，11和13,17和19等等；
    // 此时判断质数可以6个为单元快进，即将方法（2）循环中i++步长加大为6，加快判断速度，原因是，假如要判定的数为n，则n必定是6x-1或6x+1的形式，对于循环中6i-1，6i，6i+1,6i+2，6i+3，6i+4，其中如果n能被6i，6i+2，6i+4整除，则n至少得是一个偶数，但是6x-1或6x+1的形式明显是一个奇数，故不成立；另外，如果n能被6i+3整除，则n至少能被3整除，但是6x能被3整除，故6x-1或6x+1（即n）不可能被3整除，故不成立。综上，循环中只需要考虑6i-1和6i+1的情况，即循环的步长可以定为6，每次判断循环变量k和k+2的情况即可，理论上讲整体速度应该会是方法（2）的3倍
    if (n % 6 !== 1 && n % 6 !== 5) {
        return false;
    }

    for (var i = 5; i <= Math.sqrt(n); i += 6) {
        if (n % i === 0 || (n + 2) % i === 0) {
            return false;
        }
    }
    return true;
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

function quickSorts(array) {
    if (array.length <=1) {
        return array;
    }
    let pivot = array.splice(~~(array.length/2),1)[0];
    let left = [],right = [],i,l=array.length;
    for(i=0;i<l;i++) {
        if(array[i]<pivot) {
            left.push(pivot)
        } else {
            right.push(pivot)
        }
    }
    return quickSorts(left).concat([pivot],quickSorts(right))
}

console.log(quickSorts([2, 3, 1, 4, 5, 8, 6, 12, 10]))