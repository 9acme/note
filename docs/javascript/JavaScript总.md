# this

## 调用位置

   ``每个函数的 this 是在调用时被绑定的，完全取决于函数的调用位置``  

## 绑定规则

  1. 默认绑定

     ```javascript
     // 独立函数调用应用的绑定规则为默认绑定
     function  foo() { 
     	console.log( this.a ); // this为 window
     } 
     
     var a = 2; 
     
     foo(); // 2
     ```

     - 注意点

       - 使用严格模式（strict mode），那么全局对象将无法使用默认绑定，因此 this 会绑定到 undefined

       

  2. 隐式绑定

     ```javascript
     //隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象。
     function foo() { 
         console.log( this.a ); 
     }
     
     var obj = { 
         a: 2, 
         foo: foo 
     };
     
     obj.foo(); // 2  调用时 foo函数的上下文对象为obj,  因此this指向obj
     ```

     - 注意点

       - 对象属性引用链中只有最后一层会影响调用位置。

         ```javascript
         function foo() { 
             console.log( this.a ); 
         }
         
         var obj2 = { 
             a: 42, 
             foo: foo 
         };
         
         var obj1 = { 
             a: 2, 
             obj2: obj2 
         };
         
         obj1.obj2.foo(); // 42   obj2为对象属性引用链中的最后一层, foo函数的this指向obj2
         ```

       - 隐式绑定的函数会丢失绑定对象,  从而把 this 绑定到全局对象或者 undefined 上,  取决于是否是严格模式。

         ```javascript
         function foo() { 
             console.log( this.a ); 
         }
         
         function doFoo(fn) { 
             // fn 其实引用的是 foo 
             fn(); // <-- 调用位置！ fn会应用默认规则, 从而把 this 绑定到全局对象或者 undefined 上
         }
         
         var obj = { 
             a: 2, 
             foo: foo 
         };
         
         var a = "oops, global"; // a 是全局对象的属性 
         
         doFoo( obj.foo ); // "oops, global"
         ```

         

  3. 显式绑定(通过使用bind, call, apply强行改变this指向)

     - 硬绑定(解决了丢失绑定问题)

       - 常见做法

         ```javascript
         // 创建一个包裹函数，传入所有的参数并返回接收到的所有值
         function foo(something) { 
             console.log( this.a, something );
         	return this.a + something; 
         }
         
         var obj = { 
             a:2 
         };
         
         var bar = function() {
             // foo函数this指向obj, arguments为参数3
             // foo在没强行改变this之前, 他的this指向window, 应用的是默认绑定
         	return foo.apply( obj, arguments ); 
         };
         
         var b = bar( 3 ); // 2 3 
         
         console.log( b ); // 5
         ```

       - 注意点

         - 硬绑定的函数不可能再修改它的 this

     - API调用的“上下文” (自己通过传入参数改变this)

       

  4. new绑定

     ```javascript
     //1.创建（或者说构造）一个全新的对象。 
     //2. 这个新对象会被执行 [[ 原型 ]] 连接。 
     //3. 这个新对象会绑定到函数调用的 this。  
     //4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。
     function foo(a) {
     	this.a = a; 
     }
     
     var bar = new foo(2); 
     
     console.log( bar.a ); // 2
     ```

     

## 优先级

   ``new绑定 > 显式绑定 > 隐式绑定> 默认绑定  `` 

## 绑定例外 

1. 被忽略的this

   ```javascript
   //如果你把 null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind，这些值 在调用时会被忽略，实际应用的是默认绑定规则：
   function foo() { 
       console.log( this.a ); 
   }
   
   var a = 2; 
   
   foo.call( null ); // 2
   ```

   - 常见做法

     - 使用 apply(..) 来“展开”一个数组

   - 注意点

     - 使用null传入call, apply或者bind可能会污染全局对象(window),  所以可以传入一个特殊的对象

       ```javascript
       function foo(a,b) { 
           console.log( "a:" + a + ", b:" + b ); 
       }
       
       // 我们的 DMZ 空对象 
       var ø = Object.create( null ); 
       
       
       // 把数组展开成参数 
       foo.apply( ø, [2, 3] );  // a:2, b:3 
       
       // 使用 bind(..) 进行柯里化
       var bar = foo.bind( ø, 2 ); 
       
       bar( 3 ); // a:2, b:3
       ```

     

2. 间接引用

   ```javascript
   //间接引用会应用默认绑定
   function foo() { 
       console.log( this.a ); 
   } 
   
   var a = 2;
   var o = { 
       a: 3, 
       foo: foo
   };
   var p = {
       a: 4 
   }; 
   
   o.foo(); // 3 
   
   //p.foo = o.foo 的返回值是目标函数的引用，
   //因此调用位置是 foo() 而不是 p.foo() 或者 o.foo()。
   (p.foo = o.foo)(); // 2   
   
   

## 箭头函数(this词法)

 1. 常见做法

    ```javascript
    // 箭头函数最常用于回调函数中，例如事件处理器或者定时器等
    function foo() { 
        setTimeout(() => { 
            // 这里的 this 在此法上继承自 foo() 
            console.log( this.a ); 
        },100); 
    }
    
    var obj = {
        a:2 
    };
    
    foo.call( obj ); // 2
    ```

    

2. 注意点

   ```javascript
   //箭头函数的绑定无法被修改（new也不行！）
   function foo() { 
       // 返回一个箭头函数
   	return (a) => { 
           //this 继承自 foo() 
           console.log( this.a ); 
       }; 
   }
   
   var obj1 = { 
       a:2 
   };
   var obj2 = { 
       a:3 
   };
   
   var bar = foo.call( obj1 );  //bar是箭头函数, foo返回的是函数
   
   bar.call( obj2 ); // 2, 不是 3 ！
   ```




# 对象





