
var twoSum = function (nums, target) {
    var i = 0;
    var j;
    while (i < nums.length) {
        j = nums.length - 1;
        while (i < j) {
            if (nums[i] === target - nums[j]) {
                return [i, j]
            }
            j--;
        }
        i++;
    }
};

console.log(twoSum([3, 2, 4], 6));

// 两数之和，hash表
var twoSum = function (nums, target) {
    // 求两数之和如果嵌套循环会导致时间复杂度变为O(n^2) 所以可以转换为已知结果和一个值，去寻找差值
    let targetMap = new Map()
    for (let i = 0; i < nums.length; i++) {
        let a = target - nums[i]
        if (targetMap.has(a)) {
            return [targetMap.get(a), i]
        }
        targetMap.set(nums[i], i)
    }
};

// /**
//  * 3数之和
//  * @param {number[]} nums
//  * @return {number[][]}
//  */
// var threeSum = function (nums) {
//     var i = 0, j = 0;
//     var results = [];
//     var hash = new Map();
//     nums = nums.sort((a, b) => a - b)
//     while (i < nums.length - 2) {
//         j = i + 1;
//         while (j < nums.length - 1) {
//             const value = -nums[i] - nums[j];
//             if (hash.has(value)) {
//                 results.push([nums[i], nums[j], value])
//             }
//             hash.set(nums[j], j)
//             j++;
//         }
//         i++;
//     }
//     return results
// };

var threeSum = function (nums) {
    nums = nums.sort((a, b) => a - b)
    let res = []
    for (let i = 0; i < nums.length - 2; i++) {
        if (i >= 1 && nums[i] === nums[i - 1]) {
            continue
        }
        let j = i + 1
        let k = nums.length - 1
        while (j < k) {
            let sum = nums[i] + nums[j] + nums[k]
            if (sum === 0) {
                res.push([nums[i], nums[j], nums[k]])
                j++
                while (nums[j - 1] === nums[j]) {
                    j++
                }
            } else if (sum < 0) {
                j++
            } else {
                k--
            }
        }
    }

    return res
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));

// 16
var threeSumClosest = function (nums, target) {
    var i = 0, j = 0, k = 0;
    var result = 100;
    var l = nums.length;
    while (i < l - 2) {
        if (nums[i] === nums[i - 1]) {
            continue
        }
        j = i + 1;
        while (j < l - 1) {
            if (nums[j] === nums[j - 1]) {
                continue
            }
            k = j + 1;
            while (k < l) {
                const val = Math.abs(nums[i] + nums[j] + nums[k] - target);
                console.log(val, 'val');
                result = Math.min(val, result)
                console.log(result, 'result');
                k++;
            }
            j++;
        }
        i++;
    }
    return target - result;
};

console.log(threeSumClosest([-1, 2, 1, -4], 1));

// m 表示列，n表示行
var uniquePaths = function (m, n) {
    var dp = Array.from({ length: m }, () => Array(n).fill(1));

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    return dp[m - 1][n - 1];
};

console.log(uniquePaths(7, 3));


var minPathSum = function (grid) {
    // 行
    const m = grid.length;
    // 列
    const n = grid[0].length;

    var dp = Array.from({ length: m }, () => Array(n).fill(1));
    dp[0][0] = grid[0][0];

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0) {
                if (j === 0) {
                    continue;
                }
                dp[i][j] = grid[i][j] + dp[i][j - 1]
            } else if (j === 0) {
                dp[i][j] = grid[i][j] + dp[i - 1][j]
            } else {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
            }
        }
    }

    console.log(dp);
    return dp[m - 1][n - 1]
};

console.log(minPathSum(
    [
        [1, 2],
        [1, 1]
    ]
));


var spiralOrder = function (matrix) {
    if (!matrix.length) {
        return [];
    }

    for (let i = 0; i < matrix[0].length; i++) {
        let temp = [];
        for (let j = 0; j < matrix.length; j++) {
            temp.push(matrix[j][matrix[0].length - 1 - i]);
        }
        newArr.push(temp);
    }
};

var topKFrequent = function (nums, k) {
    var obj = {};
    for (let i = 0; i < nums.length; i++) {
        if (obj[nums[i]]) {
            obj[nums[i]] += 1;
        } else {
            obj[nums[i]] = 1;
        }
    }

    return Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, k).map(v => v[0]);
};

console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2));

var lengthOfLongestSubstring = function (s) {
    let map = new Map(), max = 0
    for (let i = 0, j = 0; j < s.length; j++) {
        if (map.has(s[j])) {
            i = Math.max(map.get(s[j]) + 1, i)
        }
        max = Math.max(max, j - i + 1)
        map.set(s[j], j)
    }
    return max
};

//
var s = "leetcode";
var wordDict = ["leet", "code"]
var wordBreak = function (s, wordDict) {
    var wordSet = new Set();
    var check = (s, wordSet, start) => {
        if (start > s.length - 1) {
            return true;
        }
        for (let end = start + 1; end <= s.length; end++) { // 固定start 考察所有的end
            const word = s.slice(start, end);    // 前缀单词
            if (wordSet.has(word) && check(s, wordSet, end)) { // 如果是单词表里的
                return true;                   // 且递归剩余子串的结果是true，则返回true
            }
        }
        return false; // end从start+1到末尾，都没返回true，则返回false
    }

    return check(s, wordSet, 0)
};