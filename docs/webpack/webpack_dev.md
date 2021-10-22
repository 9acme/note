# 开发环境

## 打包样式资源
1. 下载loader(less-loader或sass-loader只需下载一个即可)
   > npm i css-loader style-loader less-loader less sass-loader -D

2. 修改webpack.config.js文件
    ```javascript
    // resolve 用来拼接绝对路径的方法
    const { resolve } = require('path');

    module.exports = {
      // 入口位置
      entry: './src/index.js',
      output: {
        // 输出文件名
        filename: 'built.js',
        // 输出路径
        // dirname nodejs 的变量，代表当前文件的目录绝对
        path: resolve(__dirname, 'build')
      },
      module: {
        // 详细 loader 配置
        // 不同文件必须配置不同 loader 处理
        rules: [
          {
            // 匹配哪些文件
            test: /\.css$/,

            // 使用哪些 loader 进行处理
            use: [
              // use 数组中 loader 执行顺序：从右到左，从下到上 依次执行
              // 创建 style 标签，将 js 中的样式资源插入进行，添加到 head 中生效
              'style-loader',

              // 将 css 文件变成 commonjs 模块加载 js 中，里面内容是样式字符串
              'css-loader'
            ]
          },
          {
            test: /\.less$/,
            use: [
              'style-loader',
              'css-loader',

              // 将 less 文件编译成 css 文件
              // 需要下载 less-loader 和 less
              'less-loader'
            ]
          },
          {
            test: /\.scss$/,
            use: [
              'style-loader',
              'css-loader',

              // 将 sass 文件编译成 css 文件
              // 需要下载 sass-loader 和 sass
              'sass-loader'
            ]
          }
        ]
      },
      // plugins 的配置
      plugins: [],
      // 模式
      mode: 'development' // 开发模式
      // mode: 'production'  // 生产模式
    };
    ```

3. 运行webpack

## 打包html资源
1. 下载plugin插件
   > npm install --save-dev html-webpack-plugin

2. 修改webpack.config.js文件
    ```javascript
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const { resolve } = require('path');

    module.exports = {
      entry: './src/index.js',
      output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
      },
      module: {
        rules: []
      },
      plugins: [
        // plugins 的配置
        // html-webpack-plugin
        // 功能：默认会创建一个空的 HTML，自动引入打包输出的所有资源（JS/CSS）
        // 需求：需要有结构的 HTML 文件
        new HtmlWebpackPlugin({
          // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
          template: './src/index.html'
        })
      ],
      mode: 'development'
    };
    ```

3. 运行webpack

## 打包图片资源
1. 下载loader
   >npm install --save-dev html-loader url-loader file-load

2. 修改webpack.config.js
    ```javascript
    const { resolve } = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
      entry: './src/index.js',
      output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
      },
      module: {
        rules: [
          {
            test: /\.less$/,

            // 要使用多个 loader 处理用 use
            use: ['style-loader', 'css-loader', 'less-loader']
          },
          {
            // 问题：默认处理不了 html 中 img 图片
            // 处理图片资源
            test: /\.(jpg|png|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 74 * 1024,

              // 问题：因为 url-loader 默认使用 es6 模块化解析，而 html-loader 引入图片是 commonjs
              // 解析时会出问题：[object Module]
              // 解决：关闭 url-loader 的 es6 模块化，使用 commonjs 解析
              esModule: false,

              // 给图片进行重命名
              // [hash:10]取图片的 hash 的前 10 位
              // [ext]取文件原来扩展名
              name: '[hash:10].[ext]'
            }
          },
          {
            test: /\.html$/,

            // 处理 html 文件的 img 图片（负责引入 img，从而能被 url-loader 进行处理）
            loader: 'html-loader'
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html'
        })
      ],
      mode: 'development'
    };
    ```

3. 运行webpack

## 打包其他资源
1. 下载loader
   >npm i file-loader -S

2. 修改webpack.config.js
    ```javascript
    const { resolve } = require('path');
    const htmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
      entry: './src/index.js',
      output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },

          // 打包其他资源(除了 html/js/css 资源以外的资源)
          {
            // 排除 css/js/html/png/jpg/gif/less/scss 资源, 排除用exclude
            exclude: /\.(html|css|js|png|jpg|gif|less|scss)$/,

            //file-loader作用是将其他资源复制到指定目录
            loader: 'file-loader'
          }
        ]
      },
      plugins: [
        new htmlWebpackPlugin({
          template: './src/index.html'
        })
      ],
      mode: 'development'
    };
    ```

3. 运行webpack

## devServer
1. 下载包
   >npm install webpack-dev-server --save-dev

2. 修改webpack.config.js配置文件
    ```javascript
    const { resolve } = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
      entry: './src/js/index.js',
      output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
      },
      module: {
        rules: []
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html'
        })
      ],
      mode: 'development',
      devServer: {
        // 项目构建后路径
        contentBase: resolve(__dirname, 'build'),
        // 启动 gzip 压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开浏览器
        open: true
      }
    };

    ```

3. 运行指令: npx webpack-dev-server

## 开发总配置
1. 修改webpack.config.js的配置
    ```javascript
    const { resolve } = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
      entry: './src/js/index.js',
      output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
      },
      module: {
        rules: [
          {
            // 处理 css 资源
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            // 处理 less 资源
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
          },
          {
            // 处理图片资源
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader',
            options: {
              name: '[hash:10].[ext]',
              limit: 8 * 1024,
              // 导出目录
              outputPath: 'imgs',
              // 关闭 es6 模块化
              enModule: false
            }
          },
          {
            // 处理 html 中 img 资源
            test: /\.html$/,
            loader: 'html-loader'
          },
          {
            // 处理其他资源
            exclude: /\.(html|css|js|less|png|jpg|gif)$/,
            loader: 'file-loader',
            options: {
              name: '[hash:10].[ext]',
              outputPath: 'media'
            }
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html'
        })
      ],
      mode: 'development',
      devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true
      }
    };
    ```

2. 运行npx webpack-dev-server