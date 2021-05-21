# 模块化

## 模块化历史

1. 全局 function 模式

   - 说明

     - 全局函数模式: 将不同的功能封装成不同的全局函数
     - 问题: Global 被污染了, 很容易引起命名冲突

   - module1.js

     ```javascript
     //数据
     let data = 'atguigu.com';

     //操作数据的函数
     function foo() {
       console.log(`foo() ${data}`);
     }
     function bar() {
       console.log(`bar() ${data}`);
     }
     ```

   - module2.js

     ```javascript
     let data2 = 'other data';

     function foo() {
       //与另一个模块中的函数冲突了
       console.log(`foo() ${data2}`);
     }
     ```

   - test1.html

     ```html
     <script type="text/javascript" src="module1.js"></script>
     <script type="text/javascript" src="module2.js"></script>
     <script type="text/javascript">
       let data = '修改后的数据';
       foo();
       bar();
     </script>
     ```

2) namespace 模式

   - 说明

     - namespace 模式: 简单对象封装
     - 作用: 减少了全局变量
     - 问题: 不安全

   - module1.js

     ```javascript
     let myModule = {
       data: 'atguigu.com',
       foo() {
         console.log(`foo() ${this.data}`);
       },
       bar() {
         console.log(`bar() ${this.data}`);
       }
     };
     ```

   - module2.js

     ```javascript
     let myModule2 = {
       data: 'atguigu.com2222',
       foo() {
         console.log(`foo() ${this.data}`);
       },
       bar() {
         console.log(`bar() ${this.data}`);
       }
     };
     ```

   - test2.html

     ```javascript
     <script type="text/javascript" src="module2.js"></script>
     <script type="text/javascript" src="module22.js"></script>
     <script type="text/javascript">
       myModule.foo()
       myModule.bar()

       myModule2.foo()
       myModule2.bar()

       myModule.data = 'other data' //能直接修改模块内部的数据
       myModule.foo()

     </script>
     ```

3. IIFE 模式

   - 说明:

     - IIFE 模式: 匿名函数自调用(闭包)
     - IIFE : immediately-invoked function expression(立即调用函数表达式)
     - 作用: 数据是私有的, 外部只能通过暴露的方法操作
     - 问题: 如果当前这个模块依赖另一个模块怎么办?

   - module3.js

     ```javascript
     (function(window) {
       //数据
       let data = 'atguigu.com';

       //操作数据的函数
       function foo() {
         //用于暴露有函数
         console.log(`foo() ${data}`);
       }

       function bar() {
         //用于暴露有函数
         console.log(`bar() ${data}`);
         otherFun(); //内部调用
       }

       function otherFun() {
         //内部私有的函数
         console.log('otherFun()');
       }

       //暴露行为
       window.myModule = { foo, bar };
     })(window);
     ```

   - test3.html

     ```html
     <script type="text/javascript" src="module3.js"></script>
     <script type="text/javascript">
       myModule.foo();
       myModule.bar();
       //myModule.otherFun()  //myModule.otherFun is not a function
       console.log(myModule.data); //undefined 不能访问模块内部数据
       myModule.data = 'xxxx'; //不是修改的模块内部的data
       myModule.foo(); //没有改变
     </script>
     ```

4) IIFE 模式增强

   - 说明

     - IIFE 模式增强 : 引入依赖
     - 这就是现代模块实现的基石

   - 引入 jquery 到项目中

     - module4.js

       ```javascript
       (function(window, $) {
         //数据
         let data = 'atguigu.com';

         //操作数据的函数
         function foo() {
           //用于暴露有函数
           console.log(`foo() ${data}`);
           $('body').css('background', 'red');
         }

         function bar() {
           //用于暴露有函数
           console.log(`bar() ${data}`);
           otherFun(); //内部调用
         }

         function otherFun() {
           //内部私有的函数
           console.log('otherFun()');
         }

         //暴露行为
         window.myModule = { foo, bar };
       })(window, jQuery);
       ```

5. 页面加载多个 js 的问题

   - 说明

     - 一个页面需要引入多个 js 文件

     - 问题:

       - 请求过多

       - 依赖模糊
       - 难以维护

     - 这些问题可以通过现代模块化编码和项目构建来解决

   - 页面

     ```html
     <script type="text/javascript" src="module1.js"></script>
     <script type="text/javascript" src="module2.js"></script>
     <script type="text/javascript" src="module3.js"></script>
     <script type="text/javascript" src="module4.js"></script>
     ```

## CommonJS_Node 模块化

1. 下载安装 node.js

2. 创建项目结构

   ```
   |-modules
     |-module1.js
     |-module2.js
     |-module3.js
   |-app.js
   |-package.json
     {
       "name": "commonJS-node",
       "version": "1.0.0"
     }
   ```

3. 下载第三方模块

   - npm install uniq --save

4. 模块化编码

   - module1.js

     ```javascript
     module.exports = {
       foo() {
         console.log('moudle1 foo()');
       }
     };
     ```

   - module2.js

     ```javascript
     module.exports = function() {
       console.log('module2()');
     };
     ```

   - module3.js

     ```javascript
     exports.foo = function() {
       console.log('module3 foo()');
     };

     exports.bar = function() {
       console.log('module3 bar()');
     };
     ```

   - app.js

     ```javascript
     /**
       理解: commonjs暴露的其实就是exports,
       	   因此可以给exports直接赋值或者给exports添加属性和方法

       1. 定义暴露模块:
         module.exports = value;
         exports.xxx = value;

       2. 引入模块:
         var module = require(模块名或模块路径);
      */
     'use strict';
     //引用模块
     let module1 = require('./modules/module1');
     let module2 = require('./modules/module2');
     let module3 = require('./modules/module3');

     let uniq = require('uniq');
     let fs = require('fs');

     //使用模块
     module1.foo();
     module2();
     module3.foo();
     module3.bar();

     console.log(uniq([1, 3, 1, 4, 3]));

     fs.readFile('app.js', function(error, data) {
       console.log(data.toString());
     });
     ```

   - 通过 node 运行 app.js

     - 命令: node app.js
     - 工具: 右键-->运行

## CommonJS_Browserify 模块化

1. 创建项目结构

   ```
   |-js
     |-dist //打包生成文件的目录
     |-src //源码所在的目录
       |-module1.js
       |-module2.js
       |-module3.js
       |-app.js //应用主源文件
   |-index.html
   |-package.json
     {
       "name": "browserify-test",
       "version": "1.0.0"
     }
   ```

2. 下载 browserify

   - 全局: npm install browserify -g
   - 局部: npm install browserify --save-dev

3. 定义模块代码

   - module1.js

     ```javascript
     module.exports = {
       foo() {
         console.log('moudle1 foo()');
       }
     };
     ```

   - module2.js

     ```javascript
     module.exports = function() {
       console.log('module2()');
     };
     ```

   - module3.js

     ```javascript
     exports.foo = function() {
       console.log('module3 foo()');
     };

     exports.bar = function() {
       console.log('module3 bar()');
     };
     ```

   - app.js (应用的主 js)

     ```javascript
     //引用模块
     let module1 = require('./module1');
     let module2 = require('./module2');
     let module3 = require('./module3');

     let uniq = require('uniq');

     //使用模块
     module1.foo();
     module2();
     module3.foo();
     module3.bar();

     console.log(uniq([1, 3, 1, 4, 3]));
     ```

4. 打包处理 js

   - browserify js/src/app.js -o js/dist/bundle.js

5. 页面使用引入

   ```html
   <script type="text/javascript" src="js/dist/bundle.js"></script>
   ```

## AMD 模块化

1. 下载 require.js, 并引入

   - 官网: http://www.requirejs.cn/
   - github : https://github.com/requirejs/requirejs
   - 将 require.js 导入项目: js/libs/require.js

2. 创建项目结构

   ```
   |-js
     |-libs
       |-require.js
     |-modules
       |-alerter.js
       |-dataService.js
     |-main.js
   |-index.html
   ```

3. 定义 require.js 的模块代码

   - dataService.js

     ```javascript
     define(function() {
       let msg = 'atguigu.com';

       function getMsg() {
         return msg.toUpperCase();
       }

       return { getMsg };
     });
     ```

   - alerter.js

     ```javascript
     // 传参
     define(['dataService', 'jquery'], function(dataService, $) {
       let name = 'Tom2';

       function showMsg() {
         $('body').css('background', 'gray');
         alert(dataService.getMsg() + ', ' + name);
       }

       return { showMsg };
     });
     ```

4. 应用主(入口)js: main.js

   ```javascript
   (function() {
     //配置
     require.config({
       //基本路径
       baseUrl: 'js/',
       //模块标识名与模块路径映射
       paths: {
         alerter: 'modules/alerter', // 不能加后缀
         dataService: 'modules/dataService'
       }
     });
     //引入使用模块
     require(['alerter'], function(alerter) {
       alerter.showMsg();
     });
   })();
   ```

5. 页面使用模块

   ```html
   <script data-main="js/main" src="js/libs/require.js"></script>
   ```

6. 使用第三方基于 require.js 的框架(jquery)

   - 将 jquery 的库文件导入到项目

     - js/libs/jquery-1.10.1.js

   - 在 main.js 中配置 jquery 路径

     ```javascript
     paths: {
         'jquery': 'libs/jquery-1.10.1'
     }
     ```

   - 在 alerter.js 中使用 jquery

     ```javascript
     define(['dataService', 'jquery'], function(dataService, $) {
       var name = 'xfzhang';
       function showMsg() {
         $('body').css({ background: 'red' });
         alert(name + ' ' + dataService.getMsg());
       }
       return { showMsg };
     });
     ```

7. 使用第三方不基于 require.js 的框架(angular/angular-messages)

   - 将 angular.js 和 angular-messages.js 导入项目

     - js/libs/angular.js
     - js/libs/angular-messages.js

   - 在 main.js 中配置

     ```javascript
     (function() {
       require.config({
         //基本路径
         baseUrl: 'js/',

         //模块标识名与模块路径映射
         paths: {
           //第三方库
           jquery: 'libs/jquery-1.10.1',
           angular: 'libs/angular',
           'angular-messages': 'libs/angular-messages',
           //自定义模块
           alerter: 'modules/alerter',
           dataService: 'modules/dataService'
         },

         /*
          	配置不兼容AMD的模块
          	exports : 指定导出的模块名
          	deps  : 指定所有依赖的模块的数组
          */
         shim: {
           angular: {
             exports: 'angular'
           },
           'angular-messages': {
             exports: 'angular-messages',
             deps: ['angular']
           }
         }
       });

       //引入使用模块
       require(['alerter', 'angular', 'angular-messages'], function(alerter, angular) {
         alerter.showMsg();
         angular.module('myApp', ['ngMessages']);
         angular.bootstrap(document, ['myApp']);
       });
     })();
     ```

   - 页面

     ```html
     <form name="myForm">
       用户名: <input type="text" name="username" ng-model="username" ng-required="true" />
       <div style="color: red;" ng- show="myForm.username.$dirty&&myForm.username.$invalid">用户名是必须的</div>
     </form>
     ```

## CMD 模块化

1. 下载 sea.js, 并引入

   - 官网: http://seajs.org/
   - github : https://github.com/seajs/seajs
   - 将 sea.js 导入项目: js/libs/sea.js

2. 创建项目结构

   ```
   |-js
     |-libs
       |-sea.js
     |-modules
       |-module1.js
       |-module2.js
       |-module3.js
       |-module4.js
       |-main.js
   |-index.html
   ```

3. 定义 sea.js 的模块代码

   - module1.js

     ```javascript
     //第一种导出方式
     define(function(require, exports, module) {
       //内部变量数据
       var data = 'atguigu.com';
       //内部函数
       function show() {
         console.log('module1 show() ' + data);
       }

       //向外暴露
       exports.show = show;
     });
     ```

   - module2.js

     ```javascript
     //第二种导出方式
     define(function(require, exports, module) {
       module.exports = {
         msg: 'I Will Back'
       };
     });
     ```

   - module3.js

     ```javascript
     define(function(require, exports, module) {
       const API_KEY = 'abc123';
       exports.API_KEY = API_KEY;
     });
     ```

   - module4.js

     ```javascript
     define(function(require, exports, module) {
       //引入依赖模块(同步)
       var module2 = require('./module2');

       function show() {
         console.log('module4 show() ' + module2.msg);
       }

       exports.show = show;
       //引入依赖模块(异步)
       require.async('./module3', function(m3) {
         console.log('异步引入依赖模块3  ' + m3.API_KEY);
       });
     });
     ```

   - main.js : 主(入口)模块

     ```javascript
     define(function(require) {
       var m1 = require('./module1');
       var m4 = require('./module4');
       m1.show();
       m4.show();
     });
     ```

4. index.html

   ```html
   <!--
   使用seajs:
     1. 引入sea.js库
     2. 如何定义导出模块 :
       define()
       exports
       module.exports
     3. 如何依赖模块:
       require()
     4. 如何使用模块:
       seajs.use()
   -->
   <script type="text/javascript" src="js/libs/sea.js"></script>
   <script type="text/javascript">
     seajs.use('./js/modules/main');
   </script>
   ```

## Es6 模块化

1. 创建目录结构

   ```
   |-src
     |-module1.js
     |-module2.js
     |-module3.js
     |-app.js
   |-package.json
     {
         "name" : "es6-babel-browserify",
         "version" : "1.0.0"
     }
   ```

2. 安装 babel-cli, babel-preset-es2015 和 browserify

   - npm install babel-cli browserify -g
   - npm install babel-preset-es2015 --save-dev

3. 定义.babelrc 文件

   ```json
   {
     "presets": ["es2015"]
   }
   ```

4. 编码

   - module1.js

     ```javascript
     //第一种导出方式
     export function foo() {
       console.log('module1 foo()');
     }

     export let bar = function() {
       console.log('module1 bar()');
     };

     export const DATA_ARR = [1, 3, 5, 1];
     ```

   - module2.js

     ```javascript
     let data = 'module2 data';

     function fun1() {
       console.log('module2 fun1() ' + data);
     }

     function fun2() {
       console.log('module2 fun2() ' + data);
     }

     //第二种导出方式
     export { fun1, fun2 };
     ```

   - module3.js

     ```javascript
     //第三种导出方式, 一个模块只能有一个
     export default {
       name: 'Tom',
       setName: function(name) {
         this.name = name;
       }
     };
     ```

   - app.js

     ```javascript
     // 导入和导出的名字需要一致, 可以使用as重命名
     import { foo, bar } from './module1';
     import { DATA_ARR } from './module1'; //? vue中如何使用amd和cmd模块
     import { fun1, fun2 } from './module2';
     import person from './module3';
     ```

5. 编译

   - 第一步: 使用 Babel 将 ES6 编译为 ES5 代码(但包含 CommonJS 语法) : babel js/src -d js/lib
   - 第二步: 使用 Browserify 编译 js : browserify js/lib/app.js -o js/lib/bundle.js

6. 页面中引入测试

   ```html
   <script type="text/javascript" src="js/lib/bundle.js"></script>
   ```



7. 引入第三方模块(jQuery)

   - 下载 jQuery 模块

     - npm install jquery@1 --save

   - 在 app.js 中引入并使用

     ```javascript
     import $ from 'jquery';
     $('body').css('background', 'red');
     ```

8. 动态import

   ```javascript
   import('文件路径').then(module => {
   	module.hello();
   });
   ```



