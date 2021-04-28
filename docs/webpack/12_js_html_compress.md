# 生产环境下js和html压缩
1. 下载插件
   >npm install --save-dev html-webpack-plugin

2. 修改webpack.config.js文件
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
    rules: []
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩 html 代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    })
  ],
  //改为生产模式会自动压缩js
  mode: 'production'
};
```

3. 运行webpack