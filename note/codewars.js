/* codewars */

/**
 * A Chain adding function
 *
 * add(1)(2) //3
 * add(1) // 1
 * add(1)(2)(3) //6
 *
 * var addTwo = add(2)
 * addTwo + 5 // 7
 */
function add(n) {
    var fn = function(x) {
        return add(n + x);
    };
    // JavaScript调用valueOf方法将对象转换为原始值。
    // 你很少需要自己调用valueOf方法；当遇到要预期的原始值的对象时，JavaScript会自动调用它

    // 当fn需要被转换为原始类型值时，Javascript会自动调用这个方法
    fn.valueOf = function() {
        return n;
    };
    return fn;
}

var a = add(1);
var b = add(1)(2)(3)(4);
console.log(a, b);
var box = add(2)(3);
console.log(box + 5);

/**
 * Create Phone Number
 *
 * @param {any} numbers
 */
function createPhoneNumber(numbers) {
    var str1 = numbers.filter((v, i) => i < 3).join('');
    var str2 = numbers.filter((v, i) => i > 2 && i < 6).join('');
    var str3 = numbers.filter((v, i) => i > 5).join('');
    return `(${str1}) ${str2}-${str3}`;
}

// clever
function createPhoneNumber(numbers) {
    return numbers.join('').replace(/(...)(...)(.*)/, '($1) $2-$3');
}

// best practice
function createPhoneNumber(numbers) {
    var format = '(xxx) xxx-xxxx';

    for (var i = 0; i < numbers.length; i++) {
        format = format.replace('x', numbers[i]);
    }

    return format;
}

var boxs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
var regs = boxs.join('').match(/(...)(...)(.*)/);
console.log(regs);

console.log(createPhoneNumber(boxs));

/**
 * Valid Braces
 *
 * brace 各种括号
 * parentheses () 圆括号
 * brackets [] 中括号
 * curly braces {} 大括号
 *
 * @param {any} braces
 */
function validBraces(braces) {
    var status = true;
    while (status) {
        var prevl = braces.length;
        // 匹配（）或[]或{}
        braces = braces.replace(/(\[\])|(\{\})|(\(\))/, '');
        var currl = braces.length;
        if (prevl === currl) {
            status = false;
        }
    }

    return !braces.length;
}

console.log(validBraces('()[]{}{)'));

/**
 * Maximum subarray sum
 * 找一个数组中的最大子序列的和值
 */
var maxSequence = function(arr) {
    var currentSum = 0;
    return arr.reduce(function(maxSum, number) {
        currentSum = Math.max(currentSum + number, 0);
        return Math.max(currentSum, maxSum);
    }, 0);
};

// best practice!!
var maxSequence = function(arr) {
    var min = 0,
        ans = 0,
        i,
        sum = 0;
    for (i = 0; i < arr.length; ++i) {
        sum += arr[i];
        min = Math.min(sum, min);
        ans = Math.max(ans, sum - min);
    }
    return ans;
};

/**
 * 判断n值以内的所有素数
 *
 * 返回所有素数集合
 *
 * 原理：素数即只能被自身和1整除的数
 * 由公理可知，如果一个整数能被分解成多个整数，则必有一个数不大于该整数的平方根
 * （反证法可知，如果分解成的两个数都大于平方根，则乘积必大于原数）
 * 故在循环时，只需循环到该数的平方根即（Math.sqrt(num)为求平方根）
 *
 *
 * && 判断一个数是否为素数：
 * 遍历N能否能被从2到sqrt(N)之间的素数整除。若不能则为素数。
 * 比如判断101是不是素数，只需要判断101是否能被【2，10】之间的素数整除，即101是否能被2、3、5、7整除即可，如果不能，侧101就是素数
 */
function prime(n) {
    var primeArr = [2];
    var isPrime = function(num, primeList) {
        // 2比较特殊，需要单独排除
        if (num === 2) {
            return true;
        }

        for (
            var i = 3, iLen = Math.sqrt(num), j = 1;
            i <= iLen;
            i = primeList[j++]
        ) {
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    };
    // 边界处理
    if (isNaN(n) || n < 1) {
        return [];
    }
    // 如果一个数能被2整除，则除2之外其他数都不是素数，故从3开始遍历能够减少循环次数,偶数必然非素数，所以递增为2
    // 如果一个数能够被分解，则最终分解结果必然为多个素数之积
    // 循环时只需要尝试之前算好的素数能否整除当前的数，极大减少循环次数
    for (var i = 3; i <= n; i += 2) {
        if (isPrime(i, primeArr)) {
            primeArr.push(i);
        }
    }

    return primeArr;
}

var primes = prime(111);
console.log(primes);

/**
 * Extract the domain name from a URL
 *
 * 熟练掌握正则?:和 ()? 用法
 */
function domainName(url) {
    return url.match(/(\w+:\/\/)?(www.)?([\w-]+)(.\w+)/)[3];
}

/**
 * palindromeChain
 *
 * @param {any} n
 */
var palindromeChainLength = function(n) {};

var isPalindrome = function(n) {
    return n + '' === n.toString();
};

/**
 * Double Cola
 *
 * @param {any} names
 * @param {any} r
 * @returns
 */
function whoIsNext(names, r) {
    return r > 5 ? names[Math.ceil(((r - 5) % 10) / 2) - 1] : names[r - 1];
}
