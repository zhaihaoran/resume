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

console.log(searchMatrix1([[3, 4]], 3)); //1