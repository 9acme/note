# 生产环境

## 单独提取css文件
1. 下载插件
   >npm install --save-dev mini-css-extract-plugin

2. 修改webpack.config.js的配置
    ```javascript
    const { resolve } = require('path');
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
            test: /\.css$/,
            use: [
              // 创建 style 标签，将样式放入
              // 'style-loader',
              // 这个 loader 取代 style-loader。作用：提取 js 中的 css 成单独文件
              MiniCssExtractPlugin.loader,
              // 将 css 文件整合到 js 文件中
              'css-loader'
            ]
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
          // 对输出的 css 文件进行重命名
          filename: 'css/built.css'
        })
      ],
      mode: 'production'
    };
    ```

3. 运行指令: webpack

## css兼容
1. 下载loader
   >npm install --save-dev postcss-loader postcss-preset-env

2. 修改webpack.config.js配置
    ```javascript
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
    ```javascript
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

## css压缩
1. 下载插件
   >npm install --save-dev optimize-css-assets-webpack-plugin

2. 修改webpack.config.js文件
    ```javascript
    const { resolve } = require('path');
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

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
                options: {
                  ident: 'postcss',
                  plugins: () => [require('postcss-preset-env')()]
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
        }),

        // 压缩 css
        new OptimizeCssAssetsWebpackPlugin()
      ],
      mode: 'production'
    };
    ```

3. 运行webpack

## js语法检查
1. 下载包
   >npm install --save-dev eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import

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
    ```json
    //在package中增加该配置
    "eslintConfig": {
        "extends": "airbnb-base",
        "env": {
          "browser": true
        }
      }
    ```

4. 运行webpack

## js兼容
1. 下载loader(@babel/polyfill已废弃)
   >npm install --save-dev babel-loader @babel/core @babel/preset-env  core-js

2. 修改webpack.config.js配置
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
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              // 预设：指示 babel 做怎么样的兼容性处理
              presets: [
                [
                  '@babel/preset-env',
                  {
                    // 按需加载
                    useBuiltIns: 'usage',
                    // 指定 core-js 版本
                    corejs: {
                      version: 3
                    },
                    // 指定兼容性做到哪个版本浏览器
                    targets: {
                      chrome: '60',
                      firefox: '60',
                      ie: '9',
                      safari: '10',
                      edge: '17'
                    }
                  }
                ]
              ]
            }
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

## js和html压缩
1. 下载插件
   >npm install --save-dev html-webpack-plugin

2. 修改webpack.config.js文件
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

## 生产总配置
1. 修改webpack.config.js的配置
    ```javascript
    const { resolve } = require('path');
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    // 定义 nodejs 环境变量：决定使用 browserslist 的哪个环境
    process.env.NODE_ENV = 'production';

    // 复用 loader
    let commonCssLoader = [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        // 还需要在 package.json 中定义 browserslist
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: () => [require('postcss-preset-env')()]
        }
      }
    ];

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
            use: [...commonCssLoader]
          },
          {
            test: /\.less$/,
            use: [...commonCssLoader, 'less-loader']
          },
          /*正常来讲，一个文件只能被一个 loader 处理。
            当一个文件要被多个 loader 处理，那么一定要指定 loader 执行的先后顺序：
            先执行 eslint 在执行 babel
          */
          {
            // 在 package.json 中 eslintConfig --> airbnb
            test: /\.js$/,
            exclude: /node_modules/,
            // 优先执行
            enforce: 'pre',
            loader: 'eslint-loader',
            options: {
              fix: true
            }
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: {
                      version: 3
                    },
                    targets: {
                      chrome: '60',
                      firefox: '60',
                      ie: '9',
                      safari: '10',
                      edge: '17'
                    }
                  }
                ]
              ]
            }
          },
          {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 73 * 1024,
              name: '[hash:10].[ext]',
              outputPath: 'imgs'
            }
          },
          {
            exclude: /\.(html|css|less|js|png|jpg|gif)$/,
            loader: 'file-loader',
            options: {
              name: '[hash:10].[ext]',
              outputPath: 'media'
            }
          }
        ]
      },
      plugins: [
        new OptimizeCssAssetsWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: './src/index.html',
          minify: {
            collapseWhitespace: true,
            removeComments: true
          }
        }),
        new MiniCssExtractPlugin({
          filename: 'css/built.css'
        })
      ],
      mode: 'production'
    };
    ```

2. 在package.json中添加browserslist属性
    ```json
    "browserslist": {
        "development": [
          "last 1 chrome version",
          "last 1 firefox version",
          "last 1 safari version"
        ],
        "production": [
          ">0.2%",
          "not dead",
          "not op_mini all"
        ]
    }
    ```

    3. 在package.json中添加eslintConfig属性
    ```json
    "eslintConfig": {
        "extends": "airbnb-base",
        "env": {
          "browser": true
        }
    }
    ```

4. 运行webpack