# 生产环境下js语法检查
1. 下载包
   >npm install --save-dev eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import

2. 修改webpack.config.js配置文件
```
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    /*语法检查： eslint-loader eslint
      注意：只检查自己写的源代码，第三方的库是不用检查的
      设置检查规则：
        package.json 中 eslintConfig 中设置~
          "eslintConfig": {
             "extends": "airbnb-base"
          }

      airbnb --> eslint-config-airbnb-base eslint-plugin-import eslint
     */
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // 自动修复 eslint 的错误
          fix: true
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'production'
};
```

3. 修改package.json文件
```
//在package中增加该配置
"eslintConfig": {
    "extends": "airbnb-base",
    "env": {
      "browser": true
    }
  }
```

4. 运行webpack