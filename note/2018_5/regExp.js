/* \B */

// 用正则实现在字符串数字里添加千分符，"12345" -> "1,2345"

console.log("12345".replace(/\B/g, ','));
// 1,2,3,4,5
console.log("12345".replace(/\b/g, ','));
// ,12345,  \b可以匹配到单词的边界,边界即单词的首和尾的空隙，注意！是空隙，^ 和 $ 是匹配字符串的开头和结尾
console.log("word words".replace(/\bword\b/g, "0")); // 0 words 不加的话\b，就是0 0s



/* 先行断言  (?=) */

// 表示后面应该跟相应的内容才匹配
console.log("xyzasxmz".replace(/x(?=y)/g, "1")); // "1yzasxmz"

console.log("123123".replace(/\B(?=(\d{3})+)/g, ",")); //1,2,3,123
// 对于上述而言，匹配的是1和2,2和3,3和123之间的空格

/* 后行断言  (?!) */

// 表示后面不能跟相应的内容才可以匹配
console.log("12342312123".replace(/\B(?=(\d{3})+(?!\d))/g, ",")); // "12,342,312,123"
// (?=(\d{3})+(?!\d)) 表示 后面必须跟3个数字，而且3个数字之后不能跟数字，可以是小数点或字符串尾
// 这样我们就实现了添加千分符

console.log("12342312123".replace(/\B(?=(\d{3})+\b)/g, ",")); // "12,342,312,123"