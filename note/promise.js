// const process = new Promise(function(resolve, reject) {
//     // .....code

//     if ( /* 一些异步操作*/ ) {
//         resolve(value)
//     } else {
//         reject(error)
//     }
// })

// process.then(function(value) {
//     // success
// }, function(error) {
//     // failure
// });

/**
 * promise 实例
 */

function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'haha')
    })
}

timeout(2100).then(value => {
    value += " Tom"
    console.log(value);
    return value
}).then(value=>{
    console.log(value);
})