(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{391:function(n,s,e){"use strict";e.r(s);var t=e(45),a=Object(t.a)({},(function(){var n=this,s=n.$createElement,e=n._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[e("h1",{attrs:{id:"开发环境下css兼容"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#开发环境下css兼容"}},[n._v("#")]),n._v(" 开发环境下css兼容")]),n._v(" "),e("ol",[e("li",[e("p",[n._v("下载loader")]),n._v(" "),e("blockquote",[e("p",[n._v("npm install --save-dev postcss-loader postcss-preset-env")])])]),n._v(" "),e("li",[e("p",[n._v("修改webpack.config.js配置")])])]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("const { resolve } = require('path');\nconst MiniCssExtractPlugin = require('mini-css-extract-plugin');\nconst HtmlWebpackPlugin = require('html-webpack-plugin');\n\n// process.env.NODE_ENV = 'envelopment';  //node环境\n\nmodule.exports = {\n  entry: './src/js/index.js',\n  output: {\n    filename: 'js/built.js',\n    path: resolve(__dirname, 'build')\n  },\n  module: {\n    rules: [\n      {\n        test: /\\.css$/,\n        use: [\n          MiniCssExtractPlugin.loader,\n          'css-loader',\n          {\n            loader: 'postcss-loader',\n            //loader配置\n            options: {\n              ident: 'postcss',\n              plugins: () => [\n                // postcss 的插件, node版本不同可能需要修改配置\n                require('postcss-preset-env')()\n              ]\n            }\n          }\n        ]\n      }\n    ]\n  },\n  plugins: [\n    new HtmlWebpackPlugin({\n      template: './src/index.html'\n    }),\n    new MiniCssExtractPlugin({\n      filename: 'css/built.css'\n    })\n  ],\n  mode: 'production'\n};\n")])])]),e("ol",{attrs:{start:"3"}},[e("li",[n._v("修改package.json")])]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v('// json文件不能有注释, 直接复制请删除注释\n//兼容哪些浏览器, 可以根据node环境去选择相应的配置\n//想知道更多详细配置, 去github搜索browserslist\n"browserslist": {\n    //开发环境\n    "development": [\n      "last 1 chrome version",\n      "last 1 firefox version",\n      "last 1 safari version"\n    ],\n    //生产环境\n    "production": [\n      ">0.2%",\n      "not dead",\n      "not op_mini all"\n    ]\n  }\n')])])]),e("ol",{attrs:{start:"4"}},[e("li",[n._v("运行webpack")])])])}),[],!1,null,null,null);s.default=a.exports}}]);