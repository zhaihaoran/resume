var A = function() {};
A.prototype.n = 1;
var b = new A();
A.prototype = {
  n: 2,
  m: 3
}
var c = new A();
// b是先实例化，是在原型链修改前，所以是不生效的
console.log(b.n); // 1
console.log(b.m); // undefined
// c实例化时在原型链修改后，所以生效
console.log(c.n); // 2
console.log(c.m); // 3
// 

var F = function() {};

Object.prototype.a = function() {
  console.log('a');
};

Function.prototype.b = function() {
  console.log('b');
}

var f = new F();

// f.a(); // undefined
// f.b(); // b is not a function

F.a(); // a
F.b(); // b

// 实例化之后，不能取Function原型链上的值，而实例化前后，Object上的原型链是都可以取到的

function Person(name) {
    this.name = name
}
let p = new Person('Tom');
// p.__proto__ 是 Person.prototype
// Person.__proto__ 是 Function.prototype
