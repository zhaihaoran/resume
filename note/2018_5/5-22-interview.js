/* debounce实现 */
/* 让用户在delay秒之内再执行操作 */
function debounce(fn, delay = 200) {
    /* 先声明一个定时器实例 */
    var timer;
    return function() {
        var _this = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            timer = null;
            fn.apply(_this, args);
        }, delay)
    }
}

// 我们调用debounce的时候，它运行返回一个function，这个function使用外面的局部变量delay和timer。这个返回的function才是事件执行的回调。每次执行的时候判断timer是否有值，有值则clearTimeout清空定时器，并且重新开启定时器，直到delay时间内没有触发事件时才会真正执行事件的回调。

// 在验证用户名的keydown事件时，可以很好的节省网络资源

/* throttle */
/* 在固定的时间间隔内执行回调函数，而且只会执行一次 */
function throttle(fn, interval) {
    var last, timer, interval = interval || 200; //时间区间
    return function() {
        var _this = this;
        var args = arguments;
        var now = +new Date();
        // +new Date(); 能直接转成时间戳，根本不用getTime()!
        if (last && now - last < interval) {
            clearTimeout(timer)
            timer = setTimeout(function() {
                last = now;
                fn.apply(_this, args);
            }, interval)
        } else {
            last = now;
            fn.apply(_this, args)
        }
    }
}


// function debounce(fn, interval) {
//     var timer;
//     return function() {
//         var _this = this;
//         var args = arguments;
//         if (timer) {
//             clearTimeout(timer)
//         }

//         timer = setTimeout(function() {
//             timer = null;
//             fn.apply(_this, args);
//         }, interval)
//     }
// }


// function throttle(fn, interval) {
//     var timer;
//     interval = interval || 200;
//     var last;
//     return function() {
//         var _this = this;
//         var args = arguments;

//         var now = +new Date();

//         if (last && now - last < interval) {

//         } else {
//             last = now;
//             fn.apply(_this, args);
//         }

//     }
// }