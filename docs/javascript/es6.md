# ES6

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
       function fn(){
           console.log(school);
       }
       fn();
   }
   ```



## const

1. 应用场景

   - 声明常量,  声明对象类型使用 const，非对象类型声明选择 let

2. 使用方式

   ``` javascript
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
   const TEAM = ['UZI','MXLG','Ming','Letme'];
   // TEAM.push('Meiko');
   ```

3. 注意点

   - 对象属性修改和数组元素变化不会触发 const 错误(因为const存的是对象地址)



## 解构赋值

1. 使用方式

   ```javascript
   //ES6 允许按照一定模式从数组和对象中提取值，对变量进行赋值，这被称为解构赋值。
   
   //1. 数组的结构
   const [xiao, liu, zhao, song] = ['小沈阳','刘能','赵四','宋小宝'];
   
   //2. 对象的解构
   const zhao = {
       name: '赵本山',
       age: '不详',
       xiaopin: function(){
           console.log("我可以演小品");
       }
   };
   let {name, age, xiaopin} = zhao;
   
   //复杂解构
   let wangfei = {
       name: '王菲',
       age: 18,
       songs: ['红豆', '流年', '暧昧', '传奇'],
       history: [
           {name: '窦唯'},
           {name: '李亚鹏'},
           {name: '谢霆锋'}
       ]
   };
   
   let {songs: [one, two, three], history: [first, second, third]} = wangfei;
   ```

2. 注意点

   - 频繁使用对象方法、数组元素，就可以使用解构赋值形式



## 模板字符串

1. 应用场景

   - 当遇到字符串与变量拼接的情况使用模板字符串(特别是需要换行的时候),  比如拼接html代码

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
       improve(){
           console.log("我们可以提高你的技能");
       }
   }
   ```

   

## 箭头函数

1. 应用场景

   - 回调函数中，例如事件处理器或者定时器等

2. 使用方式

   ```javascript
   //1. 箭头函数会默认帮我们绑定外层this的值，所以在箭头函数中this的值和外层的this是一样的
   window.name = '尚硅谷';
   const school = {
       name: "ATGUIGU"
   }
   function getName(){
       console.log(this.name);
   }
   let getName2 = () => {
       console.log(this.name);  
   }
   
   //2. 不能作为构造实例化对象
   let Person = (name, age) => {
       this.name = name;
       this.age = age;
   }
   let me = new Person('xiao',30);
   console.log(me);
   
   //3. 不能使用 arguments 变量
   let fn = () => {
       console.log(arguments);
   }
   fn(1, 2, 3);
   
   // 4.只有一个参数是()可以省略
   let add = n => {
       return n + n;
   }
   
   // 5. 函数体如果只有一条语句，则花括号可以省略，
   //    函数的返回值为该条语句的执行结果
   let pow = n => n * n;
   console.log(pow(8));
   ```



##  rest 参数

1. 应用场景

   - rest 参数非常适合不定个数参数函数的场景

2. 使用方式

   ```javascript
   // rest 参数必须要放到参数最后,  使用...符号
   function fn(a, b, ...args) {
       console.log(a);
       console.log(b);
       console.log(args);
   }
   fn(1, 2, 3, 4, 5, 6);
   ```

3. 注意点

   - `...`符号被赋值时为rest参数,  赋值时为扩展运算符



## 扩展运行符

1. 使用方式

   ```javascript
   // 展开数组
   let tfboys = ['德玛西亚之力','德玛西亚之翼','德玛西亚皇子'];
   function fn(){
    console.log(arguments);
   }
   fn(...tfboys)
   
   // 展开对象
   let skillOne = {
    q: '致命打击',
   };
   let skillTwo = {
    w: '勇气'
   };
   let gailun = {...skillOne, ...skillTwo};
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
   ```

   

