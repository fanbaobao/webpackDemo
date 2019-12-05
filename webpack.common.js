// webpack.config.js
// module.exports = {
//     entry: __dirname + "/src/index.js", // 入口文件
//     output: {
//         path: __dirname + "/dist", //打包后的文件存放的地方
//         filename: "bundle.js" //打包后输出文件的文件名
//     }
// }
const webpack = require('webpack');  // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入HtmlWebpackPlugin插件
// (自动生成默认html插件，并自动引入打包后的js文件)
const ExtractTextPlugin = require('extract-text-webpack-plugin') //引入分离插件

module.exports = {
    entry: {
        index: path.join(__dirname, "/src/index.js"), // 入口文件
        // two: path.join(__dirname, "/src/two.js")
        },
    output: {
        path: path.join( __dirname, "/dist"), //打包后的文件存放的地方
        filename: "[name].js" //打包后输出文件的文件名
    },
    module: {
        rules: [
            {
                test: /\.css$/,   // 正则匹配以.css结尾的文件
                use: ['style-loader', 'css-loader', 'postcss-loader'],  // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,  // 正则匹配图片格式名
                loader: 'url-loader',  // 使用url-loader
                options: {
                    // limit: 10000, // 定义大于10000k的图片不转base64
                    outputPath: './img', //定义输出的图片文件夹
                    publicPath: './img' //这个option必须写，否则css中图片路径可能会出错
                },
            },
            {
                test: /\.(scss|sass)$/,   // 正则匹配以.scss和.sass结尾的文件
                use: ['style-loader', 'css-loader', 'sass-loader']  // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
            },
            {                             // jsx配置
                test: /(\.jsx|\.js)$/,
                use: {                    // 注意use选择如果有多项配置，可写成这种对象形式
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),  // new一个插件的实例
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "/src/index.template.html")// new一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(), // 热更新插件
        require('autoprefixer'),  // 引用autoprefixer模块(自动添加css前缀)
        new ExtractTextPlugin('/css/index.css') // 将css分离到/dist文件夹下的css文件夹中的index.css
    ]
}