/* 
    Google 花盆问题

    一个长条花坛里有若干并排的花槽，有些花槽中已经种了花，有些则还没种花。然而，不能将两株花种在相邻的花槽否则它们会争夺水分导致两者都枯萎。给定一个花坛的种植情况flowerbed（一个包含0和1的数组，0表示该花槽为空，1表示该花槽已经种了花），以及一个数n，问是否可以再种下新的n株花且满足相邻花槽不能同时种花的条件。

    样例 1

    输入： flowerbed = [1,0,0,0,1], n = 1
    输出： True

    样例 2

    输入： flowerbed = [1,0,0,0,1], n = 2
    输出： False

    注意

    输入数组本身满足相邻花槽不同时种花的条件。
    输入数组的长度范围为[1, 20000]。
    n是非负整数且大小不会超过输入数组的长度。
*/


/**
 *  贪心法：尽可能让花种的密集，从左到右依次扫描，如果可以种就种，看最后可以种的数目是否大于n来判断
 *
 * @param {*} flowerbed 花槽数组
 * @param {*} n 新的n株花
 */
function canPlaceFlowers(flowerbed, n) {
    var a = flowerbed.concat();
    var i, l = a.length,
        count = 0;
    for (i = 0; i < l; i++) {
        if (a[i] === 0) {
            /* i = 0 情况 */
            if (i === 0 && a[i + 1] === 0) {
                count += 1;
            }
            /* i = l-1 情况 */
            if (i === l - 1 && a[i - 1] === 0) {
                count += 1;
            }
            /* 0<i<l-1 情况 */
            if (a[i - 1] === 0 && a[i + 1] === 0) {
                count += 1;
            }
        }
    }
    console.log(count);
    if (count >= n) {
        return true;
    }
    return false;
}


/**
 * 打劫房屋 392
 * 
 * 动态规划
 * 
 * @param A: An array of non-negative integers
 * @return: The maximum amount of money you can rob tonight
 */
const houseRobber = function(A) {
    var i, l = A.length;
    if (l <= 0) {
        return 0;
    }
    if (l === 1) {
        return A[0];
    }
    /* 优化，因为dp数组之前的数据完全用不上，所以我们可以用三个变量来替换掉。 */
    var dp_i_1 = Math.max(A[0], A[1]),
        dp_i_2 = A[0],
        dp_i = 0;
    for (i = 2; i < l; i++) {
        dp_i = Math.max(dp_i_1, dp_i_2 + A[i]);
        dp_i_2 = dp_i_1;
        dp_i_1 = dp_i;
    }
    return dp_i;
}

console.log(houseRobber([3, 8, 4]));

/**
 * 交叉字符串
 * 给出三个字符串:s1、s2、s3，判断s3是否由s1和s2交叉构成
 * 
 * s1 = "aabcc"  s2 = "dbbca"
 * s3 = "aadbbcbcac"，返回  true.
 * s3 = "aadbbbaccc"， 返回 false.
 * 
 * 
 * 思路：一个二维数组result[i][j]来表示s1的前i个字符和s2的前j个字符是否能和s3的前i+j个字符匹配。
 * 
 * 状态转移方程如下：
 * result[i,j] = (result[i-1,j] && s1[i] = s3[i+j]) || (result[i,j-1] && s2[j] = s3[i+j]);
 * 其中0≤i≤len(s1) ,0≤j≤len(s2)
 * 
 * @param s1: A string
 * @param s2: A string
 * @param s3: A string
 * @return: Determine whether s3 is formed by interleaving of s1 and s2
 */
const isInterleave = function(s1, s2, s3) {
    var l1 = s1.length;
    var l2 = s2.length;
    var l3 = s3.length;

    if (l1 + l2 !== l3) {
        return false;
    }
    /* dp 二维数组生成 */
    var dp = Array.from({
        length: l1 + 1
    }, () => Array.from({
        length: l2 + 1
    }).fill(false));

    for (let i = 0; i < l1; i++) {
        dp[i] = [];
        for (let j = 0; j < l2; j++) {
            console.log("aa");
        }
    }
}


console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac"));