/* 任务分为同步和异步 */
/* 

    同步进入主线程，异步进行Event Queue里，
    执行完主线程的任务，开始执行event queue里的任务

    同步任务分为宏任务和微任务，微任务目前只有process.nextTick,promise
    宏任务：setTimeout、setInterval，各种事件回调。是在下一轮Event loop里执行
    
*/

/* 



*/