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
