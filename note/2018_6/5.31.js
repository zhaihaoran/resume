/* 如何判断传入的值是{}，尽可能考虑所有情况 */

/* 
    1. null 
    2. new Person() 构造类
    3. new Person() Person.prototype = Object.prototype
    4. 一个对象，但是设置了不可枚举。
*/

let m1 = null;

function Person() {

}
let m2 = new Person();

function Pers() {

}
Pers.prototype = Object.prototype;
let m3 = new Pers();

let m4 = {};

/* 首先，es3中就不可以定义不可枚举属性，所以，用Relect.ownKeys(obj).length === 0 */

Object.defineProperty(m4, "sex", {
    value: "female",
    enumerable: false
})

/* Reflect.ownKeys(obj) 可以取到不可枚举的值，但是Object.keys是取不到不可枚举的值的 */

let m5 = {};

console.log(typeof m2, m2.constructor, m2 instanceof Object);
console.log(typeof m3, m3.constructor, m3 instanceof Object);

let sym = Symbol.for("comet");
let sym2 = Symbol.for("meteor");

let m6 = {
    [sym]: 0,
    "str": 0,
    "773": 0
}


/* 只有 reject 是不执行的 */
// let m7 = Promise.reject(1)

// m7.then(function() {
//     console.log("haha");
// })

// 由此可见 Object.keys 取不到 Symbol 属性,但是Reflect.ownKeys都可以取到
// Object.keys 返回的是可枚举属性的集合
console.log(Object.keys(m6));

function isPureObj(obj) {
    // 可以排除 null 和其他容易分辨的类型 ,  去除多层原型链的,排除m2
    return Object.prototype.toString.call(obj) === "[object Object]" &&
        Reflect.getPrototypeOf(obj) === Object.prototype &&
        Reflect.ownKeys(obj).length === 0;
}

console.log(null === null); // true
console.log(undefined === undefined); // true


/* createAssigner */

let l1 = new Map();
l1.set(/a/, 1);
l1.set({
    a: 3
}, 5);
console.log(l1);
console.log(l1.get(/a/)); // undefined
console.log(l1.get({
    a: 3
})); // undifned
/* 只有对同一对象的引用，Map结构才将其视为同一个键 */
/* Map的键和内存地址是绑定的 */


/* 10w个数，求第k个最大值是多少 */
let arr = [82, 1, 12, 4, 124, 45, 8, 998, 456];

/* 1. 快速排序 */
/* 
    以数组a[0]作为参考base，如果寻找第k大，则将大数放在左边，如果寻找第k小，则将大数放在右边，通过交替移动两个指针。
    直到指向同一个位置的时候i === j 
    当K-1大于base的索引i（或j）时，所要找的第K大的数位于base的后半部分，需要对后半部分进行排序，而不用管前半部分的顺序； 
    当K-1小于base的索引时，所要找的第K大的数位于base的前半部分，只需要对前半部分进行排序； 
    当K-1等于base的索引时，说明当前的base就是所要找的第K大的数。
*/
/* m,n表示首尾索引 */
function findKbigger(a, K, m, n) {
    let i = m;
    let j = n;
    let base = a[i];
    while (i < j) {
        while (i < j && a[j] < base) {
            --j;
        }
        if (i > j) {
            a[i++] = a[j];
        }
        while (i < j && a[i] >= base) {
            ++i;
        }
        if (i < j) {
            a[j--] = a[i];
        }
        while (i < j) {
            a[j--] = a[i];
        }
    }
    a[i] = base;
    if (K - 1 > i) {
        findKbigger(a, K, i + 1, n);
    }
    if (K - 1 < i) {
        findKbigger(a, K, m, i - 1)
    } else {
        return;
    }
}


_.memoize = function(func, hasher) {
    var memoize = function(key) {
        var cache = memoize.cache;

        var address = '' + (hasher ? hasher.apply(this, arguments) : key);

        if (!_.has(cache, address)) {
            cache[address] = func.apply(this, arguments);
        }

        return cache[address]
    }

    memoize.cache = {};

    return memoize;
}