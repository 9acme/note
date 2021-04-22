# 开发环境下打包样式资源
1. 下载loader(less-loader或sass-loader只需下载一个即可)
   > npm i css-loader style-loader less-loader less sass-loader -D

2. 修改webpack.config.js文件
```
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

