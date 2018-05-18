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
        // console.log(arr); //每次完成一种情况，输出数组；
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


/* 判断一个数出现了几次，用obj来做 */
const digitCounts = function(k, n) {
    // 先生成[0,...,n]

    let num = 0;
    let ary = Array.from({
        length: n + 1
    }, (v, i) => {
        let str = i.toString().split('').map(v => {
            if (v == k) {
                num++;
            }
        });
        return str;
    })

    return num;
}

console.log(digitCounts(1, 12));



/**
 * @param n: A long integer
 * @return: An integer, denote the number of trailing zeros in n!
 */
const trailingZeros = function(n) {
    let m = 0;
    while (n) {
        let v = Math.floor(n / 5)
        m += v;
        n = v;
    }
    return m;
}

console.log(trailingZeros(25))


/**
 * @param n: An integer
 * @return: the nth prime number as description.
 */
/* 暴力求解 */
const nthUglyNumber = function(n) {
    let m = 0; // i为丑数的个数
    let i = 1; // 从开始遍历
    let value = 1; //当前丑数值
    while (m < n) {
        let a = i; // 中间值
        // 如果是上一个丑数的235倍数，则直接判断为丑数
        while (a % 6 === 0) {
            a = a / 6
        }
        while (a % 2 === 0) {
            a = a / 2
        }
        while (a % 3 === 0) {
            a = a / 3
        }
        while (a % 5 === 0) {
            a = a / 5
        }
        if (a === 1) {
            // 说明是丑数
            value = i;
            m++;
        }
        i++;
    }
    return value;
}


console.log(nthUglyNumber(9));


/* 寻找最大丑数n */

const nthUglyNumbers = function(n) {
    var arr = [1];
    var num = 1;
    while (num < n) {
        var two = 0;
        var three = 0;
        var five = 0;

        for (var i = 0; i < num; i++) {
            if (arr[i] * 2 > arr[num - 1]) {
                two = arr[i] * 2;
                break;
            }
        }
        for (var j = 0; j < num; j++) {
            if (arr[j] * 3 > arr[num - 1]) {
                three = arr[j] * 3;
                break;
            }
        }
        for (var z = 0; z < num; z++) {
            if (arr[z] * 5 > arr[num - 1]) {
                five = arr[z] * 5;
                break;
            }
        }
        arr[num] = Math.min(two, three, five);
        num++;
    }
    return arr[num - 1];
}

console.log(nthUglyNumbers(9));



/* compose 函数 */
/* compose 可以生成一个由多个中间件构成的组合函数（存在自调用能力） */
/* 将store的api注入到中间件中 */

function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }
    if (funcs.length === 1) {
        return funcs[0]
    }
}

let funcs = [
    function(a) {
        return a + 1;
    },
    function(b) {
        return b + 5;
    },
    function(a) {
        return a * 2;
    }
]

console.log(funcs);
console.log(compose(...funcs));


/* 计算每个元素在数组中出现的次数 */

var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

var countNames = names.reduce((all, name) => {
    name in all ? all[name]++ : all[name] = 1;
    return all;
}, {})

console.log(countNames);


/* 取出每一个对象中某个属性的值的集合 */
var friends = [{
    name: 'Anna',
    books: ['Bible', 'Harry Potter'],
    age: 21
}, {
    name: 'Bob',
    books: ['War and peace', 'Romeo and Juliet'],
    age: 26
}, {
    name: 'Alice',
    books: ['The Lord of the Rings', 'The Shining'],
    age: 18
}];


var allbooks = friends.reduce((prev, value) => [...prev, ...value.books], ["initValue"])

console.log(allbooks);


/* 给定一个包含整数的无序数组，要求找出乘积最大的三个数。 */
/* min1 min2 max1 || max1 max2 min1 */
var unsorted_array = [-10, 7, 29, 30, 5, -10, -70];

console.log(computeProduct(unsorted_array));
// 21000

function sortIntegers(a, b) {
    return a - b;
}

/* product 乘积 */
function computeProduct(unsorted) {
    var sorted_array = unsorted.sort(sortIntegers),
        array_n_element = sorted_array.length,
        product1 = sorted_array[array_n_element - 1] * sorted_array[0] * sorted_array[array_n_element - 2],
        product2 = sorted_array[0] * sorted_array[1] * sorted_array[array_n_element - 1];

    if (product1 > product2) return product1;

    return product2
};


/* 求数组交集,交集里元素不能重复 */

var ary1 = [2, 2, 4, 1];
var ary2 = [1, 2, 0, 2];

console.log(intersection(ary1, ary2)); // [1,2]

function intersection(ary1, ary2) {
    let set1 = new Set(ary1);
    let result = new Set();

    for (let i = 0; i < ary2.length; i++) {
        if (set1.has(ary2[i])) {
            result.add(ary2[i])
        }
    }
    return Array.from(result)
}

/* 二进制转换 ， 将某个数递归转换为二进制字符 */


console.log(convertToBinary(3)); // 11
console.log(convertToBinary(8)); // 1000
console.log(convertToBinary(1000)); // 1111101000

function convertToBinary(n) {
    if (n >= 1) {
        if (n % 2) {
            return convertToBinary((n - 1) / 2) + 1;
        } else {
            return convertToBinary(n / 2) + 0
        }
    } else {
        return '';
    }
}



// 不可拓展对象

let dog = {
    name: "柴犬"
}

// 可以组织拓展行为
Object.preventExtensions(dog)

dog.age = 20;

console.log(dog);

/* 对象解构 高级技巧 */
const csvFileline = "1992,Jphn,2014,MSlT,2112,LIES";
const {
    2: country,
    4: state
} = csvFileline.split(',')

console.log(country, state); //2014 2112



/* 删除数组中指定的值，返回该数组的长度 */
let test1 = [1, 2, 2, 3, 2, 4, 6, 8],
    val = 2;

function removeEl(ary, val) {
    let sameV = 0; // 有几个相同的值
    ary.reduce((a, b) => {
        if (a === val) {
            sameV++
        }
        return b;
    })
    return ary.length - sameV;
}

console.log(removeEl(test1, val));

/* 数组去重，一个排好序的数组，不能开辟额外的数组空间，返回新数组长度 */
function uniqueAry(ary) {
    let j = 0;
    let l = ary.length;
    for (let i = 1; i < l; i++) {
        if (ary[j] != ary[i]) {
            ary[++j] = ary[i]
        }
    }
    return j + 1;
}

console.log(uniqueAry([1, 2, 2, 2, 3]));

/* 数组去重2，一个排好序的数组，不能开辟额外的数组空间，返回新数组长度，每个元素最多可以重复两次 */
function uniqueArys(ary) {
    let j = 0;
    let count = 0; // 计数器
    let l = ary.length;
    for (let i = 1; i < l; i++) {
        if (ary[j] === ary[i]) {
            count++;
            if (count < 2) {
                ary[++j] = ary[i];
            }
        } else {
            ary[++j] = ary[i];
            count = 0;
        }
    }
    return j + 1;
}


console.log(uniqueArys([1, 2, 2, 3, 3, 4, 4, 4, 5]));


/* 归并排序 */

/**
 * 分治策略
 * 
 * 思路就是将数组不断切分，然后在进行合并，合并的过程是从下往上，
 */

function merge(left, right) {
    var tmp = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            tmp.push(left.shift());
        } else {
            tmp.push(right.shift());
        }
    }
    return tmp.concat(left, right)
}

function mergeSort(a) {
    if (a.length === 1) {
        return a;
    }
    var mid = ~~(a.length / 2),
        left = a.slice(0, mid),
        right = a.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}


console.log(mergeSort([2, 3, 1, 5, 4, 8, 12, 43, 21, 32, 9]));

/* 请将两个有序数组合并为一个数组，不能使用concat和sort */

var ary1 = [1, 4, 7, 8, 14, 19];
var ary2 = [2, 5, 9, 12, 15];

function merge(left, right) {
    var tmp = [];
    var il = 0;
    var ir = 0;

    while (left.length > il && right.length > ir) {
        if (left[il] < right[ir]) {
            tmp.push(left[il++])
        } else {
            tmp.push(right[ir++])
        }
    }
    tmp.push(left[il] ? left[il] : right[ir])
    return tmp;
}

console.log(merge(ary1, ary2));

var m = 1,
    j = k = 0;

function add(n) {
    return n = n + 1;　
}
y = add(m);

function add(n) {
    return n = n + 3;
}
z = add(m);

console.log(y, z);
/**
 * 所以上面代码先解析了add函数，但是第二个在后面给第一个覆盖了，所以y和z调用的都是第二个add函数，y调用add函数传参m，用完一次就销毁了，下次重新赋值，所以z传值的时候m还是等于1
 * 
 */


/* pascal triangle */
/**
 * 对于k行，每行有k个元素
 * 第一和最后一个元素都是1，
 * k行里第n个元素为A[k][n] = A[k-1][n-1] + A[k-1][n]
 */
function generatePascal(row) {
    let tmp = [];
    let n = 0;
    if (row === 1) {
        return [1];
    }
    if (row === 2) {
        return [1, 1];
    }
    while (n < row) {
        let ary = [];
        for (var i = 0; i < n; i++) {
            ary.push((tmp[n - 1][i] + tmp[n - 1][i + 1]));
        }
        tmp[n++] = [1].concat(ary, [1]);
    }
    return tmp;
}


console.log(generatePascal(2));
console.log(generatePascal(3));
console.log(generatePascal(4));