var Bower = function () {
    this.number = 3;
}

Bower.prototype = {
    // 在原型链里声明的方法，是实例方法，只有实例化后才可以调用，每创建一个类的实例，都会在内存中为其分配一块储存。
    test:function(num) {
        console.log(num);
    }
}

// Bower.test(11); //error test is not defined

var box = new Bower();
box.test(22); // 22

// 直接挂在函数下的方法叫做静态方法，类可以直接调用，但实例也调用不了,静态成员只在内存中占一块区域
Bower.tesm = function(num) {
    console.log(num+1)
}

Bower.tesm(22); // 23

// box.tesm(22); //error 