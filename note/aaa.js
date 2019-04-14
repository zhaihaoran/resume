var Bower = function() {
    this.number = 3;
};

Bower.prototype = {
    // 在原型链里声明的方法，是实例方法，只有实例化后才可以调用，每创建一个类的实例，都会在内存中为其分配一块储存。
    test: function(num) {
        console.log(num);
    }
};

// Bower.test(11); //error test is not defined

var box = new Bower();
box.test(22); // 22

// 直接挂在函数下的方法叫做静态方法，类可以直接调用，但实例也调用不了,静态成员只在内存中占一块区域
Bower.tesm = function(num) {
    console.log(num + 1);
};

Bower.tesm(22); // 23

// box.tesm(22); //error

var a = [1, 2, 3, 4, 5];
a.splice(1, 3, 5, 2, 1);
console.log(a); // [1,5,2,1,5]

var asda = {
    hands: 2,
    boxe: 3,
    llt: 4
};

Object.prototype.clone = function(a) {
    console.log(a);
};

console.log(asda.hasOwnProperty('hands'));
console.log(asda.hasOwnProperty('clone'));


/* 结果？ */
var a = 1;
test();

function test() {
    console.log(a); // 打印a的时候，a并没有在function内赋值，所以是undefined
    var a = 2;
    console.log(a);
}

/* 如何输出？ */
setTimeout(function() {
    console.log(1);
}, 0);
var tem = 0;
for (var i = 1; i < 10; i++) {
    tem += i;
    console.log(tem);
};
console.log(2);


const mm = [1, 2, 3, 4, 5];
const list = mm.map(el => {
    console.log(el);
});
console.log('-----')
const ast = mm.forEach(el => {
    console.log(el);
});
console.log(mm, ' - row')
console.log(list, ' - map')
console.log(ast, ' - forEach')

const ma = Math.pow(2, 5);
const asdd = 2 ** 5;
console.log(ma) // 32
console.log(asdd) // 32

const mlk = [2, 3, 4, 5, 1, 8, 5, 1, 12]
console.log(mlk.includes(3)) // true

let sss = [
    [1, 2, 3],
    [1, 2, 3, 4],
    [5, 1, 9, 12]
];

sss.forEach(([a1, a2, ...a3]) => {
    console.log(a1, a2, a3)
})

// 1 2 [3]
// 1 2 [3,4]
// 5 1 [9,12]

// padStart 和 padEnd

console.log('0.00'.padStart(10))
console.log('10,000.00'.padStart(10))
console.log('250,000.00'.padStart(10))

console.log('0.00'.padEnd(10, '-:'))
console.log('10,000.00'.padEnd(10, '-:'))
console.log('250,000.00'.padEnd(10, '-:'))