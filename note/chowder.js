/* -- 检测插件、H5属性是否支持 -- */
function detect(AttrArray) {

    var obj = {
        state: true,
        str: ""
    };

    AttrArray.forEach(function(ele, index) {
        var detectTerm = {
            state2: ele in document.createElement('span'),
            state3: typeof window[ele] != "undefined",
            state4: ele in new XMLHttpRequest
        };
        if (detectTerm.state2 || detectTerm.state3 || detectTerm.state4) {
            return;
        } else {
            obj.str += ele + " ";
        }
    });

    if (obj.str) {
        obj.str += " is not support!";
        obj.state = false;
        throw new Error(obj.str);
    }

    return obj.state;
}

//detect(["FileReader","kjl","dnd","jquery"]);

/* -- 快速排序 -- */
function quicklySort(array) {
    if (array.length <= 1) {
        return array;
    }
    var array2 = array.slice(0); //复制数组，为了不影响原数组；
    var mediumIndex = Math.floor(array2.length / 2);
    var medium = array2.splice(mediumIndex, 1)[0]; //把数组中间的数剔除掉

    var left = [];
    var right = [];

    for (var i = 0; i < array2.length; i++) {
        if (array2[i] < medium) {
            left.push(array2[i]);
        } else {
            right.push(array2[i]);
        }
    }

    return quicklySort(left).concat([medium], quicklySort(right));
}

/* -- 冒泡排序 -- */
function bubbleSort(array) {
    var temp = 0;
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length; j++) {
            if (array[j] > array[j + 1]) {
                temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp; //实现array[j+1]与array[j]交换值
            }
        }
    }
    return array;
}

/* -- for循环内嵌函数最佳实现 -- */
for (var i = 1; i <= 5; ++i) {
    (function(j) {
        setTimeout(function() {
            console.log(j);
        }, j * 1000);
    })(i);
}
for (let i = 1; i <= 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, i * 1000)
}

console.log(`TODO LIST:
    * one
    * two
`)

console.log(`object
    haha
`);

console.log(`1 < 2 ${ 1 < 2 ? '✔︎' : '✘'}`)

const l10n = (strings, ...rest) => {
    console.log(strings, rest);
    return strings.reduce((total, current, idx) => {
        const arg = rest[idx]
        let insertValue = ''
        if (typeof arg === 'number') {
            insertValue = `¥${arg}`
        } else if (arg instanceof Date) {
            insertValue = arg.toLocaleDateString('zh-CN')
        } else if (arg !== undefined) {
            insertValue = arg
        }
        return total + current + insertValue
    }, '');
}
const brand = 'G-Shock'
const date = new Date()
const price = 1000

let mm = l10n `I bought a ${brand} watch on ${date}, it cost me ${price}.`

console.log(mm);


let mks = String.raw `\n\n`
console.log(mks, mks.length); //\n\n 4
// 可以用于创建原数组中的数据
let b = '\n\n' // 换行符
console.log(b, b.length); // 换了两行 2

/* css 权重 */
/**
 * 1.!important 优先级最高，但也会被权重高的important所覆盖
 * 2.行内样式总会覆盖外来样式
 */