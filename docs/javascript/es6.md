# ES6 - ES11

## let

1. 应用场景

   - 用于声明变量

2. 使用方式

   ```javascript
   //声明变量
   let a;

   //1. 变量不能重复声明
   // let star = '罗志祥';
   // let star = '小猪';

   //2. 块儿级作用域  全局, 函数, eval
   // if else while for
   // {
   //     let girl = '周扬青';
   // }
   // console.log(girl); //访问不到girl

   //3. 不存在变量提升
   // console.log(song);
   // let song = '恋爱达人';

   //4. 不影响作用域链
   {
     let school = '尚硅谷';
     function fn() {
       console.log(school);
     }
     fn();
   }
   ```



## const

1. 应用场景

   - 声明常量, 声明对象类型使用 const，非对象类型声明选择 let

2. 使用方式

   ```javascript
   //声明常量
   const SCHOOL = '尚硅谷';

   //1. 一定要赋初始值
   // const A;

   //2. 一般常量使用大写(潜规则)
   // const a = 100;

   //3. 常量的值不能修改
   // SCHOOL = 'ATGUIGU';

   //4. 块儿级作用域
   // {
   //     const PLAYER = 'UZI';
   // }
   // console.log(PLAYER);

   //5. 对于数组和对象的元素修改, 不算做对常量的修改, 不会报错
   const TEAM = ['UZI', 'MXLG', 'Ming', 'Letme'];
   // TEAM.push('Meiko');
   ```

3. 注意点

   - 对象属性修改和数组元素变化不会触发 const 错误(因为 const 存的是对象地址)



## 解构赋值

1. 使用方式

   ```javascript
   //ES6 允许按照一定模式从数组和对象中提取值，对变量进行赋值，这被称为解构赋值。

   //1. 数组的结构
   const [xiao, liu, zhao, song] = ['小沈阳', '刘能', '赵四', '宋小宝'];

   //2. 对象的解构
   const zhao = {
     name: '赵本山',
     age: '不详',
     xiaopin: function() {
       console.log('我可以演小品');
     }
   };
   let { name, age, xiaopin } = zhao;

   //复杂解构
   let wangfei = {
     name: '王菲',
     age: 18,
     songs: ['红豆', '流年', '暧昧', '传奇'],
     history: [{ name: '窦唯' }, { name: '李亚鹏' }, { name: '谢霆锋' }]
   };

   let {
     songs: [one, two, three],
     history: [first, second, third]
   } = wangfei;
   ```

2. 注意点

   - 频繁使用对象方法、数组元素，就可以使用解构赋值形式



## 模板字符串

1. 应用场景

   - 当遇到字符串与变量拼接的情况使用模板字符串(特别是需要换行的时候), 比如拼接 html 代码

2. 使用方式

   ```javascript
   // 1. 用反引号（`）标识
   // 2. 字符串中可以出现换行符
   let str = `<ul>
               <li>沈腾</li>
               <li>玛丽</li>
               <li>魏翔</li>
               <li>艾伦</li>
               </ul>`;

   // 3. 可以使用 ${xxx} 形式输出变量
   let out = `${lovest}是我心目中最搞笑的演员!!`;
   ```



## 简化对象写法

1. 使用方式

   ```javascript
   // 1. 属性与属性值同名时, 可以简写属性
   // 2. 方法可以省略function
   const school = {
     name,
     change,
     improve() {
       console.log('我们可以提高你的技能');
     }
   };
   ```



## 箭头函数

1. 应用场景

   - 回调函数中，例如事件处理器或者定时器等

2. 使用方式

   ```javascript
   //1. 箭头函数会默认帮我们绑定外层this的值，所以在箭头函数中this的值和外层的this是一样的
   window.name = '尚硅谷';
   const school = {
     name: 'ATGUIGU'
   };
   function getName() {
     console.log(this.name);
   }
   let getName2 = () => {
     console.log(this.name);
   };

   //2. 不能作为构造实例化对象
   let Person = (name, age) => {
     this.name = name;
     this.age = age;
   };
   let me = new Person('xiao', 30);
   console.log(me);

   //3. 不能使用 arguments 变量
   let fn = () => {
     console.log(arguments);
   };
   fn(1, 2, 3);

   // 4.只有一个参数是()可以省略
   let add = n => {
     return n + n;
   };

   // 5. 函数体如果只有一条语句，则花括号可以省略，
   //    函数的返回值为该条语句的执行结果
   let pow = n => n * n;
   console.log(pow(8));
   ```



## rest 参数

1. 应用场景

   - rest 参数非常适合不定个数参数函数的场景

2. 使用方式

   ```javascript
   //rest 数组
   // rest 参数必须要放到参数最后,  使用...符号
   function fn(a, b, ...args) {
     console.log(a);
     console.log(b);
     console.log(args);
   }
   fn(1, 2, 3, 4, 5, 6);

   //rest 对象
   function connect({ host, port, ...user }) {
     console.log(host);
     console.log(port);
     console.log(user);
   }

   connect({
     host: '127.0.0.1',
     port: 3306,
     username: 'root',
     password: 'root',
     type: 'master'
   });
   ```

3. 注意点

   - `...`符号被赋值时为 rest 参数, 赋值时为扩展运算符



## 扩展运行符

1. 使用方式

   ```javascript
   // 展开数组
   let tfboys = ['德玛西亚之力', '德玛西亚之翼', '德玛西亚皇子'];
   function fn() {
     console.log(arguments);
   }
   fn(...tfboys);

   // 展开对象
   let skillOne = {
     q: '致命打击'
   };
   let skillTwo = {
     w: '勇气'
   };
   let gailun = { ...skillOne, ...skillTwo };
   ```



## Symbol

1. 应用场景

   - 遇到唯一性的场景时要想到 Symbol

2. 使用方式

   ```javascript
   // 创建Symbol
   let s = Symbol();
   console.log(s, typeof s);

   // 添加标识
   let s2 = Symbol('尚硅谷');
   let s3 = Symbol('尚硅谷');

   // Symbol.for 创建
   // 返回由给定的 key 找到的 symbol，否则就是返回新创建的 symbol。
   let s4 = Symbol.for('尚硅谷');
   let s5 = Symbol.for('尚硅谷');

   // 1. 不能与其他数据进行运算
   // let result = s + 100;
   // let result = s > 100;
   // let result = s + s;

   // 2.Symbol 定义 的 对象属 性 不能 使 用 for…in 循 环遍 历 ，
   // 但是可以使用Reflect.ownKeys 来获取对象的所有键名

   // 3. description获取symbol的描述
   console.log(s2.description);
   ```



## 迭代器

1. 应用场景

   - 需要自定义遍历数据的时候，要想到迭代器。

2. 使用方式

   ```javascript
   //声明一个对象
   const banji = {
     name: '终极一班',
     stus: ['xiaoming', 'xiaoning', 'xiaotian', 'knight'],

     //部署 Iterator 接口
     [Symbol.iterator]() {
       //索引变量
       let index = 0;
       let _this = this;
       return {
         next: function() {
           if (index < _this.stus.length) {
             const result = { value: _this.stus[index], done: false };
             //下标自增
             index++;
             //返回结果
             return result;
           } else {
             return { value: undefined, done: true };
           }
         }
       };
     }
   };

   //使用迭代器遍历这个对象   for...of
   for (let v of banji) {
     console.log(v);
   }
   ```

3. 原理

   - 第一步: 创建一个指针对象，指向当前数据结构的起始位置
   - 第二步: 第一次调用对象的 next 方法，指针自动指向数据结构的第一个成员
   - 第三步: 接下来不断调用 next 方法，指针一直往后移动，直到指向最后一个成员
   - 第四步: 每调用 next 方法返回一个包含 value 和 done 属性的对象



## 生成器

1. 应用场景

   - 异步编程的时候可以使用

2. 使用方式

   ```javascript
   //模拟获取  用户数据  订单数据  商品数据
   function getUsers() {
     setTimeout(() => {
       let data = '用户数据';
       // 调用 next 方法, 并且将数据传入
       iterator.next(data);
     }, 1000);
   }

   function getOrders() {
     setTimeout(() => {
       let data = '订单数据';
       // next 方法可以传递实参，作为 yield 语句的返回值
       iterator.next(data);
     }, 1000);
   }

   function getGoods() {
     setTimeout(() => {
       let data = '商品数据';
       iterator.next(data);
     }, 1000);
   }

   //* 的位置没有限制, 可以偏左或偏右
   function* gen() {
     // yield 相当于函数的暂停标记，也可以认为是函数的分隔符，
     // 每调用一次 next方法，执行一段代码
     let users = yield getUsers();
     let orders = yield getOrders();
     let goods = yield getGoods();
   }

   // 调用生成器函数, 返回的是迭代器对象
   let iterator = gen();

   // 调用迭代器对象的 next 方法可以得到yield 语句后的值
   iterator.next();
   ```

3. 注意点

   - 第二个 next 传入的参数是作为第一个 yield 的返回值



## Promise

1. 应用场景
   - 异步编程的时候可以使用, 用来封装异步操作并可以获取其成功或失败的结果

2. promise源码解析

   - 整体流程图
    ![整体流程图](https://cdn.jsdelivr.net/gh/9acme/assets@note/promise/promise-entirety.svg)
   - 同步与异步操作的区别
    ![整体流程图](https://cdn.jsdelivr.net/gh/9acme/assets@note/promise/promise-async-synch.svg)
   - promise构造函数
    ```JavaScript
    function Promise(executor) {
      // promise状态
      this.PromiseState = 'pending';
      // promise结果
      this.PromiseResult = null;
      // 异步操作时将then方法中的回调函数压入该数组
      this.callBack = [];
      //保存实例的this
      const self = this;

      function resolve(value) {
        //用于判断只允许修改一次
        if (self.PromiseState === 'pending') {
          //改变状态
          self.PromiseState = 'fulfilled';
          //设置对象结果值
          self.PromiseResult = value;

          // promise包含的是异步操作
          // 当resolve方法是异步执行时, 返回的promise对象是pedding状态
          // 而promise对象的then方法是同步的, 所以将then方法中的回调函数保存到callBack数组中
          // 以便异步执行到resolve时调用then方法中的onResolve回调函数
          setTimeout(() => {
            self.callBack.forEach(item => {
              item.onResolve(value);
            });
          });
        }
      }

      function reject(error) {
        //用于判断只允许修改一次
        if (self.PromiseState === 'pending') {
          //改变状态
          self.PromiseState = 'rejected';
          //设置对象结果值
          self.PromiseResult = error;

          //promise包含的是异步操作
          setTimeout(() => {
            self.callBack.forEach(item => {
              item.onReject(error);
            });
          });
        }
      }

      //处理异常, 进行失败调用
      try {
        executor(resolve, reject);
      } catch (error) {
        reject(error);
      }
    }
    ```
    - promise中then方法与canch方法解析
    ```JavaScript
    // then是同步的
    Promise.prototype.then = function (onResolve, onReject) {
      var self = this;

      // 判断失败回调函数是否是方法, 如果不是则创建默认
      // 作用: 传递reject状态, 以便catch方法统一处理reject状态
      if (typeof onReject !== 'function') {
        onReject = err => {
          throw err;
        };
      }

      // 判断成功回调函数是否是方法, 如果不是则创建默认
      if (typeof onResolve !== 'function') {
        onResolve = value => {
          return value;
        };
      }

      return new Promise((resolve, reject) => {
        // 封装函数
        function callback(type) {
          try {
            // 调用then方法传入的回调函数
            let result = type(self.PromiseResult);
            // 判断传入的回调函数是不是promise
            if (result instanceof Promise) {
              result.then(
                value => {
                  resolve(value);
                },
                fail => {
                  reject(fail);
                }
              );
            } else {
              // 如果不是promise则修改状态[成功]
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        }

        if (this.PromiseState === 'fulfilled') {
          setTimeout(() => {
            callback(onResolve);
          });
        }

        if (this.PromiseState === 'rejected') {
          setTimeout(() => {
            callback(onReject);
          });
        }

        if (this.PromiseState === 'pending') {
          this.callBack.push({
            onResolve: function () {
              setTimeout(() => {
                callback(onResolve);
              });
            },
            onReject: function () {
              setTimeout(() => {
                callback(onReject);
              });
            }
          });
        }
      });
    };

    Promise.prototype.catch = function (onRejected) {
      return this.then(undefined, onRejected);
    };
    ```



## Set

1. 概述

   - 类似于数组，但成员的值都是唯一的
   - 集合实现了 iterator 接口, 所以可以使用『扩展运算符』和『for…of…』进行遍历

2. 使用方式

   ```javascript
   //声明一个 set
   let s = new Set();

   let s2 = new Set(['大事儿', '小事儿', '好事儿', '坏事儿', '小事儿']);

   // 使用迭代器遍历
   for (let v of s2) {
     console.log(v);
   }

   //元素个数
   console.log(s2.size);

   //添加新的元素
   s2.add('喜事儿');

   //删除元素
   s2.delete('坏事儿');

   //检测
   console.log(s2.has('糟心事'));

   //清空
   s2.clear();
   console.log(s2);

   // 数组去重
   let arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];
   let result = [...new Set(arr)];
   console.log(result);
   ```



## Map

1. 概述

   - 类似于对象，也是键值对的集合。但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
   - Map 也实现了 iterator 接口，所以可以使用『扩展运算符』和『for…of…』进行遍历。

2. 使用方式

   ```javascript
   //声明 Map
   let m = new Map();

   //添加元素
   m.set('name','尚硅谷');
   m.set('change', function(){
       console.log("我们可以改变你!!");
   });
   let key = {
       school : 'ATGUIGU'
   };
   m.set(key, ['北京','上海','深圳']);

   //size
   console.log(m.size);

   //删除
   m.delete('name');

   //获取
   console.log(m.get('change'));
   console.log(m.get(key));

   //清空
   m.clear();

   //遍历
   for(let v of m){
       console.log(v);
   }
   console.log(m);
   ```



## class 类

1. 使用方式

   ```javascript
   //父类, 声明类使用class
   class Phone {
     //私有属性, 只能在类中使用   ?使用可以通过get set 访问
     #age;
     #weight;

     //构造方法, constructor定义构造函数初始化
     constructor(brand, color, price) {
       this.brand = brand;
       this.color = color;
       this.price = price;
     }

     get price() {
       console.log('价格属性被读取了');
       return 'iloveyou';
     }

     set price(newVal) {
       console.log('价格属性被修改了');
     }

     //对象方法
     call() {
       console.log('我可以打电话!!!');
     }
   }

   //子类, 使用extends进行继承
   class SmartPhone extends Phone {
     constructor(brand, color, price, screen, pixel) {
       //super 调用父级构造方法
       super(brand, color, price);
       this.screen = screen;
       this.pixel = pixel;
     }

     //子类方法
     photo() {
       console.log('我可以拍照!!');
     }

     playGame() {
       console.log('我可以玩游戏!!');
     }

     //方法重写, 父类方法可以重写
     call() {
       console.log('我可以进行视频通话!!');
     }

     //静态方法, 使用static定义静态方法或属性
     static run() {
       console.log('我可以运行程序');
     }

     static connect() {
       console.log('我可以建立连接');
     }
   }

   //实例化对象
   const Nokia = new Phone('诺基亚', '灰色', 230);
   const iPhone6s = new SmartPhone('苹果', '白色', 6088, '4.7inch', '500w');

   //调用get 属性
   console.log(Nokia.price);

   //调用set 属性
   Nokia.price = 'free';

   //调用子类方法
   iPhone6s.playGame();

   //调用重写方法
   iPhone6s.call();

   //调用静态方法
   SmartPhone.run();
   ```

2. 注意点

   - 类中的方法定义只能使用方法简写, 不能使用 function 的方式



## 数值扩展

1. 使用方式(将一些数值方法封装成了 Number 下面的静态数值方法)

   ```javascript
   //0. Number.EPSILON 是 JavaScript 表示的最小精度
   //EPSILON 属性的值接近于 2.2204460492503130808472633361816E-16
   function equal(a, b) {
     if (Math.abs(a - b) < Number.EPSILON) {
       return true;
     } else {
       return false;
     }
   }
   console.log(0.1 + 0.2 === 0.3);
   console.log(equal(0.1 + 0.2, 0.3));

   //1. 二进制和八进制
   let b = 0b1010;
   let o = 0o777;
   let d = 100; // 十进制
   let x = 0xff; // 十六进制
   console.log(x);

   //2. Number.isFinite  检测一个数值是否为有限数
   console.log(Number.isFinite(100));
   console.log(Number.isFinite(100 / 0));
   console.log(Number.isFinite(Infinity));

   //3. Number.isNaN 检测一个数值是否为 NaN
   console.log(Number.isNaN(123));

   //4. Number.parseInt Number.parseFloat字符串转整数
   console.log(Number.parseInt('5211314love'));
   console.log(Number.parseFloat('3.1415926神奇'));

   //5. Number.isInteger 判断一个数是否为整数
   console.log(Number.isInteger(5));
   console.log(Number.isInteger(2.5));

   //6. Math.trunc 将数字的小数部分抹掉
   console.log(Math.trunc(3.5));

   //7. Math.sign 判断一个数到底为正数 负数 还是零
   console.log(Math.sign(100));
   console.log(Math.sign(0));
   console.log(Math.sign(-20000));
   ```



## 对象扩展

1. 使用方式

   ```javascript
   //1. Object.is 判断两个值是否完全相等
   console.log(Object.is(120, 120)); // true
   console.log(Object.is(NaN, NaN)); // true
   console.log(NaN === NaN); // false

   //2. Object.assign 对象的合并
   const config1 = {
     host: 'localhost',
     port: 3306,
     test: 'test'
   };
   const config2 = {
     host: 'http://atguigu.com',
     port: 33060,
     test2: 'test2'
   };
   console.log(Object.assign(config1, config2));

   //3. Object.setPrototypeOf 设置原型对象  Object.getPrototypeof
   const school = {
     name: '尚硅谷'
   };
   const cities = {
     xiaoqu: ['北京', '上海', '深圳']
   };
   Object.setPrototypeOf(school, cities);
   console.log(Object.getPrototypeOf(school));
   console.log(school);

   //4. 获取对象所有的值
   //Object.values()方法返回一个给定对象的所有可枚举属性值的数组
   console.log(Object.values(config1));

   //5. Object.entries()方法返回一个给定对象自身可遍历属性 [key,value] 的数组
   //方便创建 Map
   console.log(Object.entries(config1));

   //6. 创建 Map
   const m = new Map(Object.entries(config1));
   console.log(m.get('host'));

   //7. 对象属性的描述对象
   console.log(Object.getOwnPropertyDescriptors(config1));

   // 8.Object.fromEntries, 把二维数组转为对象
   const m = new Map();
   m.set('name','ATGUIGU');
   const result = Object.fromEntries(m);
   ```



## 数组扩展

1. 使用方式

   ```javascript
   const mingzhu = ['西游记', '红楼梦', '三国演义', '水浒传'];

   // 1. includes 方法用来检测数组中是否包含某个元素，返回布尔类型值
   console.log(mingzhu.includes('西游记'));
   console.log(mingzhu.includes('金瓶梅'));

   // 2. ** 用来实现幂运算，功能与 Math.pow 结果相同
   console.log(2 ** 10);
   console.log(Math.pow(2, 10));

   //3. flat将多维数组转化为低位数组
   const arr = [1,2,3,4,[5,6,[7,8,9]]];
   //参数为深度 是一个数字
   console.log(arr.flat(2));

   //4. flatMap
   const arr = [1,2,3,4];
   const result = arr.flatMap(item => [item * 10]);
   console.log(result);
   ```



## 正则表达式扩展

1. 使用方式

   ```javascript
   // 1. 正则表达式命名捕获组
   let str = '<a href="http://www.atguigu.com">尚硅谷</a>';

   // 使用符号『?<name>』,这样获取捕获结果可读性更强
   const reg = /<a href="(?<url>.*)">(?<text>.*)<\/a>/;
   const result = reg.exec(str);
   console.log(result.groups.url);
   console.log(result.groups.text);

   /* ********************************************* */

   // 2. 断言
   let assertStr = 'JS5211314你知道么555啦啦啦';

   const reg1 = /\d+(?=啦)/; // 正向断言
   const result1 = reg1.exec(assertStr);
   console.log(result1);

   const reg2 = /(?<=么)\d+/; // 反向断言
   const result2 = reg2.exec(assertStr);
   console.log(result2);

   /* ********************************************* */

   //3. 正则表达式 dotAll 模式
   let dotAllStr = `
              <ul>
                  <li>
                      <a>肖生克的救赎</a>
                      <p>上映日期: 1994-09-10</p>
                  </li>
                  <li>
                      <a>阿甘正传</a>
                      <p>上映日期: 1994-07-06</p>
                  </li>
              </ul>
   		`;

   //正则表达式中点.匹配除回车外的任何单字符，
   //标记『s』改变这种行为，允许行终止符出现
   const reg3 = /<li>.*?<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/gs;

   //执行匹配
   let result;
   let data = [];
   while ((result = reg3.exec(dotAllStr))) {
     data.push({ title: result[1], time: result[2] });
   }
   console.log(data);

   //4. String.prototype.matchAll
   //返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器
   const result = dotAllStr.matchAll(reg3);
   for(let v of result){
       console.log(v);
   }
   ```



## 字符串扩展

1. 使用方式

   ```javascript
   let str = '   iloveyou   ';

   //1. trimStart 去掉字符串首部的空格
   console.log(str.trimStart());

   //2. trimStart 去掉字符串尾部的空格
   console.log(str.trimEnd());
   ```



## 可选链操作符

1. 使用方式

   ```javascript
   // ?. 可选链操作符
   function main(config){
       // const dbHost = config && config.db && config.db.host;
       const dbHost = config?.db?.host;
       console.log(dbHost);
   }
   main({
       db: {
           host:'192.168.1.100',
           username: 'root'
       },
       cache: {
           host: '192.168.1.200',
           username:'admin'
       }
   })
   ```



## BigInt

1. 使用方式

   ```javascript
   //大整形
   // let n = 521n;
   // console.log(n, typeof(n));

   //函数
   // let n = 123;
   // console.log(BigInt(n));
   // console.log(BigInt(1.2)); // 不能传入浮点数

   //大数值运算
   let max = Number.MAX_SAFE_INTEGER;
   console.log(max);
   console.log(max + 1);
   console.log(max + 2);
   console.log(BigInt(max))
   console.log(BigInt(max) + BigInt(1))
   console.log(BigInt(max) + BigInt(2))
   ```



## globalThis 对象

1. 使用方式

   ```javascript
   //globalThis 任何位置都是指向的全局对象
   console.log(globalThis);
   ```



