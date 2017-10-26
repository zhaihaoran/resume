const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: __dirname + '/src/js/index'
    },
    output: {
        path: __dirname + "/docs",
        filename: '[name].js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: "./public", 
        port: 4444, // 监听端口号
        inline: true, // 实时刷新
        historyApiFallback: true
        // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    },
    resolve: {
        extensions: ['.js','.less','.html']
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
            },
            exclude: /node_moudles/
        },{
            test: /\.(css|less)$/,
            use: [
                {
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                }, {
                    loader: "less-loader"
                }
            ]
        }]
    },
    plugins:[
        new webpack.BannerPlugin('版权所有，翻版必究'),// 在打包后的代码中添加注释
        // 简历
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html' // new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.optimize.UglifyJsPlugin(), //压缩js代码
    ]
}