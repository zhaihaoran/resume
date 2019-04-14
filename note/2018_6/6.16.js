// 1. typeof有哪几种类型
// number boolean object function undefined symbol

// 2. offsetwidth scrollwidth clientwidth
// https://www.cnblogs.com/ifworld/p/7605954.html

// bind实现！！
Function.prototype.bind = Function.prototype.bind || function (context) {
    var self = this;
    // bind跟的参数！
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        self.apply(context, args.concat(bindArgs));
    }
}
// https://blog.csdn.net/daimomo000/article/details/72897035

// 3. scss include 和 extend的區別
// .extend 可以继承类，如果scss嵌套过深，也会影响性能，scss有可能引用所有相关文件中的类都引入进来，会造成污染
// include相同样式不会合并！！ extend会合并掉相同样式
// http://blog.163.com/feifei_diy/blog/static/12152425720166541758494/

// 4. 对象浅拷贝 --- 解构赋值
//  let obj = {...a}
// object assign  第一级深拷贝，第二级浅拷贝 
// 递归处理，对象的循环引用无法处理，https://www.jb51.net/article/140928.htm
// 解决办法是:只需要判断一个对象的字段是否引用了这个对象或这个对象的任意父级即可，可以修改上面的deepCopy函数:
let obj1 = {
    a: 0,
    b: {
        c: 0
    }
};

let obj2 = Object.assign({}, obj1);

console.log(obj2);

obj1.a = 1;
console.log(obj1);
console.log(obj2);

obj2.a = 1
console.log(obj1);
console.log(obj2);

obj2.b.c = 3
console.log(obj1);
console.log(obj2);

// 5. 原型链继承 知识！！

// 6. 
// map 是生成新数组，forEach不生成新数组,是将数组里的每一个数传递给回调函数
// map 返回一个新数组，是按照原始数组的顺序依次处理元素，不会改变原始数组
// forEach 调用每一个数组元素，将元素传给回调函数，是乱序的

let mm = [1,2,3].map(el=>{});
console.log(mm); // [undefined,undefined,undefined]

// 7. js如何处理循环引用

