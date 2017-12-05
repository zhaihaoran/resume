/**
 * promise 实例
 */

function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, "haha");
    });
}

timeout(2100)
    .then(value => {
        value += " Tom";
        console.log(value);
        return value;
    })
    .then(value => {
        console.log(value);
    });

/**
 * async await
 *
 * generator 的语法糖
 */

// eg.1  使用fs读取2个文件
//  generator
// var fs = require("fs");

// var readFile = function(fileName) {
//     return new Promise(function(resolve, reject) {
//         fs.readFile(fileName, function(error, data) {
//             if (error) reject(error);
//             resolve(data);
//         });
//     });
// };

// var gen = function*() {
//     var f1 = yield readFile("/etc/fstab");
//     var f2 = yield readFile("/etc/shells");
//     console.log(f1.toString());
//     console.log(f2.toString());
// };

// 使用async
// var asyncReadFile = async function() {
//     var f1 = await readFile("/etc/fstab");
//     var f2 = await readFile("/etc/shells");
//     console.log(f1.toString());
//     console.log(f2.toString());
// };

// 优势：
/**
 * 优势：
 *
 * 1.语义清楚，async 异步  await 等待；
 * 2.内置执行器
 * 3.实用性更好
 *  co 函数库约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，
 *  而 async 函数的 await 命令后面，可以跟 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）
 */

//  es6 class 增加新成员

class Person {
    constructor(name) {
        this._name = name;
    }
    // get 和 set 是修饰属性名的，影响属性名的读和写
    get name() {
        return this._name.toUpperCase();
    }
    /**
     * 注意一点，不要这样写:
     * set name(somename) {
     *  this.name = somename;
     * }
     * 因为给 this.name 赋值的时候会调用 set name ，这样会导致无限递归直到栈溢出。
     *
     */
    set name(somename) {
        this._name = somename;
    }
}

var box = new Person("jack");
console.log(box.name); // JACK
console.log(box._name); // jack

// 标签模板
var total = 30;
var msg = transform`The total number is ${total}`;
total = 20;
var msg1 = transform`The total number is ${total}`;

//in our sample
//literals = ["The total number is ", ""]
//values = [30]
function transform(literals, ...values) {
    var output = "";
    for (var index = 0; index < values.length; index++) {
        if (parseInt(values[index]) >= 30) {
            output += literals[index] + "high value";
        } else {
            output += literals[index] + "low value";
        }
    }
    output += literals[index];
    return output;
}
console.log(msg); // The total number is high value
console.log(msg1); // The total number is low value
