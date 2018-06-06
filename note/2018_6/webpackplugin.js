// 插件开发中两个最重要的资源，compiler 和 compilation 对象
// 拓展webpack引擎的第一步。

/* 
compiler 对象表示完整的webpack环境配置。在启动webpack后被一次性创建，我们可以通过compiler来访问webpack的主环境
compilation对象代表了一次单一的版本构建和生成资源。
*/

function HelloWorldPlugin(options) {
    // 使用options配置插件实例
}

/* 这个apply方法在安装时，会被webpack编译器调用一次，这个方法会提供编译器对象实例的引用。从而可以访问到编译器的回调。一个简单的插件结构如下 */
HelloWorldPlugin.prototype.apply = function(compiler) {
    compiler.plugin('done', function() {
        console.log("hahahah");
    })
}

/* 
参考webpack插件编写实例：
http://www.css88.com/doc/webpack2/development/how-to-write-a-plugin/
*/