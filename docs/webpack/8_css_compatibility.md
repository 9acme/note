# 开发环境下css兼容
1. 下载loader
   >npm install --save-dev postcss-loader postcss-preset-env

2. 修改webpack.config.js配置
```
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// process.env.NODE_ENV = 'envelopment';  //node环境

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            //loader配置
            options: {
              ident: 'postcss',
              plugins: () => [
                // postcss 的插件, node版本不同可能需要修改配置
                require('postcss-preset-env')()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    })
  ],
  mode: 'production'
};
```

3. 修改package.json
```
// json文件不能有注释, 直接复制请删除注释
//兼容哪些浏览器, 可以根据node环境去选择相应的配置
//想知道更多详细配置, 去github搜索browserslist
"browserslist": {
    //开发环境
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],
    //生产环境
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ]
  }
```

4. 运行webpack