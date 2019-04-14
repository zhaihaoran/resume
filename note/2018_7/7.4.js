console.log(0 === -0); // true
console.log(+0 === -0); // true
console.log(NaN === NaN); // false

console.log(Object.is(0, -0)); // false
console.log(Object.is(+0, -0)); // false
console.log(Object.is(NaN, NaN)); // true



// 贪婪匹配
// (.+) 默认是贪婪匹配 (.+?)为惰性匹配
// https://www.cnblogs.com/yuaima/p/5258513.html

var str = "abcdabcebajbalb";

var mm = str.match(/.+b/);
var ll = str.match(/.+?b/);

console.log(mm) // abcdabcebajbalb
console.log(ll) // ab

var tt = str.match(/.*?b.*?a/) // abcda
var tm = str.match(/.*?b.*a/) // abcdabcebajba
console.log(tt);
console.log(tm);

// 贪婪匹配默认先看整个字符是否匹配。如果不匹配，会去掉字符串最后一个字符。再次尝试。如果还不匹配，则再去掉一个。直到发现匹配或不剩下任何字符
// 惰性匹配默认先从左开始匹配，从第一个字符开始，直到遇到符合匹配的或不剩下任何字符

// 从字面意思理解即可：贪婪即匹配尽可能多的字符。惰性即匹配尽可能少的字符