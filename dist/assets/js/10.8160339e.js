(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{368:function(e,n,l){"use strict";l.r(n);var t=l(45),s=Object(t.a)({},(function(){var e=this,n=e.$createElement,l=e._self._c||n;return l("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[l("h1",{attrs:{id:"开发环境下打包图片资源"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#开发环境下打包图片资源"}},[e._v("#")]),e._v(" 开发环境下打包图片资源")]),e._v(" "),l("ol",[l("li",[l("p",[e._v("下载loader")]),e._v(" "),l("blockquote",[l("p",[e._v("npm install --save-dev html-loader url-loader file-load")])])]),e._v(" "),l("li",[l("p",[e._v("修改webpack.config.js")])])]),e._v(" "),l("div",{staticClass:"language- extra-class"},[l("pre",{pre:!0,attrs:{class:"language-text"}},[l("code",[e._v("const { resolve } = require('path');\nconst HtmlWebpackPlugin = require('html-webpack-plugin');\n\nmodule.exports = {\n  entry: './src/index.js',\n  output: {\n    filename: 'built.js',\n    path: resolve(__dirname, 'build')\n  },\n  module: {\n    rules: [\n      {\n        test: /\\.less$/,\n        // 要使用多个 loader 处理用 use\n        use: ['style-loader', 'css-loader', 'less-loader']\n      },\n      {\n        // 问题：默认处理不了 html 中 img 图片\n        // 处理图片资源\n        test: /\\.(jpg|png|gif)$/,\n        loader: 'url-loader',\n        options: {\n          limit: 74 * 1024,\n          // 问题：因为 url-loader 默认使用 es6 模块化解析，而 html-loader 引入图片是 commonjs\n          // 解析时会出问题：[object Module]\n          // 解决：关闭 url-loader 的 es6 模块化，使用 commonjs 解析\n          esModule: false,\n          // 给图片进行重命名\n          // [hash:10]取图片的 hash 的前 10 位\n          // [ext]取文件原来扩展名\n          name: '[hash:10].[ext]'\n        }\n      },\n      {\n        test: /\\.html$/,\n        // 处理 html 文件的 img 图片（负责引入 img，从而能被 url-loader 进行处理）\n        loader: 'html-loader'\n      }\n    ]\n  },\n  plugins: [\n    new HtmlWebpackPlugin({\n      template: './src/index.html'\n    })\n  ],\n  mode: 'development'\n};\n")])])]),l("ol",{attrs:{start:"3"}},[l("li",[e._v("运行webpack")])])])}),[],!1,null,null,null);n.default=s.exports}}]);