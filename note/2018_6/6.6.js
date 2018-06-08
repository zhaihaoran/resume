// leetcode

/**
 * 搜索二维矩阵
 * 
 * 复杂度O(log(n)) + O(log(m))
 * 
 * @param matrix: matrix, a list of lists of integers
 * @param target: An integer
 * @return: a boolean, indicate whether matrix contains target
 */
const searchMatrix = function(matrix, target) {
    var row = 0;
    if (matrix.length === 0) {
        return false;
    }
    for (var i = 0; i < matrix.length; i++) {
        let last = matrix[i].pop()
        if (last < target) {
            continue;
        } else if (last === target) {
            return true;
        } else {
            row = i;
            break;
        }
    }
    for (var j = 0; j < matrix[row].length; j++) {
        if (matrix[row][j] === target) {
            return true;
        } else {
            continue;
        }
    }
    return false;
}

console.log(searchMatrix([
    [5]
], 5));

console.log(searchMatrix([], 1));


/**
 * 给定一个整数数组和一个整数 k，找出 k 个不重叠子数组使得它们的和最大。每个子数组的数字在数组中的位置应该是连续的。
 * 
 * 动态规划 local[i][j] = Math.max(local[i-1][j],global[i-1][j-1]) + nums[i-1]
 * 
 * @param nums: A list of integers
 * @param k: An integer denote to find k non-overlapping subarrays
 * @return: An integer denote the sum of max k non-overlapping subarrays
 */
// const maxSubArray = function(nums, k) {
//     for (var i = 0; i < nums.length; i++) {

//     }
// }



/**
 * 给定一个整数数组，找到一个具有最大和的子数组，返回其最大和。
 * 
 * @param nums: A list of integers
 * @return: A integer indicate the sum of max subarray
 */
const maxSubArray = function(nums) {
    var l = nums.length;
    var ans = -10000; //初始化值
    for (var i = 0; i < l; i++) {
        for (var j = i; j < l; j++) {
            let sum = 0;
            for (var k = i; k < j; k++) {
                sum += nums[k];
            }
            if (sum > ans) {
                ans = sum;
            }
        }
    }
    return ans;
}
/* 暴力枚举出所有子集合 复杂度n^3 */
let num = [-2, 2, -3, 4, -1, 2, 1, -5, 3]
console.log(maxSubArray(num));

/* 
    贪心法，将子串和为负数的子串丢掉，只保留和为正的子串 O(n)
*/
function maxSubArray1(nums) {
    var l = nums.length;
    var ans = -10000;
    var sum = 0;
    for (var i = 0; i < l; i++) {
        sum += nums[i];
        if (sum > ans) {
            ans = sum;
        }
        if (sum < 0) {
            sum = 0; // 子串和为负数，丢掉
        }
    }
    return ans
}

console.log(maxSubArray1(num));


/**
 * 寻找第K大个数
 * 
 * @param n: An integer
 * @param nums: An array
 * @return: the Kth largest element
 */
const kthLargestElement = function(n, nums) {
    if (n === 1) {
        return Math.max.apply(null, nums);
    }

    let i,
        l = nums.length,
        left = [],
        right = [],
        pivot = nums[~~(Math.random() * l)];

    for (i = 0; i < l; i++) {
        if (nums[i] > pivot) {
            right.push(nums[i])
        } else {
            left.push(nums[i])
        }
    }

    if (right.length > n) {
        return kthLargestElement(n, right);
    } else if (right.length === n) {
        return Math.min.apply(null, right);
    } else {
        n = n - right.length;
        return kthLargestElement(n, left);
    }
}

console.log(kthLargestElement(10, [1, 2, 3, 4, 5, 6, 8, 9, 10, 7])); // 1
console.log(kthLargestElement(4, [9, 3, 2, 4, 8])); // 3


/**
 * 给一个整数数组，找到两个数使得他们的和等于一个给定的数 target。
 * 
 * @param numbers: An array of Integer
 * @param target: target = numbers[index1] + numbers[index2]
 * @return: [index1, index2] (index1 < index2)
 */
const twoSum = function(numbers, target) {
    var _array = numbers.concat(),
        i, l = _array.length;

    // 两两相加
    for (i = 0; i < l; i++) {
        for (var j = i + 1; j < l; j++) {
            if (_array[i] + _array[j] === target) {
                return [i, j]
            }
        }
    }
    return -1;
}

console.log(twoSum([2, 7, 11, 15], 9));

/**
 * 给定一个整型数组，找到主元素，它在数组中的出现次数严格大于数组元素个数的1/k。
 * 数组只有唯一主元素
 * 
 * @param nums: A list of integers
 * @param k: An integer
 * @return: The majority number
 */
const majorityNumber = function(nums, k) {
    var i, l = nums.length,
        obj = {};
    var temp = ~~(l * 1 / k); // 中间数
    for (i = 0; i < l; i++) {
        if (nums[i] in obj) {
            obj[nums[i]] += 1;
        } else {
            obj[nums[i]] = 1;
        }
        // 因为是唯一主元素
        if (obj[nums[i]] > temp) {
            return nums[i];
        }
    }
}


console.log(majorityNumber([3, 1, 2, 3, 2, 3, 3, 4, 4, 4], 3));

/**
 * 搜索二维矩阵 II
 * 
 * 写出一个高效的算法来搜索m×n矩阵中的值，返回这个值出现的次数。
 * 每行中的整数从左到右是排序的。
 * 每一列的整数从上到下是排序的。
 * 在每一行或每一列中没有重复的整数。
 * 
 * @param matrix: A list of lists of integers
 * @param target: An integer you want to search in matrix
 * @return: An integer indicate the total occurrence of target in the given matrix
 */
const searchMatrix1 = function(matrix, target) {
    var i, l = matrix.length,
        num = 0;
    for (i = 0; i < l; i++) {
        var row = matrix[i];
        var j, jl = row.length;
        for (j = 0; j < jl; j++) {
            if (row[j] === target) {
                num += 1;
                break;
            }
        }
    }
    return num;
}

console.log(searchMatrix1([
    [1, 3, 5, 7],
    [2, 4, 7, 8],
    [3, 5, 9, 10]
], 3)); // 2

console.log(searchMatrix1([
    [3, 4]
], 3)); //1

/* 
    贪心问题：活动安排
    
    有n个在同一天使用同一个教师的活动a1,a2,.....an。教师只能由一个活动使用。每个活动都有一个开始时间si和结束时间fi。一旦被选择后，活动ai就占据半开时间区间[si,fi)。如果[si,fi]和[sj,fj]互不重叠，ai和aj两个活动就可以被安排在这一天,
    那么如果安排尽可能多的活动而且不冲突呢？

    策略：每次选取结束时间最早的活动。这样也更容易为后面的活动留下尽可能多的时间。
    todo:
*/

/* 
    贪心问题： 找零问题

    假设有数目不限的面值为20,10,5,1的硬币。 给出需要找零数，求出找零方案，要求：使用数目最少的硬币

    策略：每次选取可供钱币最大值，需要找钱25时，为20+5，而不是10+10+5
*/

let moneys = [20, 10, 5, 1];

/* m 为可供找零的面值 n为找零数 */
function greedyMoney(m, n) {
    let result = [];
    for (var i = 0; i < m.length; i++) {
        while (n >= m[i] && n > 0) {
            result.push(m[i])
            n = n - m[i];
        }
    }
    return result;
}

console.log(greedyMoney(moneys, 23));
console.log(greedyMoney(moneys, 25));

/* 贪心的问题是，策略必须证明后才能真正运用到算法中，也就是说，你的策略事先一定确认是有效的 */

/* 
    贪心：小船过河

    只有一艘船，能乘2人，船的运行速度为2人中较慢一人的速度，过去后还需一个人把船划回来，问把t个人运到对岸，最少需要多久

    假设t个人的速度按升序排列

    策略：
    1. .最快的和次快的过河，然后最快的将船划回来；次慢的和最慢的过河，然后次快的将船划回来，所需时间为：t[0]+2*t[1]+t[n-1]；
    2. .最快的和最慢的过河，然后最快的将船划回来，最快的和次慢的过河，然后最快的将船划回来，所需时间为：2*t[0]+t[n-2]+t[n-1]

    每次运行不影响他人，所以具有贪心子结构。
*/

let array = [1, 2, 3, 4, 5, 6, 7, 9, 12, 15] // 10个人，每个人过河花费时间对应为1,2,...n

function greedyBoat(arr) {
    let total = 0; // 总用时
    while (arr.length > 0) {
        var l = arr.length;
        // 如果人数剩余3人
        if (l === 3) {
            total += arr[0] + arr[1] + arr[2];
            break;
        }
        // 如果人数剩余2人
        if (l === 2) {
            total += arr[1];
            break;
        }
        // 如果人数剩余1人
        if (l === 1) {
            total += arr[0];
            break;
        }
        // 一次过河用时
        total += Math.min.apply(null, [arr[l - 1] + 2 * arr[0] + arr[l - 2], arr[0] + 2 * arr[1] + arr[l - 1]])
        // 同时去除数组末尾两个数字
        arr.length -= 2;
    }
    return total;
}

console.log(greedyBoat(array));

/**
 * 最佳见面地点
 * 
 * 有一群住在不同地方的朋友（两个或以上）想要在某地见面，要求他们去往目的地的路程和最短。现在给一个0、1组成的二维数组，1表示此地有一个人居住。使用曼哈顿距离作为计算总距离，公式为：(p1, p2) = |p2.x - p1.x| + |p2.y - p1.y|
 * 
 * @param grid: a 2D grid
 * @return: the minimize travel distance
 */
// const grid = [
//     [1, 0, 0, 0, 1],
//     [0, 0, 0, 0, 0],
//     [0, 0, 1, 0, 0],
// ]
// const minTotalDistance = function(grid) {
//     /* 分别计算水平最佳点和垂直最佳点，组合起来就是最佳的见面地点 */
//     /* 一维寻找最佳点是两位夹逼法 */
//     let i = 0,
//         j = grid[0].length - 1;

//     while (true) {
//         while (i < j && grid[0] === 0) {
//             i += 1;
//         }
//     }
// }

/* 生成斐波那契数列 */

function iterFib(n) {
    if (n < 2) {
        return n;
    }
    var last = 1,
        nextlast = 1,
        result = 1,
        i;
    for (i = 2; i < n; i++) {
        result = last + nextlast;
        nextlast = last;
        last = result;
    }
    return result;
}

console.log(iterFib(2));


/* 寻找两个字符串中的最长公共子串 */

function lcs(word1, word2) {
    var max = 0;
    var index = 0;
    var lcsarr = new Array(word1.length + 1);
    for (var i = 0; i <= word1.length + 1; ++i) {
        lcsarr[i] = new Array(word2.length + 1);
        for (var j = 0; j <= word2.length + 1; ++j) {
            lcsarr[i][j] = 0;
        }
    }
    /* 上述为声明一个长度i，宽度j的二维数组，内部值均为0 */
    /*  */
    for (var i = 0; i <= word1.length; ++i) {
        for (var j = 0; j <= word2.length; ++j) {
            if (i == 0 || j == 0) {
                lcsarr[i][j] = 0;
            } else {
                if (word1[i - 1] == word2[j - 1]) {
                    lcsarr[i][j] = lcsarr[i - 1][j - 1] + 1;
                } else {
                    lcsarr[i][j] = 0;
                }
            }
            if (max < lcsarr[i][j]) {
                max = lcsarr[i][j];
                index = i;
            }
        }
    }
    var str = "";
    if (max == 0) {
        return "";
    } else {
        for (var i = index - max; i <= max; ++i) {
            str += word2[i];
        }
        return str;
    }
}

console.log(lcs("aaabbcca","abbcaka"));
