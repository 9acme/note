(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{367:function(e,n,s){"use strict";s.r(n);var t=s(45),l=Object(t.a)({},(function(){var e=this,n=e.$createElement,s=e._self._c||n;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"开发环境下打包其他资源"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#开发环境下打包其他资源"}},[e._v("#")]),e._v(" 开发环境下打包其他资源")]),e._v(" "),s("ol",[s("li",[s("p",[e._v("下载loader")]),e._v(" "),s("blockquote",[s("p",[e._v("npm i file-loader -S")])])]),e._v(" "),s("li",[s("p",[e._v("修改webpack.config.js")])])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("const { resolve } = require('path');\nconst htmlWebpackPlugin = require('html-webpack-plugin');\n\nmodule.exports = {\n  entry: './src/index.js',\n  output: {\n    filename: 'built.js',\n    path: resolve(__dirname, 'build')\n  },\n  module: {\n    rules: [\n      {\n        test: /\\.css$/,\n        use: ['style-loader', 'css-loader']\n      },\n      // 打包其他资源(除了 html/js/css 资源以外的资源)\n      {\n        // 排除 css/js/html/png/jpg/gif/less/scss 资源, 排除用exclude\n        exclude: /\\.(html|css|js|png|jpg|gif|less|scss)$/,\n        //file-loader作用是将其他资源复制到指定目录\n        loader: 'file-loader'\n      }\n    ]\n  },\n  plugins: [\n    new htmlWebpackPlugin({\n      template: './src/index.html'\n    })\n  ],\n  mode: 'development'\n};\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[e._v("运行webpack")])])])}),[],!1,null,null,null);n.default=l.exports}}]);