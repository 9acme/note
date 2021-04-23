# 开发环境下打包其他资源
1. 下载loader
   >npm i file-loader -S

2. 修改webpack.config.js
```
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