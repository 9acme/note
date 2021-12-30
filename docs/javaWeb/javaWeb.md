# 1. JavaWeb概念

## 1.1 什么是JavaWeb

*   JavaWeb是指，所有通过java语言编写可以通过浏览器访问的程序的总称，叫JavaWeb。
*   JavaWeb基于请求和响应来开发

## 1.2 请求和响应

*   请求：客户端给服务器发送数据，叫请求Request
*   相应：服务器给客户端回传数据，叫响应Response
*   请求和响应是成对出现的，有请求就有响应

![](https://img-blog.csdnimg.cn/20210409133841952.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

# 2. Web资源的分类 √

web资源按实现的技术和呈现的效果不同，又分为静态资源和动态资源

*   静态资源：html、css、js、txt、MP4、jpg
*   动态资源：jsp页面、Servlet程序

# 3. 常用的Web服务器 √

*   Tomcat：Apache组织提供的轻量级的、当前应用最广的Web服务器
*   Jboss：是一个遵从JavaEE规范的、开放源代码的、纯Java的EJB服务器，它支持所有的JavaEE规范（免费〉。
*   GlassFish：由Oracle公司开发的一款JavaWeb服务器，是一款强健的商业服务器，达到产品级质量（应用很少）。
*   Resin：是CAUCHO公司的产品，是一个非常流行的服务器，对servlet和」SP提供了良好的支持，性能也比较优良，resin自身采用JAVA语言开发（收费，应用比较多）。
*   WebLogic：是Oracle公司的产品，是目前应用最广泛的 Web服务器，支持JavaEE规范，而且不断的完善以适应新的开发要求，适合大型项目（收费，用的不多，适合大公司）。

# 4. Tomcat √

## 4.1 Tomcat服务器和Servlet版本

当前企业常用的版本：7.\*/8.

![](https://img-blog.csdnimg.cn/20210409133930874.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)


## 4.2. Tomcat目录

*   bin：专门存放Tomcat服务器的可执行程序
*   conf：专门存放Tomcat服务器的配置文件
*   lib：专门存放Tomcat服务器的jar包
*   logs：专门存放Tomcat服务器的运行时输出的日志信息
*   temp：专门存放Tomcat运行时产生的临时数据
*   webapps：专门存放部署的web工程
*   work：Tomcat工作时的目录，存放Tomcat运行时jsp翻译为Servlet的源码，和Session钝化的目录

![](https://img-blog.csdnimg.cn/20210409133945187.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

## 4.3 修改Tomcat端口号

![](https://img-blog.csdnimg.cn/20210409134001206.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

平时上百度：http：//www.baidu.com：80

Http协议默认的端口号是：80

## 4.4 部署Web工程到Tomcat

*   方式一：将Web工程目录拷贝到Tomcat的Webapps目录下即可

    ![](https://img-blog.csdnimg.cn/20210409134018317.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)


访问：http://localhost:8080/kuangstudy

*   方式二：找到Tomcat下的==\\Catalina\\localhost==，创建如下的配置文件

    ![](https://img-blog.csdnimg.cn/20210409134026694.png)

    ![](https://img-blog.csdnimg.cn/20210409134034355.png)

    ![](https://img-blog.csdnimg.cn/20210409134047558.png)


访问：http://localhost:8080/aaa





## 4.5 手动拖动html页面和输入地址访问的不同

*   手动拖动html页面到浏览器，这个时候浏览器中的地址如下：

    ![](https://img-blog.csdnimg.cn/20210409134102731.png)

    他使用的是File：//协议，file协议表示告诉浏览器 我们直接读取file：协议后面的路径，解析展示在浏览器上即可

*   在地址栏中输入地址访问：http：//ip:port/工程名/资源名

    ![](https://img-blog.csdnimg.cn/20210409134119640.png)

    所使用的协议是Http协议，背后的原因完全不同

    ![](https://img-blog.csdnimg.cn/20210409134128483.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)






## 4.6 默认访问工程和默认访问资源

当我们在浏览器地址栏中输入访问地址如下：http://ip:port/ ------> 没有工程名的时候，默认访问的是root工程

当我们在浏览器地址栏中输入访问地址如下：[http://ip:port/工程名](http://ip:port/%E5%B7%A5%E7%A8%8B%E5%90%8D) ------> 没有资源名的时候，默认访问的是index.html页面

![](https://img-blog.csdnimg.cn/20210409134147898.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)





## 4.7 Web工程的创建

![](https://img-blog.csdnimg.cn/20210409134157890.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)





## 4.8 Web工程目录介绍

![](https://img-blog.csdnimg.cn/20210409134225596.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)





## 4.9 给Tomcat添加第三方jar包

![](https://img-blog.csdnimg.cn/20210409134244621.png)

![](https://img-blog.csdnimg.cn/20210409134252891.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/20210409134300577.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)





## 4.10 Idea部署Tomcat工程

![](https://img-blog.csdnimg.cn/20210409134315319.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/20210409134323560.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)





## 4.11 Tomcat热部署

![](https://img-blog.csdnimg.cn/20210409134338130.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)





# 5. Servlet √

## 5.1 Servlet概述

*   Servlet是JavaEE规范之一，规范就是接口
*   Servlet就是JavaWeb三大组件之一，三大组件：Servlet程序、Filter过滤器、Listener监听器
*   Servlet是运行在服务器上的一个java小程序，**它可以接收客户端发送过来的请求，并相应数据给客户端**





## 5.2 第一个Servlet程序

*   编写一个类去实现Servlet接口

*   实现Service方法，处理请求，并响应数据

*   到web.xml中去配置servlet程序的访问地址

*   service方法是专门用来处理请求和响应的

    ```java
    package com.atguigu.servlet;

    import javax.servlet.*;
    import java.io.IOException;

    public class HelloServlet implements Servlet {
        @Override
        public void init(ServletConfig servletConfig) throws ServletException {

        }

        @Override
        public ServletConfig getServletConfig() {
            return null;
        }

        @Override
        public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
            System.out.println("Hello Servlet 被访问了");
        }

        @Override
        public String getServletInfo() {
            return null;
        }

        @Override
        public void destroy() {

        }
    }

    ```

*   web.xml实现配置

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
             version="4.0">
    <!--servlet标签给Tomcat配置Servlet程序-->
        <servlet>
            <!--给servlet程序起一个别名（一般是类名）-->
            <servlet-name>HelloServlet</servlet-name>
            <servlet-class>com.atguigu.servlet.HelloServlet</servlet-class>
        </servlet>
    <!--servlet-mapping标签给Servlet程序配置访问地址-->
        <servlet-mapping>
            <!--告诉服务器，我当前配置的地址给哪个Servlet使用-->
            <servlet-name>HelloServlet</servlet-name>
            <!--配置访问地址-->
            <!--
                /：        表示地址为：http://ip:port/工程路径
                /hello：   表示地址为：hello://ip:port/工程路径/hello
            -->
            <url-pattern>/hello</url-pattern>
        </servlet-mapping>
    </web-app>
    ```






## 5.3 Servlet程序启动原理

![](https://img-blog.csdnimg.cn/20210409134401301.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)





## 5.4 Servlet生命周期

*   执行Servlet构造器方法：第一次访问创建Servlet程序的时候会调用

*   执行init初始化方法：第一次访问创建Servlet程序的时候会调用

*   执行service方法：每次访问都会调用

*   执行destroy销毁方法：在Web工程停止的时候调用


![](https://img-blog.csdnimg.cn/20210409134414178.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)





## 5.5 请求的分发处理

问题：在客户端对服务器发送的请求有两种类型，一种是get，一种是post，对两种请求的处理方式肯定是不同的，如何分别处理两种不同的请求呢？

*   判断请求的方式：ServletRequest的子类HttpServletRequest的方法==getMethod（）==方法即可判断

*   对不同的请求进行处理：处理的过程中进行分别处理

    ```java
    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("3--------------service方法");

        //类型转换(因为他有getMethod（）方法)
        HttpServletRequest httpServletRequest=(HttpServletRequest) servletRequest;
        String method = httpServletRequest.getMethod();
        System.out.println(method);
        if("GET".equals(method)){
            doGet();

        }else if("POST".equals(method)){
           doPost();
        }
    }

    public void doGet(){
        System.out.println("Get请求");
        System.out.println("Get请求");
    }

    public void doPost(){
        System.out.println("Post请求");
        System.out.println("Post请求");
    }
    ```






## 5.6 通过实现HttpServlet接口

一般在实际项目开发过程中，都是使用继承HttpServlet方式去实现Servlet程序

*   编写一个类去继承HttpServlet类
*   根据业务需要重写doGet（）和doPost（）方法
*   到web.xml中的配置Servlet程序的访问地址

```java
package com.atguigu.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class HelloServlet2  extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Hello Servlet2的doGet方法");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Hello Servlet2的doPost方法");

    }
}
```





## 5.7 使用Idea创建Servlet程序

![](https://img-blog.csdnimg.cn/20210409134437256.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/20210409134445244.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)





## 5.8 Servlet类的继承体系

![](https://img-blog.csdnimg.cn/20210409134459960.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)





## 5.9 ServletConfig类

ServletConfig类就是Servlet程序的配置信息类

*   ServletConfig类的三大作用

    *   可以获取Servlet程序的别名Servlet-name的值

    *   获取初始化参数init-param

        ```xml
        <servlet>
                <!--给servlet程序起一个别名（一般是类名）-->
                <servlet-name>HelloServlet</servlet-name>
                <!--全类名-->
                <servlet-class>com.atguigu.servlet.HelloServlet</servlet-class>
                <!--初始化参数-->
                <init-param>
                    <!--参数名-->
                    <param-name>username</param-name>
                    <!--参数值-->
                    <param-value>root</param-value>
                </init-param>
        </servlet>
        ```

    *   获取ServletContext对象


    ```java
    //可以获取Servlet程序的别名Servlet-name的值
    System.out.println("HelloServlet程序的别名是："+servletConfig.getServletName());

    //获取初始化参数init-param
    System.out.println("初始化参数username的值是："+servletConfig.getInitParameter("username"));

    //获取servletContext对象
    System.out.println("servletContext对象是："+servletConfig.getServletContext());
    ```






## 5.10 ServletContext类

*   什么是ServletContext？

    *   ServletContext是一个接口，表示Servlet上下文对象
    *   一个Web工程只有一个ServletContext对象实例
    *   ServletContext对象是一个域对象
    *   ServletContext对象是在Web工程部署启动的时候创建，是在Web工程停止的时候销毁（不同的Servlet程序只要在一个工程内可以获取对象创建的值）
*   什么是域对象

    *   域对象，是可以像Map一样存取数据的对象

    *   这里的域指的是存取数据的操作范围，即整个Web工程

        存数据取数据删除数据Mapput（）get（）remove（）域对象setAttribute（）getAttribute（）removeAttribute（）
*   ServletContext类的作用

    *   获取Web.xml中配置的上下文参数

        ```java
        //                1.获取Web.xml中配置的上下文参数
                ServletContext context = getServletConfig().getServletContext();
                String username = context.getInitParameter("username");
                System.out.println("context-param参数username的值是："+username);
        ```

        ```xml
        <!--context-param是上下文参数  只能由context对象调用-->
        <context-param>
            <param-name>username</param-name>
            <param-value>context</param-value>
        </context-param>
        ```

    *   获取当前的工程路径，格式：/工程路径

        ```java
        //                2.获取当前的工程路径，格式：/工程路径
                System.out.println("当前工程路径"+context.getContextPath());
        ```

    *   获取工程部署后在服务器磁盘上的绝对路径

        ```java
        //                3.获取工程部署后在服务器磁盘上的绝对路径
        //         / 斜杠 表示被服务器解析地址为：http://ip:port/工程名/   映射到IDEA代码的Web目录
                System.out.println("工程部署的路径是："+context.getRealPath("/"));
                System.out.println("工程下css目录的路径是："+context.getRealPath("/css"));
        ```

    *   像Map一样存取数据

        ```java
        /获取ServletContext对象
        ServletContext context = getServletContext();

        context.setAttribute("key1","value1");
        System.out.println("context1中获取域数据key1的值是："+context.getAttribute("key1"));
        ```






## 5.11 Http协议

*   什么是Http协议：

    所谓的Http协议，就是指，客户端和服务器之间通信时，发送的数据需要遵守的规则，叫Http协议

    HTTP协议中的数据又叫报文

*   请求的Http协议格式

    请求又分为Get请求和Post请求两种

*   Get请求

    *   请求行

        *   请求方式 GET
        *   请求的资源路径【+？+请求参数】
        *   请求的协议的版本号 HTTP/1.1
    *   请求头

        *   key：value 不同的键值对表示不同的含义

    ![](https://img-blog.csdnimg.cn/20210409134544229.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

*   Post请求

    *   请求行

        *   请求方式 POST
        *   请求的资源路径【+？+请求参数】
        *   请求的协议的版本号 HTTP/1.1
    *   请求头

        *   key：value 不同的键值对表示不同的含义

            **空行**

    *   请求体 ------------>发送给服务器的数据


    ![](https://img-blog.csdnimg.cn/20210409134554602.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

*   常用请求头

    *   Accept：客户端可以接受的类型
    *   Accept-Language：客户端可以接受的语言类型
    *   User-Agent：客户端浏览器的信息
    *   Host：请求时的服务器ip和端口号
*   哪些是Get请求，哪些是Post请求

    *   Get请求
        *   form标签 method=get
        *   a标签
        *   link标签引入css
        *   scrpit标签引入js文件
        *   img标签引入图片
        *   iframe引入html页面
        *   浏览器地址栏中输入地址后敲回车
    *   Post请求
        *   form标签 method=post
*   相应的Http协议格式

    *   相应行

        *   相应的协议和版本号
        *   响应状态码
        *   响应状态描述符
    *   响应头

        *   key：value 不同的响应头对表示不同的含义

            **空行**

    *   响应体---------> 就是回传给客户端的数据


    ![](https://img-blog.csdnimg.cn/20210409134610268.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

*   常用的响应码

    *   200 表示请求成功
    *   302 表示请求重定向
    *   404 表示请求收到了，但是你要的数据不存在
    *   500 表示服务器已经收到请求，但是服务器内部错误（代码）
*   MIME数据类型

    ![](https://img-blog.csdnimg.cn/20210409134620250.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)






## 5.12 HttpServletRequest类

*   作用：
    *   每次只要有请求进入Tomcat服务器，Tomcat服务器就会把请求过来的Http协议信息解析好封装到Request对象中，然后传递到service方法（doGet、doPost）中给我们使用，我们可以通过HttpServletRequest对象获取到所有请求的信息





## 5.13 HttpServletRequest常用API

![](https://img-blog.csdnimg.cn/20210409134708906.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

```java
//1.获取请求的资源路径
System.out.println("URI======>"+req.getRequestURI());

//2.获取请求的统一资源定位符
System.out.println("URL======>"+req.getRequestURL());

//3.获取客户端的ip地址
System.out.println("客户端的ip地址为："+req.getRemoteHost());

//4.获取请求头
System.out.println("请求头User-Agent为："+req.getHeader("User-Agent"));

//5.获取请求的方式
System.out.println("请求方式为："+req.getMethod());
```

![](https://img-blog.csdnimg.cn/20210409134718886.png)





## 5.14 获取请求的参数值

```java
//获取请求的参数
String username = req.getParameter("username");
String password = req.getParameter("password");
String[] hobby = req.getParameterValues("hobby");   //多个hobby 用这个方法

System.out.println("用户名"+username);
System.out.println("密码"+password);
System.out.println("爱好"+ Arrays.asList(hobby));
```

```html
<form action="http://localhost:8080/02_ServletRequest/parameterservlet" method="get">
    用户名: <input type="text" name="username"> <br/>
    密码: <input type="password" name="password"> <br/>
    兴趣爱好: <input type="checkbox" name="hobby" value="cpp"> C++
    <input type="checkbox" name="hobby" value="java">Java
    <input type="checkbox" name="hobby" value="js">JavaScript<br/>
    <input type="submit">
</form>
```





## 5.15 解决Post请求获取参数乱码

```java
//设置请求体的字符集为UTF-8，从而解决Post请求中文乱码问题
//此API需要在获取请求参数之前调用才有用！！！！！！！！！
req.setCharacterEncoding("utf-8");
//获取请求的参数
String username = req.getParameter("username");
String password = req.getParameter("password");
String[] hobby = req.getParameterValues("hobby");   //多个hobby 用这个方法
```

![](https://img-blog.csdnimg.cn/20210409134735689.png)





## 5.16 请求的转发

*   请求转发是指服务器收到请求后，从一个资源跳到另一个资源的操作叫请求转发

    ![](https://img-blog.csdnimg.cn/20210409134755645.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

*   请求转发的特点：

    *   浏览器地址栏没有变化
    *   他们是一次请求
    *   他们是共享Request域中的数据（域数据）
    *   可以转发到WEB-INF目录下（若页面在WEB-INF目录下，使用浏览器访问不了，只能使用转发方式进入）
    *   不可以访问工程以外的资源，无法出站

```java
package com.aiguigu.servlet;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class Servlet1 extends HttpServlet {

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //获取请求的参数（办事的材料）
        String username = req.getParameter("username");
        System.out.println("在Servlet1(柜台)中查看参数（材料）"+username);

        //给材料盖一个章。并传递到Servlet2（柜台2）去查看
        req.setAttribute("key","柜台1的章");

        //问路Servlet2（柜台2）怎么走
        //请求转发必须要以 斜杠‘/' 开始，斜杠表示：http://ip:port/工程名/  映射到web目录
        RequestDispatcher requestDispatcher = req.getRequestDispatcher("/servlet2");

        //走向Servlet2（柜台2）
        requestDispatcher.forward(req,resp);
    }
}
```

```java
package com.aiguigu.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class Servlet2 extends HttpServlet {

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //获取请求的参数（办事的材料）
        String username = req.getParameter("username");
        System.out.println("在Servlet2(柜台)中查看参数（材料）"+username);

        //查看柜台1是否有盖章
        Object key1 = req.getAttribute("key");
        System.out.println("柜台1是否有章："+key1);

        //处理自己的业务
        System.out.println("Servlet2处理自己的业务");

    }
}
```





## 5.17 请求转发中的base标签

问题：在首页通过标签和网页c进行来回跳转成功，但是使用请求转发跳转进c后，却跳转不回首页？

![](https://img-blog.csdnimg.cn/20210409134833946.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

作用：

*   设置页面相对路径工作时参照的地址来进行跳转
*   href属性就是参照的地址值

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>首页</title>
</head>
<body>
    这是web下的index.html<br/>
    <a href="a/b/c.html">a/b/c.html</a>
    <a href="http://localhost:8080/02_ServletRequest/forwardc">请求转发</a>
</body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <base href="http://localhost:8080/02_ServletRequest/a/b/c.html">
</head>
<body>
  这是a下的b下的c.html页面
<a href="../../index.html">跳回首页</a>

</body>
</html>
```

```java
package com.aiguigu.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ForwardC extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("经过了ForwardC程序");
        req.getRequestDispatcher("/a/b/c.html").forward(req,resp);
    }
}
```





## 5.18 相对路径和绝对路径

在JavaWeb中，路径分为相对路径和绝对路径：

*   相对路径：
    *   . 表示当前目录
    *   … 表示上一级目录
    *   资源名 表示当前目录/资源名
*   绝对路径：
    *   [http://ip:port/工程路径/资源名](http://ip:port/%E5%B7%A5%E7%A8%8B%E8%B7%AF%E5%BE%84/%E8%B5%84%E6%BA%90%E5%90%8D)





## 5.19 /斜杠的不同意义

在Web中 /斜杠是一种绝对路径

*   / 斜杠如果被浏览器解析，得到的地址是：http://ip:port/

    *   ```html
        <a href="/">/</a>
        ```

*   / 斜杠如果被服务器解析，得到的地址是：[http://ip:port/工程路径](http://ip:port/%E5%B7%A5%E7%A8%8B%E8%B7%AF%E5%BE%84)

    *   ```xml
        <url-pattern>/servlet1</url-pattern>
        ```

    *   ```java
        servletContext.getRealPath("/");
        ```

    *   ```java
        request.getRequestDispatcher("/");
        ```

*   特殊情况：response.sendRediect("/") 把斜杠发送给浏览器解析，得到http://ip:port/






## 5.20 HttpServletResponse类

*   作用：

    *   HttpServletResponse类和HttpServletRequest类一样，每次请求进来，Tomcat服务器都会创建一个response对象传递给Servlet程序去使用，HttpServletRequest表示请求过来的信息，HttpServletResponse表示所有相应的信息
    *   我们如果需要设置返回给客户端的信息，都可以通过HttpServletResponse对象来进行设置
*   两个输出流的说明

    字节流getOutputStream（）常用于下载（传递二进制数据）字符流getWriter（）常用于回传字符串
    *   两个流只能使用一个，使用了字节流就不能再使用字符流，反之亦然，否则就会报错

        ![](https://img-blog.csdnimg.cn/20210409134908107.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

*   如何往客户端回传数据

    *   ```java
        protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
            PrintWriter writer = resp.getWriter();
            writer.write("ranhaifeng NB");
        ```






## 5.21 相应的乱码解决

*   方式一：

    ```java
    //设置服务器字符集为utf-8
    resp.setCharacterEncoding("utf-8");

    //通过响应头，设置浏览器也使用utf-8
    resp.setHeader("Content-Type","text/html;charset=utf-8");

    PrintWriter writer = resp.getWriter();
    //默认的是ISO-8859-1
    writer.write("詹姆斯牛逼！！！");
    ```

*   方式二（推荐）：

    ```java
    /他会同时设置服务器和客户端都使用utf-8字符集，同时设置了响应头
    //此方法一定要在获取流对象之前调用才有效
    resp.setContentType("text/html;charset=utf-8");
    PrintWriter writer = resp.getWriter();
    //默认的是ISO-8859-1
    writer.write("詹姆斯牛逼！！！");
    ```






## 5.22 请求重定向

请求重定向，是指客户端向服务器发请求，然后服务器告诉客户端说，我给你一些地址，你去新地址访问，叫请求重定向（因为之前的地址可能已经废弃）

![](https://img-blog.csdnimg.cn/20210409134937695.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

*   请求重定向的特点：

    *   浏览器地址栏会发生改变
    *   两次请求
    *   不共享Request域中的数据
    *   不能访问WEB-INF下的资源
    *   可以访问工程外的资源，比如百度
*   方式一：

    ```java
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("曾到此一游 Response1");

        //设置响应状态吗  302表示重定向（已搬迁）
        resp.setStatus(302);
        //响应头，说明新的地址在哪里
        resp.setHeader("Location","http://www.baidu.com");
    }
    ```

*   方式二（推荐）：

    ```java
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("曾到此一游 Response1");

       //状态码默认为302
       resp.sendRedirect("http://www.baidu.com");
    }
    ```






# 6. JSP √

## 6.1 JSP概述

*   jsp的全称是 java serve page，java的服务器页面
*   jsp的主要作用是代替Servlet程序回传html的数据
*   因为Servlet程序回传hutml页面数据是一件非常繁琐的事情，开发成本和维护成本都极高

```java
<%--
  Created by IntelliJ IDEA.
  User: Lenovo
  Date: 2020/10/5
  Time: 9:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    这是html页面数据
</body>
</html>
```





## 6.2 jsp页面的本质

*   jsp页面本质上是一个Servlet程序

*   当我们第一次访问jsp页面的时候，Tomcat会帮我们帮jsp页面翻译成一个java源文件，并且把他进行编译为.class字节码程序，我们打开java源文件不难发现其里面的内容是：

    ![](https://img-blog.csdnimg.cn/20210409135007249.png)

    ![](https://img-blog.csdnimg.cn/20210409135013433.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

    ​

    ​ 跟踪源代码发现，HttpJspBase类直接继承了HttpServlet类，也就是说，Jsp翻译出来的类，间接继承了HttpServlet类，即翻译出来的是一个Servlet程序，并且在底层实现，也是通过输出流，将html页面数据回传给客户端

    ![](https://img-blog.csdnimg.cn/20210409135024277.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

*   总结：通过翻译的java源代码我们可以得知：jsp就是Servlet程序






## 6.3 jsp头部的page指令

jsp 的page指令可以修改jsp页面中的一些重要的属性或行为

```java
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
```

*   language属性：表示jsp翻译后是什么语言文件，暂时只支持java
*   contentType属性：表示jsp返回的数据类型是什么，也是源码中response.setContentType（）参数值
*   oageEncoding属性：表示当前jsp页面本身的字符集
*   import属性：跟java源代码中一样，用于导包导类

以下两个属性是给out输出流使用：

*   autoFlush属性：设置当out输出流缓冲区满了之后，是否自动刷新缓冲区，默认值是true

*   buffer属性：设置out缓冲区大小，默认是8kb

    ![](https://img-blog.csdnimg.cn/20210409135042750.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

*   errorPage属性：设置当jsp页面运行出错时，自动跳转去的错误页面路径

*   isErrorPage属性：设置当前jsp页面是否是错误信息页面，默认是false，如果是true，可以获取异常信息

*   session属性：设置访问当前jsp页面是否会创建Httpsession对象，默认为true

*   extends属性：设置jsp翻译出来的java类默认继承谁






## 6.4 jsp中的常用脚本

*   声明脚本（很少使用）

    ```java
    <%!声明java代码    %>
    ```

    作用：可以给jsp翻译出来的java类定义属性和方法甚至是静态代码块、内部类等

    ```java
    <%--1.声明类属性--%>
    <%!
        private Integer id;
        private String name;
        private static Map<String,Object> map;
    %>

    <%--2.声明static静态代码块--%>
    <%!
        static{
            map=new HashMap<String,Object>();
            map.put("key1","value1");
        }
    %>

    <%--3.声明类的方法--%>
    <%!
        public int abc(){
            return 12;
        }
    %>

    <%--4.声明内部类--%>
    <%!
        public static class A{
            private Integer id=12;
            private String abc;
        }
    %>
    ```

*   表达式脚本（常用）

    ```java
    <%=表达式%>
    ```

    *   作用：在jsp页面上输出数据
    *   特点：
        *   所有的表达式脚本都会被翻译到\_jspService（）方法中
        *   表达式脚本都会被翻译成为out.print()输出到页面上
        *   由于表达式脚本翻译的内容都在\_jspService（）方法中，所以\_ jspService（）中的所有对象（request、reponse）都可以使用
        *   表达式脚本中的表达式不能以分号结束

    ```java
    <%--1.输出整型--%>
    <%=12%>
    <%--2.输出浮点型--%>
    <%=12.12%>
    <%--3.输出字符串--%>
    <%="我是字符串"%>
    <%--4.输出对象--%>
    <%=map%>
    ```

*   代码脚本

    ```java
    <%
    	java语句
    %>
    ```

    *   作用：可以在jsp页面中，编写我们自己需要的功能（写的是java语句）
    *   特点：
        *   代码脚本翻译之后都在\_jspService（）方法中
        *   代码脚本由于翻译到\_\_jspService（）方法中，所以在\_jspService（）方法中的先有对象都可以直接使用
        *   还可以由多个代码脚本块组合完成一个完整的java语句
        *   代码脚本还可以和表达式脚本一起组合使用，在jsp上输出使用数据

    ```java
    <%--if语句--%>

    <%
        int i=12;
        if(i==12){
            System.out.println("海锋好帅");
    }else {
            System.out.println("海锋又骗人了");
        }
    %>

    <%--for循环--%>
    <%
        for (int j = 0; j <4 ; j++) {
            System.out.println(j);
        }
    %>

    <%--翻译后java文件中_jspService方法内的代码都可以写--%>
    <%
        String username = request.getParameter("username");
        System.out.println("用户名的请求参数是："+username);
    %>
    ```






## 6.5 jsp中的三中注释

*   html注释

    ```java
    <!--这是html注释-->
    ```

    html注释会被翻译到java源代码中，在\_jspService（）方法中，以out.writer输出到客户端

*   java注释

    ```java
    <%
    // 单行注释 //
    /* 多行注释 */
    %>
    ```

    java注释会被翻译到java源代码中

*   jsp注释

    ```java
    <%-- 这是jsp注释 --%>
    ```

    jsp注释可以注释掉jsp页面中所有代码






## 6.6 jsp九大内置对象

jsp中的内置对象，是指Tomcat在翻译jsp页面成为Servlet源代码后，内部提供的九大对象，称为内部对象

request请求对象response向印度香pageContextjsp的上下文对象session会话对象applicationServletContext对象configServletConfig对象outjsp输出流对象page指向当前jsp的对象exception（需要开启isErrorPage）异常对象





## 6.7 jsp四大域对象

四个域对象分别是：

*   域对象存取范围pageContext（PageContextImpl类）当前jsp页面范围内有效request（HttpServletRequest类）一次请求内有效session（HttpSession类）一个会话范围内有效（打开浏览器访问服务器，直到关闭服务器）application（ServletContext类）整个Web工程范围内都有效（只要Web工程不停止，数据都在）
*   域对象是可以像Map一样存取数据的对象，四个域对象功能一样，不同的是他们对数据的存取范围

*   虽然四个域对象都可以存取数据，在使用上他们是有优先顺序的，优先顺序分别是：他们从小到大的存取范围（基于对内存的优化），即：

    pageContext -------------> request ------------> session -----------------> application


scope.jsp：

```java
<body>
    <h1>scope.jsp页面</h1>
    <%
        //往四个域中都保持了数据
        pageContext.setAttribute("key","pageContext");
        request.setAttribute("key","pageContext");
        session.setAttribute("key","pageContext");
        application.setAttribute("key","pageContext");
    %>
    pageContext域中是否有值：<%=pageContext.getAttribute("key")%>
    request：<%=request.getAttribute("key")%>
    session：<%=session.getAttribute("key")%>
    application：<%=application.getAttribute("key")%>

    <%
        request.getRequestDispatcher("/scope2.jsp").forward(request,response);
    %>
</body>
```

scope2.jsp：

```java
<body>
pageContext域中是否有值：<%=pageContext.getAttribute("key")%>
request：<%=request.getAttribute("key")%>
session：<%=session.getAttribute("key")%>
application：<%=application.getAttribute("key")%>
</body>
```





## 6.8 out输出和response.writer输出

![](https://img-blog.csdnimg.cn/20210409135114366.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

​ 由于jsp翻译之后，底层源代码都是使用out来进行输出，所以一般情况下我们在jsp页面中统一使用out来进行输出，避免打乱页面输出内容的顺序

*   out.writer（）：输出字符串没有问题，且只适合输出字符串
    *   在源码中，如果输出的是整型，它会转化为char型，因此不能输出整型
*   out.print（）：输出任意数据都没有问题（都转换为字符串后调用的writer（）输出）

结论：在jsp页面中，可以统一使用==out.print（）==来进行输出





## 6.9 jsp常用标签

*   静态包含（推荐）

    *   静态包含的特点：
        *   静态包含不会翻译被包含的jsp页面
        *   静态包含其实是把被包含的jsp页面代码拷贝到包含的位置执行输出

    main.jsp

    ```java
    <body>
        <%--
        <%@ include file=""%>  就是静态包含
        file属性指定你要包含的jsp页面的路径
        地址中第一个斜杠表示为htttp：//ip:port/工程路径/ 映射到代码的Web目录
        --%>

        头部信息
        主题内容
        <%@ include file="/include/foot.jsp"%>
    </body>
    </html>
    ```

    foot.jsp：

    ```java
    <body>
        页脚信息
    </body>
    ```


​

*   动态包含

*   特点：

    *   动态包含会把被包含的jsp页面也翻译成为java代码
    *   动态包含底层代码使用JspRuntimeLibrary.include（request，response，“/include/foot/jsp”，out，false）去调用被包含的jsp页面执行输出
    *   动态包含，还可以传递参数

    main.jsp

    ```java
    <body>

        <%--
        <jsp:include page=""/>  这是动态包含
        page属性是指定你要包含的jsp页面的路径
        动态包含也可以像静态包含一样，将被包含内容执行输出到包含位置


        --%>

        头部信息
        主题内容
        <jsp:include page="foot.jsp">
            <jsp:param name="username" value="ran"/>
        </jsp:include>



    </body>
    ```

    foot.jsp

    ```java
    页脚信息
    <%=request.getParameter("username")%>
    ```


![](https://img-blog.csdnimg.cn/2021040913513895.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

*   请求转发

    ```java
    <%--  <jsp:forward page=""></jsp:forward> 是请求转发标签，它的功能就是请求转发--%>
        <jsp:forward page="scope2.jsp"></jsp:forward>
    ```






# 7. Listener监听器 √

## 7.1 什么是Listener监听器

*   Listener监听器是JavaWeb三大组件之一，三大组件分别是：Servlet程序、Filter过滤器、Listener监听器
*   Listener它是javaEE的规范，就是接口
*   监听器的作用就是监听某种事物的变化通过回调函数反馈给客户（程序）去做一些相应的处理





## 7.2 ServletContextListener

*   ServletContextListener可以监听ServletContext对象的创建和销毁

*   ServletContext对象在Web工程启动的时候创建，在Web工程停止的时候销毁

*   监听到创建和销毁之后会分别调用ServletContextListener监听器的方法反馈

*   两个方法分别是：

    ```java
    //在ServketContext对象创建之后马上调用，做初始化
    default void contextInitialized(ServletContextEvent sce) {
    }

    //在ServletContext对象销毁之后调用
    default void contextDestroyed(ServletContextEvent sce) {
    }
    ```

*   使用步骤如下：

    *   编写一个类去实现ServletContextListener接口

        ![](https://img-blog.csdnimg.cn/20210409135204148.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

    *   实现其两个回调方法

        ```java
        public class MyServletContextListener implements ServletContextListener {
            @Override
            public void contextInitialized(ServletContextEvent sce) {
                System.out.println("ServletContex对象被初始化了");
            }

            @Override
            public void contextDestroyed(ServletContextEvent sce) {
                System.out.println("ServletContex对象被销毁了");

            }
        }
        ```

    *   到Web.xml中去配置监听器

        ```xml
        <listener>
            <listener-class>com.atguigu.Listener.MyServletContextListener</listener-class>
        </listener>
        ```






# 8. EL表达式 √

## 8.1 EL表达式的概述

*   EL表达式的全称是：Expression language，表达式语言
*   作用：替代jsp页面中的表达式脚本在jsp页面中进行数据的输出（因为比表达式脚本简洁很多）
*   EL表达式输出的格式是：${key1}
*   EL表达式在输出null值的时候，输出的是空串，jsp表达式脚本输出null值的时候，输出的是null字符串

```java
<body>
<%
    request.setAttribute("key","value1");
%>
    表达式脚本输出：<%=request.getAttribute("key1")==null?"":request.getAttribute("key")%>
    EL表达式输出：${key1}

</body>
```





## 8.2 EL表达式搜索域数据的顺序

EL表达式在jsp页面中输出数据，输出的数据主要是域对象中的数据

*   当四个域中都有相同key的数据的时候，EL表达式会按照四个域的从小到大的数据去进行搜索，找到就输出

    ```java
    <%
        //四个域中都保存了相同域的数据
        pageContext.setAttribute("key","value1");
        request.setAttribute("key","value2");
        session.setAttribute("key","value3");
        application.setAttribute("key","value4");
    %>
    ${key}
    ```






## 8.3 EL表达式输出复杂Bean对象

*   在EL表达式中，输出对象的属性首先寻找的是该属性的set方法，属性本身有无初始值不重要

```java
<%
    Person person=new Person();
    person.setName("冉海锋好帅");
    person.setPhones(new String[]{"110","119","120"});
    List<String> cities=new ArrayList<String>();
    cities.add("成都");
    cities.add("西安");
    cities.add("广州");
    person.setCities(cities);

    Map<String,Object> map=new HashMap<>();
    map.put("key1","value1");
    map.put("key2","value2");
    map.put("key3","value3");
    person.setMap(map);

    pageContext.setAttribute("person",person);
%>

<%--输出person--%>
输出Person：${person}
输出Person的Name属性：${person.name}
输出Person的phones属性：${person.phones[0]}
输出Person的cities属性：${person.cities}
输出Person的List集合中的个别元素值：${person.cities[0]}
输出Person的map属性：${person.map}
输出Person的map集合中某个key的值：${person.map.key1}
输出Person的age属性：${person.age}
```





## 8.4 EL表达式的运算

*   关系运算

![](https://img-blog.csdnimg.cn/20210409135228146.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

```java
<body>

    ${12==12}

</body>
```

*   逻辑运算

![](https://img-blog.csdnimg.cn/20210409135240111.png)

```java
<body>

    ${12==12 && 12>11}

</body>
```

*   算术运算

![](https://img-blog.csdnimg.cn/20210409135248708.png)

```java
<body>

    ${12+12}
    ${12-12}
    ${12*12}
    ${12/12} <br>  <%--1.0--%>
    ${18%12}

</body>
```

*   empty运算

    empty运算可以判断一个数据是否为空，如果为空，输出true，不为空输出false

    以下几种情况为空：

    *   值为null值
    *   值为空串
    *   值是Object类型数组，长度为0
    *   list集合，元素个数为0
    *   map集合，元素个数为0

```java
<%
    //1.值为null
    request.setAttribute("null",null);
    //2.值为空串
    request.setAttribute("null1","");
    //3.值是Object类型数组，长度为0
    request.setAttribute("null2",new Object[]{});
    //4.值是List集合，个数为0
    List<String> list=new ArrayList<>();
    request.setAttribute("null3",list);
    //5.值是Map集合，个数为0
    Map<String,Object> map=new HashMap<>();
    request.setAttribute("null4",map);
%>
${empty null}
${empty null1}
${empty null2}
${empty null3}
${empty null4}
```

*   三元运算

```java
${12==12?"冉海锋死了":"冉海锋没死"}
```

*   点运算和中括号运算

    *   .点运算：可以输出Bean对象中某个属性的值

    *   【】中括号运算：可以输出有序集合中某个元素的值，并且还可以输出map集合中key里含有特殊字符的key的值

        ```java
        <body>
            <%
                Map<String,Object> map=new HashMap<>();
            	//单引号双引号都可以
                map.put("a.a.a","aaavalue");
                map.put("b+b+b","bbbvalue");
                map.put("c-c-c","cccvalue");

                request.setAttribute("map",map);
            %>

            ${map['a.a.a']}
            ${map['b+b+b']}
            ${map['c-c-c']}
        </body>
        ```






## 8.5 EL表达式中11个隐含对象

EL表达式中11个隐含对象，是EL表达式自己定义的，可以直接使用

变量类型作用pageContextPageContextImpl可以获取jsp中的九大内置对象pageScopeMap可以获取PageContext域中的数据requestScopeMap可以获取reques域中的数据sessionScopeMap可以获取session域中的数据applicationScopeMap可以获取ServletContext域中的数据paramMap可以获取请求参数的值paramValuesMap可以获取请求参数的值，获取多个值的时候使用headerMap可以获取请求头的信息headerValuesMap可以获取请求头的信息，获取多个值的时候使用cookieMap可以获取当前请求的Cookie信息initParamMap可以获取在Web.xml中配置的上下文参数





## 8.6 EL表达式获取四个特定域的属性

*   pageScope ----------------> pageContext域

*   requestScope ---------------->Request域

*   sessionScope ----------------> Session域

*   applicationScope ----------------> ServletContext域

    ```java
    <body>
        <%
            pageContext.setAttribute("key1","pageContext1");
            pageContext.setAttribute("key2","pageContext2");
            request.setAttribute("key2","pageContext2");
            session.setAttribute("key2","pageContext2");
            application.setAttribute("key2","pageContext2");
        %>


        ${pageScope.key1}
        ${requestScope.key2}
        ${sessionScope.key2}
        ${applicationScope.key2}
    </body>
    ```






## 8.7 pageContext

```java
<body>
    <%
        pageContext.setAttribute("req",request);
    %>
    ${pageContext}
    1.协议：${req.scheme}
    2.服务器ip：${pageContext.request.serverName}
    3.服务器端口：${pageContext.request.serverPort}
    4.获取工程路径: ${pageContext.request.contextPath}
    5.获取请求方式:  ${pageContext.request.method}
    6.获取客户端ip地址 ${pageContext.request.remoteHost}
    7.获取会话id编号 ${pageContext.session.id}
</body>
```





## 8.8 其他EL隐含对象实例

*   param、paramValues

    ```java
    <body>
        输出请求参数username的值：${param.username}
        输出请求参数hobby的值：${paramValues.hobby[0]}
        输出请求参数hobby的值：${paramValues.hobby[1]}
    </body>
    ```

    ![](https://img-blog.csdnimg.cn/20210409135328805.png)


​

*   header、headerValues

    ```java
    <body>
        输出请求头【User-Agent】的值：${header['User-Agent']}
        输出请求头【Connection】的值：${header['Connection']}
        输出请求头【User-Agent】的值：${headerValues['User-Agent'][0]}
    </body>
    ```

    ![](https://img-blog.csdnimg.cn/20210409135338356.png)

*   cookie

    ```java
    <body>
        获取cookie的名称：${cookie.JSESSIONID.name}
        获取cookie的值：${cookie.JSESSIONID.value}
    </body>
    ```

    ![](https://img-blog.csdnimg.cn/20210409135346116.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

*   initParam

    ```java
    </head>
        ${initParam}
        输出username的值：${initParam.username}
        输出password的值：${initParam.password}
    </html>
    ```

    ```xml
    <context-param>
        <param-name>username</param-name>
        <param-value>root</param-value>
    </context-param>

    <context-param>
        <param-name>password</param-name>
        <param-value>123456</param-value>
    </context-param>
    ```

    ![](https://img-blog.csdnimg.cn/20210409135354563.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)






# 9. JSTL标签库 √

## 9.1 JSTL标签库概述

*   JSTL标签库，全程是指JSP Standard Tag Library jsp标准标签库，是一个不断完善的开放源代码的jsp标签库

*   EL表达式是为了替换JSP中的表达式脚本，而标签库是为了替换代码脚本，这样使得整个jsp页面变得更加简洁

*   JSTL由五个不同功能的标签库组成

    ![](https://img-blog.csdnimg.cn/20210409135424313.png)


![](https://img-blog.csdnimg.cn/20210409135431138.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)





## 9.2 JSTL标签库使用步骤

*   先导入JSTL标签库的jar包

    ![](https://img-blog.csdnimg.cn/20210409135441647.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

*   使用taglib指令引入标签库






## 9.3 core核心库的使用

*   set标签

    *   作用：set标签可以往域中保存数据

        ![](https://img-blog.csdnimg.cn/20210409135458962.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

        ```java
        <body>
            <%--
            set标签可以往域中保存数据
            域对象.setAttribute（key,value）
            scope属性：设置保存到哪个域（默认）
                page表示pageContext域
                request表示Request域
                session表示Session域
                application表示ServletContext域
            var属性：设置key是多少
            value属性：设置value是多少
            --%>
            保存之前：${requestScope.abc}
            <c:set scope="request" var="abc" value="abcValue"/>
            保存之后：${requestScope.abc}
        </body>
        ```


注：导入jar包之后，一定要在Artifical里面查看lib是否存在以及包是否导入了！

*   if标签

    ```java
    <body>
        <%--
           if标签用来做判断
           test属性表示判断的条件（使用EL表达式输出）
        --%>
        <c:if test="${12!=12}">
            <h1>12等于12</h1>
        </c:if>
    </body>
    ```

*   choose、when、otherwise

    作用：多路判断，跟switch、case、default非常接近

    ```java
    <body>
        <%--
            choose标签开始选择判断
            when标签表示每一种判断情况
                test表示当前这种判断情况的值
            otherwise表示剩下的情况
            注：标签里必能使用html注释
                when标签的父标签一定要是choose标签

        --%>
        <%
            request.setAttribute("height",167);
        %>
        <c:choose>
            <c:when test="${requestScope.height>190}">
                <h2>小巨人</h2>
            </c:when>
            <c:when test="${requestScope.height>180}">
                <h2>很高</h2>
            </c:when>
            <c:when test="${requestScope.height>170}">
                <h2>还可以</h2>
            </c:when>
            <c:otherwise>
                <c:choose>
                    <c:when test="${requestScope.height>160}">
                        <h2>大于160</h2>
                    </c:when>
                    <c:when test="${requestScope.height>150}">
                        <h2>大于150</h2>
                    </c:when>
                </c:choose>
            </c:otherwise>

        </c:choose>

    </body>
    ```

*   foreach标签

    作用：遍历输出使用

    *   遍历1-10

        ```java
        <body>
            <%--
            遍历1-10
            begin属性设置开始的索引
            end属性设置结束的索引
            var属性表示循环的变量（也是当前正在遍历到的数据）
            --%>
            <c:forEach begin="1" end="10" var="i">
                ${i }
            </c:forEach>
        </body>
        ```

    *   遍历Object数组

        ```java
        <body>
            <%--
            遍历Object数组
            items表示遍历的数据源（遍历的集合）
            var表示当前遍历到的数据
            --%>
            <%
                request.setAttribute("arr",new String[]{"110","119","120"});
            %>
            <c:forEach items="${requestScope.arr}" var="i">
                ${i}
            </c:forEach>
        </body>
        ```

    *   遍历List集合，List集合中存放Person类，有属性：编号、用户名、密码、年龄、电话信息

        ```java
        <body>
            <%--
            遍历Map
            --%>
            <%
                List<Student> studentList=new ArrayList<>();
                for (int i = 0; i <=10 ; i++) {
                    studentList.add(new Student(1,"username"+i,"pass"+1,18+i,"phone"+i));
                }
                request.setAttribute("stus",studentList);
            %>
            <table>
                <tr>
                    <th>编号</th>
                    <th>用户名</th>
                    <th>密码</th>
                    <th>年龄</th>
                    <th>电话</th>
                    <th>操作</th>
                </tr>

            <c:forEach items="${requestScope.stus}" var="stu">
                <tr>
                    <td>${stu.id}</td>
                    <td>${stu.username}</td>
                    <td>${stu.password}</td>
                    <td>${stu.age}</td>
                    <td>${stu.phone}</td>
                    <td>删除、修改</td>
                </tr>
            </c:forEach>
            </table>
        </body>
        ```

    *   遍历Map集合

        ```java
        <body>
            <%--
            遍历Map
            --%>
            <%
                Map<String,Object> map=new HashMap<>();
                map.put("key1","value1");
                map.put("key2","value2");
                map.put("key3","value3");
                request.setAttribute("map",map);
            %>
            <c:forEach items="${requestScope.map}" var="entry">
                ${entry}
            </c:forEach>

        </body>
        ```

*   foreach标签所有属性组合使用

    ![](https://img-blog.csdnimg.cn/20210409135518364.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)


```java
<body>
    <%--
    遍历Map
    step表示遍历的步长
    varStatus表示当前遍历到的数据的状态
    --%>
    <%
        List<Student> studentList=new ArrayList<>();
        for (int i = 0; i <=10 ; i++) {
            studentList.add(new Student(1,"username"+i,"pass"+1,18+i,"phone"+i));
        }
        request.setAttribute("stus",studentList);
    %>
    <table>
        <tr>
            <th>编号</th>
            <th>用户名</th>
            <th>密码</th>
            <th>年龄</th>
            <th>电话</th>
            <th>操作</th>
        </tr>

    <c:forEach begin="2" end="7" step="2" varStatus="status" items="${requestScope.stus}" var="stu">
        <tr>
            <td>${stu.id}</td>
            <td>${stu.username}</td>
            <td>${stu.password}</td>
            <td>${stu.age}</td>
            <td>${stu.phone}</td>
            <td>${status.current}</td>
        </tr>
    </c:forEach>
    </table>
</body>
```





# 10. i18n国际化 √

![](https://img-blog.csdnimg.cn/20210409135538428.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)





## 10.1 国际化三要素

![](https://img-blog.csdnimg.cn/20210409135551163.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)





## 10.2 i18n国际化基础实例

```java
public void test(){
//获取系统默认的语言和国家信息
Locale locale = Locale.getDefault();
System.out.println(locale);
//获取中文、中国常量的locale对象
System.out.println(locale.CHINA);

//获取英文、美国常量的locale对象
System.out.println(locale.US);
```

```java
public void test(){
    //得到我们需要的Locale对象
    Locale locale=Locale.CHINA;
    //通过指定的basename和Locale对象读取相应的配置文件
    ResourceBundle bundle = ResourceBundle.getBundle("i18n", locale);

    System.out.println(bundle.getString("username"));
    System.out.println(bundle.getString("password"));
}
```





## 10.3 通过请求头实现国际化

![](https://img-blog.csdnimg.cn/20210409135612317.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)





# 11. 文件的上传和下载 √

## 11.1 概述

文件的上传和下载，是非常常见的功能，很多的系统或者软件中都经常使用，比如：qq头像就使用了上传





## 11.2 文件的上传介绍

*   要有一个form标签，method=post请求

*   form便签的encType属性值必须为multipart/form-data值

    *   表示提交的数据以多段（每一个表单项一个数据段）的形式进行拼接，然后以二进制流的形式发送给服务器
*   在form标签中使用input type=file添加上传的文件

    ```java
    <body>
        <form action="http://localhost:8080/04_EL_JSTL/uploadservlet" method="post" enctype="multipart/form-data">
            用户名：<input type="text" name="username"/>
            头像：<input type="file" name="photo"/>
            <input type="submit" value="上传">
        </form>
    </body>
    ```

*   编写服务器代码接受、处理上传的文件

    ```java
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("文件上传进来了");
    }
    ```






## 11.3 上传的http协议内容介绍

![](https://img-blog.csdnimg.cn/20210409135635597.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

*   必须使用流的形式来进行接受：

    ```java
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("文件上传进来了");
        ServletInputStream inputStream = req.getInputStream();
        byte[] buffer= new byte[102400];
        int read = inputStream.read(buffer);
        System.out.println(new String(buffer,0,read));

    }
    ```






## 11.4 上传会用到的类和方法的介绍

*   需要导入两个jar包

    ![](https://img-blog.csdnimg.cn/20210409135651135.png)

*   常用的类

    *   ServletFileUpload类：用于解析上传的数据

    *   FileItem类：表示每一个表单项

        ![](https://img-blog.csdnimg.cn/20210409135714869.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

        ![](https://img-blog.csdnimg.cn/20210409135723793.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)






## 11.5 使用fileupload解析上传的数据

```java
//1.先判断上传的数据是否为多段数据（只有是多段数据才是文件上传的）
if(ServletFileUpload.isMultipartContent(req)){
    //创建FileItemFactory工厂实现类
    DiskFileItemFactory fileItemFactory = new DiskFileItemFactory();
    //创建用于解析上传数据的工具类ServletFileUpload类
    ServletFileUpload servletfileupload = new ServletFileUpload(fileItemFactory);
    try {
        //解析上传的数据，得到每一个表单项FileItem
        List<FileItem> list = servletfileupload.parseRequest(req);

        //循环判断每一个表单项是普通类型还是上传的文件
        for (FileItem fileItem : list) {
            if(fileItem.isFormField()){
                //普通表单项

                System.out.println("表单项的name属性值"+fileItem.getFieldName());
                //参数UTF-8解决乱码属性
                System.out.println("表单项的value属性值"+fileItem.getString("utf-8"));
            }else {
                //上传的文件

                System.out.println("表单项的name属性值"+fileItem.getFieldName());
                System.out.println("上传的文件名"+fileItem.getName());
                fileItem.write(new File("E:\\"+fileItem.getName()));
            }
        }
    } catch (FileUploadException e) {
        e.printStackTrace();
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```





## 11.6 文件下载的实现

![](https://img-blog.csdnimg.cn/20210409135744913.png)

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    //1.获取要下载的文件名
    String downloadFileName="1.jpg";
    //2.读取要下载的文件内容(通过ServletContext对象可以读取)
    ServletContext servletContext = getServletContext();
    //获取要下载的文件类型
    String mimeType = servletContext.getMimeType("/file/" + downloadFileName);
    System.out.println("下载的文件类型："+mimeType);
    //4.在回传前，通过响应头告诉客户端返回的数据类型
    resp.setContentType(mimeType);
    //5.告诉客户端收到的数据是用于下载的（使用响应头）
    //Content-Disposition响应头：表示收到的数据怎么处理   Content-Disposition:表示附件,下载使用    filenma=表示指定下载的文件名
    resp.setHeader("Content-Disposition","attachment;filename"="美女.jpg");
    InputStream resourceAsStream = servletContext.getResourceAsStream("/file/" + downloadFileName);
    //获取相应的输出流
    OutputStream outputStream=resp.getOutputStream();
    //3.将下载的文件内容回传给客户端
    //读取输入流中全部的数据，复制给输出流，输出给客户端
    IOUtils.copy(resourceAsStream,outputStream);

    //4.
}
```





## 11.7 URL编码解决谷歌IE浏览器中文下载码乱码

```java
//5.告诉客户端收到的数据是用于下载的（使用响应头）
//Content-Disposition响应头：表示收到的数据怎么处理   Content-Disposition:表示附件,下载使用    filenma=表示指定下载的文件名
resp.setHeader("Content-Disposition","attachment; filename="+ URLEncoder.encode("美女.jpg","utf-8"));
InputStream resourceAsStream = servletContext.getResourceAsStream("/file/" + downloadFileName);
```





## 11.8 Base64编码、解码

```java
public static void main(String[] args) throws IOException {
    String content="内容";
    //创建Base64编码器
    BASE64Encoder base64Encoder = new BASE64Encoder();
    //执行Base64编码操作
    String encode = base64Encoder.encode(content.getBytes("utf-8"));
    System.out.println(encode);

    //创建base64解码器
    BASE64Decoder base64Decoder = new BASE64Decoder();
    //解码操作
    byte[] bytes = base64Decoder.decodeBuffer(encode);
    String s = new String(bytes,"utf-8");
    System.out.println(s);

}
```





## 11.9 Base64解决火狐浏览器中文下载乱码

![](https://img-blog.csdnimg.cn/20210409135804190.png)





# 12. Cookie √

## 12.1 概述

*   Cookie是服务器通知客户端保存键值对的一种技术
*   客户端有了Cookie后，每次请求都发送给服务器
*   每个Cookie的大小不能超过4kb





## 12.2 Cookie的创建

![](https://img-blog.csdnimg.cn/20210409135844731.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

```java
protected void createcookie(HttpServletRequest req, HttpServletResponse resp) throws  IOException {
    //1.创建Cookie对象
    Cookie cookie = new Cookie("key1","value1");
    //2.通知客户端保存Cookie
    resp.addCookie(cookie);
    resp.getWriter().write("Cookie创建成功");
}
```

```java
// 解决post请求中文乱码问题
// 一定要在获取请求参数之前调用才有效
req.setCharacterEncoding("UTF-8");

//解决中文乱码问题
resp.setContentType("text/html;charset=utf-8");
```





## 12.3 Cookie的获取

服务器获取客户端的Cookie只需要一行代码：req.getCookies（）：Cookie\[ \]

```java
Cookie[] cookies = req.getCookies();
for (Cookie cookie : cookies) {
    //getName()方法：返回cookie的key
    //getValue()方法：返回cookie的值
    resp.getWriter().write("cookie["+cookie.getName()+"="+cookie.getValue()+"]");
}
```

找某一个单一的Cookie：写一个工具类也可，直接写代码也可：

```java
protected void getcookie(HttpServletRequest req, HttpServletResponse resp) throws  IOException {
        Cookie[] cookies = req.getCookies();

        Cookie iwantcookie= CookieUtils.findcookie("key1",cookies);
//        for (Cookie cookie : cookies) {
//            if("key1".equals(cookie.getName())){
//                iwantcookie=cookie;
//                break;
//            }
//        }

        //如果不等于null，说明赋过值也就是找到了需要的Cookie
        if(iwantcookie!=null){
            resp.getWriter().write("找到了需要的Cookie");
        }
    }
```

```java
public static Cookie findcookie(String name, Cookie[] cookies){
    if(name==null || cookies==null || cookies.length==0){
        return null;
    }

    for (Cookie cookie : cookies) {
        if(name.equals(cookie.getName())){
            return cookie;
        }
    }
    return null;
}
```





## 12.4 Cookie值的修改

*   方案一：

    *   先创建一个要修改的同名的Cookie
    *   在构造器，同时赋于新的Cookie值
    *   调用response.addCookie（Cookie）

    ```java
    //1.先创建一个要修改的同名的Cookie
    //2.在构造器中，同时赋予新的Cookie值
    Cookie cookie = new Cookie("key1", "newValua1");
    //3.调用response.addCookie（）方法通知客户端保存修改
    resp.addCookie(cookie);//1.先创建一个要修改的同名的Cookie
    //2.在构造器中，同时赋予新的Cookie值
    Cookie cookie = new Cookie("key1", "newValua2");
    resp.addCookie(cookie);
    resp.getWriter().write("key1的Cookie已经修改好");
    ```

*   方案二：

    *   先查找到需要修改的Cookie对象
    *   调用setValue（）方法赋予新的Cookie值
    *   调用response.addCookie（）通知客户端保存修改

    ```java
    //        1.先查找到需要修改的Cookie对象
            Cookie cookie = CookieUtils.findcookie("key1", req.getCookies());
            if(cookie!=null){
    //        2.调用setValue（）方法赋予新的Cookie值
                cookie.setValue("newValue2");
    //        3.调用response.addCookie（）通知客户端保存修改
                resp.addCookie(cookie);
    ```


注意：cookie的value不能为中文，除非用Base64编码





## 12.5 谷歌和火狐浏览器如何查看Cookie

*   谷歌浏览器：

    ![](https://img-blog.csdnimg.cn/20210409135919272.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

*   火狐浏览器

    ![](https://img-blog.csdnimg.cn/20210409135925778.png)






## 12.6 Cookie的生命控制

Cookie的生命控制指的是如何管理Cookie什么时候被销毁（删除）

*   setMaxAge（）

    *   正数，表示在指定的秒数后过期
    *   负数，表示浏览器一关，Cookie就会被删除
    *   零，表示马上删除Cookie

    ```java
    protected void defaultlife(HttpServletRequest req, HttpServletResponse resp) throws  IOException {
        Cookie cookie = new Cookie("defaultLife","defaultLife");
        cookie.setMaxAge(-1); //设置存活时间
        resp.addCookie(cookie);
    }


    protected void deletenow(HttpServletRequest req, HttpServletResponse resp) throws  IOException {
       //先找到你要删除的cookie对象
        Cookie cookie=CookieUtils.findcookie("key1",req.getCookies());
        if(cookie!=null){
            //调用setMaxAge（0）
            cookie.setMaxAge(0);   //表示马上删除，不需要等待浏览器关闭
            //调用response.addCookie（cookie）
            resp.addCookie(cookie);
            resp.getWriter().write("key1的Cookie已经被删除了！");
        }

    }

    protected void life3600(HttpServletRequest req, HttpServletResponse resp) throws  IOException {
        Cookie cookie=new Cookie("life3600","life3600");
        cookie.setMaxAge(60*60);   //设置Cookie一小时之后被删除，无效
        resp.addCookie(cookie);
        resp.getWriter().write("已经创建了一个存活一小时的Cookie");

    }
    ```






## 12.7 Cookie的Path属性

Cookie的Path属性可以有效地过滤哪些Cookie可以发送给服务器，哪些不发，path属性是通过请求的地址来进行有效地过滤

*   CookieA path=/工程路径
*   CookieB path=/工程路径/abc

请求地址如下：

[http://ip:port/工程路径/a.html](http://ip:port/%E5%B7%A5%E7%A8%8B%E8%B7%AF%E5%BE%84/a.html) ---------------------> CookieA发送，CookieB不发送

[http://ip:port/工程路径/abc/a.html](http://ip:port/%E5%B7%A5%E7%A8%8B%E8%B7%AF%E5%BE%84/a.html) ----------------> CookieA发送，CookieB发送

```java
protected void testPath(HttpServletRequest req, HttpServletResponse resp) throws  IOException {
    Cookie cookie=new Cookie("path1","path1");
    //getContextPath 得到工程路径
    cookie.setPath(req.getContextPath()+"/abc");   //=========>  /工程路径/abc
    resp.addCookie(cookie);
    resp.getWriter().write("创建了一个带有Path路径的Cookie");

}
```





## 12.8 Cookie练习----免用户名登录

```java
public class LoginServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username=req.getParameter("username");
        String password=req.getParameter("password");

        if("ranhaifeng".equals(username) && "123456".equals(password)){
            //登录成功
            Cookie cookie = new Cookie("username",username);
            cookie.setMaxAge(60*60*24*7);
            resp.addCookie(cookie);
            System.out.println("登录成功");
        }else {
            //登录失败
            System.out.println("登录失败");
        }
    }
}
```

```java
<body>
    <form action="http://localhost:8080/06_cookie_session/loginservlet" method="get">
        用户名：<input type="text" name="username" value="${cookie.username.value}">
        密码：<input type="password" name="password" >
        <input type="submit" value="登录">
    </form>

</body>
```





# 13. Session √

## 13.1 概述

*   Session就是一个接口（HttpSession）
*   Session就是会话，它是用来维护一个客户端和服务器之间关联的一种技术
*   每个客户端都有自己的一个Session会话
*   Session会话中，我们经常用来保存用户登录之后的信息





## 13.2 创建Session和获取

创建和获取Session，他们的API是一样的

*   request.getSession()

    *   第一次调用：创建Session会话
    *   之后调用都是：获取前面创建好的Session会话对象
*   isNew（）：判断到底是不是刚创建出来的

    *   true：表示刚创建
    *   false：获取之前创建的

每个会话都有一个身份号码，即ID值，且每个ID值唯一

*   getId（）：得到Session的会话id值

```java
protected void createorgetsession(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    //创建和获取Session会话对象
    HttpSession session = req.getSession();
    //判断当前Session会话是否是新创建出来的
    boolean aNew = session.isNew();
    //获取session会话的唯一标识
    String id = session.getId();

    resp.getWriter().write("得到的Session它的id是："+id+"<br/>");
    resp.getWriter().write("这个Session是否是新创建的："+aNew+"<br/>");
}
```





## 13.3 Session域中数据的存取

```java
protected void setattribute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    req.getSession().setAttribute("key1","value1");
    resp.getWriter().write("已经往Session中保存了数据");
}

protected void getattribute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    Object attribute = req.getSession().getAttribute("key1");
    resp.getWriter().write("从Session中获取出key1的数据是："+attribute);
}
```





## 13.4 Session生命周期的控制

![](https://img-blog.csdnimg.cn/20210409135954633.png)

*   值为正数的时候，设定Session的超时时长；值为负数表示永不超时（极少使用）

*   public void invalidated（）：让当前session会话马上超时无效

    ```java
    //先获取Session对象
    HttpSession session = req.getSession();
    //让Session会话马上超时
    session.invalidate();

    resp.getWriter().write("session已经设置为超时（无效）");
    ```

*   Session默认的超时时长为30分钟（在Tomcat配置文件中默认配置）

    *   ```xml
        <session-config>
        	<session-timeout>30</session-timeout>
        </session-config>
        ```

    *   如果你希望你的Web工程默认的Session的超时时长为其他时长，你可以在你自己的Web.xml配置文件中做以上相同的配置，就可以修改你的Web工程所有Session的默认超时时长

    *   如果你想只修改个别Session的超时时长，就需要使用上面的API：setMaxInactiveInterval（interval）

        ```java
        protected void life3(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
            //先获取Session对象
            HttpSession session = req.getSession();
            //设置当前session3秒后超时
            session.setMaxInactiveInterval(3);

            resp.getWriter().write("当前Session已经设置为3秒后超时");
        }
        ```

    *   Session超时的概念介绍

        ![](https://img-blog.csdnimg.cn/20210409140005744.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)






## 13.5 浏览器和Session之间的技术关联

Session技术，底层其实是基于Cookie技术来实现的

![](https://img-blog.csdnimg.cn/20210409140020923.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)





# 14. Filter过滤器 √

## 14.1 概述

*   Filter过滤器她是JavaWeb三大组件之一。三大组件分别是：Servlet、Listener、Filter

*   Filter过滤器它是javaEE的规范，也就是接口

*   Filter过滤器的作用：**拦截请求**，过滤响应

*   拦截请求常见的应用场景：

    *   权限检查
    *   日记操作
    *   事务管理





## 14.2 Filter过滤器的基本使用

要求在你的Web工程下有一个admin目录，这个目录下的所有资源（html页面、jpg图片、jsp文件等）都必须是用户登录之后才允许访问

思考：根据之前学过的内容知道，用户登录都会把用户登录的信息保存到Session域中，所以要检查用户是否登陆，可以判断Session中是否包含有用户登录的信息即可！

![](https://img-blog.csdnimg.cn/20210409140037528.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

```java
@Override
public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    HttpServletRequest httpServletRequest=(HttpServletRequest) servletRequest;
    HttpSession session=httpServletRequest.getSession();
    Object user = session.getAttribute("user");
    if(user==null){
        servletRequest.getRequestDispatcher("/login.jsp").forward(servletRequest,servletResponse);
        return;
    }else {
        //让程序继续往下访问用户的目标资源
        filterChain.doFilter(servletRequest,servletResponse);
    }
}
```

```xml
<filter>
    <filter-name>AdminFilter</filter-name>
    <filter-class>com.atguigu.filter.AdminFilter</filter-class>
</filter>

<filter-mapping>
    <filter-name>AdminFilter</filter-name>
<!--拦截路径-->
    <url-pattern>/admin/*</url-pattern>
</filter-mapping>
```





## 14.3 完整的用户登录和权限检查

```java
public class LoginServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=utf-8");
        String username = req.getParameter("username");
        String password = req.getParameter("password");

        if("ranhaifeng".equals(username) && "123456".equals(password)){
            req.getSession().setAttribute("user",username);
            resp.getWriter().write("登录成功");
        }else {
            req.getRequestDispatcher("/login.jsp").forward(req,resp);
        }
    }
}
```





## 14.4 Filter生命周期

Filter的生命周期包含几个方法：

*   构造器方法：Web工程启动时候执行
*   init初始化方法：Web工程启动时候执行
*   doFilter过滤方法：每次拦截到请求就会执行
*   destroy销毁方法：停止Web工程时候就会执行（停止Web工程，也会销毁Web过滤器）





## 14.5 FilterConfig类

*   FilterConfig类，见名知意它是Filter过滤器的配置文件类

*   Tomcat每次创建Filter的时候，也会创建一个FilterConfig类，这里包含了Filter配置文件的配置信息

*   FilterConfig类的作用是获取Filter过滤器的配置内容

    *   获取Filter的名称filter-name的内容

        ```java
        System.out.println("Filter-name的值是："+filterConfig.getFilterName());
        ```

    *   获取在Filter中配置的init-param初始化参数

        ```java
        System.out.println("初始化参数username参数的值是："+filterConfig.getInitParameter("username"));
        ```

    *   获取ServletContext对象

        ```java
        System.out.println("获取ServletContext对象"+filterConfig.getServletContext());
        ```

## 14.6 Filter-Chain过滤器链

![](https://img-blog.csdnimg.cn/20210409140058459.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5eXJoZg==,size_16,color_FFFFFF,t_70)

## 14.7 Filter的拦截路径

*   精确匹配

    ```xml
    <url-pattern>/target.jsp</url-pattern>
    ```

    以上配置的路径，表示请求地址为：[http://ip:port/工程路径/target.jsp](http://ip:port/%E5%B7%A5%E7%A8%8B%E8%B7%AF%E5%BE%84/target.jsp)

*   目录匹配

    ```xml
    <url-pattern>/admin/*</url-pattern>
    ```

    以上配置的路径，表示请求地址为：[http://ip:port/工程路径/admin/\*](http://ip:port/%E5%B7%A5%E7%A8%8B%E8%B7%AF%E5%BE%84/admin/*)

*   后缀名匹配

    ```xml
    <url-pattern>*.html</url-pattern>
    ```

    以上配置的路径，表示请求地址必须以.html结尾才可拦截到

    ```xml
    <url-pattern>*.do</url-pattern>
    ```

    以上配置的路径，表示请求地址必须以.do结尾才可拦截到(.abc)

    ```xml
    <url-pattern>*.action</url-pattern>
    ```

    以上配置的路径，表示请求地址必须以.do结尾才可拦截到(.action)



注：Filter过滤器只关心请求的地址是否匹配，不关心请求的资源是否存在！！！！





# 15. JSON √

## 15.1 概述

*   JSON(JavaScr ipt Object Notaticn)是一种轻量级的数据交换格式。易于人阅读和编写。同时也易于机器解析和生成。JSON采用完全独立于语言的文本格式，而且很多语言都提供了对json的支持(包括C，C++，C#，Java，JavaScript, Perl, Python等）。这样就使得JSON成为理想的数据交换格式。

*   JSON(JavaScr ipt Object Notaticn)是一种轻量级的数据交换格式。

*   json的轻量级指的是跟xml作比较，数据交换指的是客户端和服务器之间业务数据的传递格式

## 15.2 JSON在Javascript中的使用

*   json的创建

    json是由键值对组成，并且由大括号包围，每个键由引号引起来，键和值之间使用冒号进行分隔，多组键值对之间使用逗号进行分隔

    ```javascript
    var jsonObj={
       "key1":12,
       "key2":"abc",
       "key3":true,
       "key4":[11,"arr",false],
       "key5":{
          "key5_1":551,
          "key5_2":"key5_2_value"
       },
       "key6":[{
          "key_6_1_1":6611,
          "key_6_1_2":"key_6_1_2_value"
       },{
          "key_6_2_1":6621,
          "key_6_2_2":"key_6_2_2_value"
       }]
    };
    ```

*   json的访问

    json本身就是一个对象，json中的key我们可以理解为对象中的一个属性，json中的key访问就跟访问对象的属性一样：json对象.key

    ```javascript
    alert(typeof(jsonObj)); // json就是一个对象
    json的访问
    alert(jsonObj.key1);
    alert(jsonObj.key2);
    alert(jsonObj.key3);
    alert(jsonObj.key4);  //得到数组

    json中数组值的遍历
    for(var i=0;i<jsonObj.key4.length;i++){
       alert(jsonObj.key4[i]);
    }

    alert(jsonObj.key5.key5_1);
    alert(jsonObj.key5.key5_2);

    var jsonitem=jsonObj.key6[0];
    alert(jsonitem.key_6_1_1);
    alert(jsonitem.key_6_1_2);
    ```

## 15.3 JSON两种常用的转换方法

json的存在有两种形式：

*   对象的形式存在，我们叫它json对象

*   字符串的形式存在，我们叫它json字符串

*   一般我们要操作json中的数据的时候，需要json对象的格式

*   一般我们需要在客户端和服务器之间进行数据交换的时候，使用json字符串的格式

*   json.stringfy（）：将json对象转换称为json字符串

*   json.parse（）：将json字符串转换为json对象


```javascript
// json对象转字符串
var jsonObjString=JSON.stringify(jsonObj);   //特别像toString（）
alert(jsonObjString);

// json字符串转json对象
var jsonObj2=JSON.parse(jsonObjString);
alert(jsonObj2.key1);
```


## 15.4 JSON在java中的使用

*   javaBean和json的互转

    ```java
    //javaBean和json的互转
    @Test
    public void test1(){
        Person person = new Person(1, "锋哥好帅");

        //创建Gson对象实例
        Gson gson = new Gson();
        //toJson（）方法可以吧Java对象转换称为Json字符串
        String personJsonString = gson.toJson(person);
        System.out.println(personJsonString );

        //fromJason()方法吧json字符串方法转换为java对象
        //第一个参数为json字符串   第二个参数为转换回去的java对象类型
        Person person1 = gson.fromJson(personJsonString, Person.class);
        System.out.println(person1);

    }
    ```

*   List和json的互转

    ```java
    public class PersonListType extends TypeToken<ArrayList<Person>> {
    }
    ```

    ```java
    @Test
    public void test2(){
        List<Person> personList=new ArrayList<>();
        personList.add(new Person(1,"LBJ"));
        personList.add(new Person(2,"KD"));
        Gson gson = new Gson();

        //吧list集合转化为Json字符串
        String personListJasonString = gson.toJson(personList);
        System.out.println(personListJasonString);

        List<Person> list= gson.fromJson(personListJasonString, new PersonListType().getType());
        System.out.println(list);
        Person person=list.get(0);
        System.out.println(person);
    }
    ```

*   Map和json的互转

    ```java
    //Map和json的互转
    @Test
    public void test3(){
        Map<Integer,Person> personMap=new HashMap<>();
        personMap.put(1,new Person(1,"LBJ"));
        personMap.put(2,new Person(2,"AD"));

        Gson gson = new Gson();
        //吧Map集合转化称为json字符串
        String personMapJsonString = gson.toJson(personMap);
        System.out.println(personMapJsonString);

        Map<Integer,Person> personMap2 =gson.fromJson(personMapJsonString, (Type) new TypeToken<HashMap<Integer,Person>>(){}.getType());  //匿名内部类
        System.out.println(personMap2);
        Person p=personMap2.get(1);
        System.out.println(p);

    }
    ```

# 16. AJAX √

## 16.1 概述

*   AJAX即“Asynchronous JavascriptcAnd XML”(异步JavaScript和XML)，是指一种创建交互式网页应用的网页开发技术。

*   ajax是一种浏览器通过js异步发起请求。局部更新页面的技术。


## 16.2 Javascript的AJAX请求

```javascript
<script type="text/javascript">
         //在这里使用javaScript语言发起Ajax请求，访问服务器AjaxServlet中javascriptajax
         function ajaxRequest() {
//              1、我们首先要创建XMLHttpRequest
            var xmlHttpRequest = new XMLHttpRequest();
//              2、调用open方法设置请求参数
            xmlHttpRequest.open("GET","http://localhost:8080/05_json_ajax_i18n/ajaxservlet?action=javascriptajax",true);
//              4、在send方法前绑定onreadystatechange事件，处理请求完成后的操作。
            xmlHttpRequest.onreadystatechange=function(){
            if(xmlHttpRequest.readyState==4 && xmlHttpRequest.status==200){

               var jsonObj=JSON.parse(xmlHttpRequest.responseText);

               //吧相应的数据显示在页面上
                  document.getElementById("div01").innerHTML="编号："+jsonObj.id+",姓名："+jsonObj.name;
               }
            }
//              3、调用send方法发送请求
            xmlHttpRequest.send();
         }
      </script>
```

```java
protected void javascriptajax(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    System.out.println("Ajax请求过来啦~");
    Person person = new Person(1, "冉海锋");

    //json格式的字符串
    Gson gson= new Gson();
    String personJsonString = gson.toJson(person);
    resp.getWriter().write(personJsonString);
}
```

## 16.3 AJAX请求的特点

*   AJAX请求的局部更新，浏览器地址栏不会发生变化
*   局部更新不会舍弃原来页面的内容


## 16.4 jQuery中的AJAX请求

*   $ajax方法
    *   url 请求的地址
    *   type 请求的类型是GET或POST
    *   data 发送给服务器的数据
        *   ​ 格式有两种：1.name=value && name=value 2.{key：value}
    *   success 请求成功，相应的回调函数
    *   dataType 相应的数据类型：常用的数据类型有：text（纯文本）、xml（xml数据）、json（json对象）

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
   <head>
      <meta http-equiv="pragma" content="no-cache" />
      <meta http-equiv="cache-control" content="no-cache" />
      <meta http-equiv="Expires" content="0" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>Insert title here</title>
      <script type="text/javascript" src="script/jquery-1.7.2.js"></script>
      <script type="text/javascript">
         $(function(){
            // ajax请求
            $("#ajaxBtn").click(function(){
               $.ajax({
                  url:"http://localhost:8080/05_json_ajax_i18n/ajaxservlet",
                  data:"action=jqueryajax",
                  type:"GET",
                  success:function f(data) {
                     ${"#msg"}.html("编号："+data.id+",姓名："+data.name);
               },
                  dataType:"json"
               });

            });

            // ajax--get请求
            $("#getBtn").click(function(){

               alert(" get btn ");

            });

            // ajax--post请求
            $("#postBtn").click(function(){
               // post请求
               alert("post btn");

            });

            // ajax--getJson请求
            $("#getJSONBtn").click(function(){
               // 调用
               alert("getJSON btn");

            });

            // ajax请求
            $("#submit").click(function(){
               // 把参数序列化
               alert("serialize()");
            });

         });
      </script>
   </head>
   <body>
      <div>
         <button id="ajaxBtn">$.ajax请求</button>
         <button id="getBtn">$.get请求</button>
         <button id="postBtn">$.post请求</button>
         <button id="getJSONBtn">$.getJSON请求</button>
      </div>

      <div id="msg">

      </div>
      <br/><br/>
      <form id="form01" >
         用户名：<input name="username" type="text" /><br/>
         密码：<input name="password" type="password" /><br/>
         下拉单选：<select name="single">
            <option value="Single">Single</option>
            <option value="Single2">Single2</option>
         </select><br/>
         下拉多选：
         <select name="multiple" multiple="multiple">
             <option selected="selected" value="Multiple">Multiple</option>
             <option value="Multiple2">Multiple2</option>
             <option selected="selected" value="Multiple3">Multiple3</option>
         </select><br/>
         复选：
         <input type="checkbox" name="check" value="check1"/> check1
         <input type="checkbox" name="check" value="check2" checked="checked"/> check2<br/>
         单选：
         <input type="radio" name="radio" value="radio1" checked="checked"/> radio1
         <input type="radio" name="radio" value="radio2"/> radio2<br/>
      </form>
      <button id="submit">提交--serialize()</button>
   </body>
</html>
```





## 16.5 jQuery中的get和post方法

*   url 请求的url地址
*   data 发送的数据
*   callback 成功的回调函数
*   type 返回的数据类型

```javascript
// ajax--get请求
$("#getBtn").click(function(){

   $.get("http://localhost:8080/05_json_ajax_i18n/ajaxservlet","action=jqueryget",function (data) {
      ${"#msg"}.html("get编号："+data.id+",姓名："+data.name);
   },"json")

});

// ajax--post请求
$("#postBtn").click(function(){
   $.post("http://localhost:8080/05_json_ajax_i18n/ajaxservlet","action=jqueryget",function (data) {
      ${"#msg"}.html("post编号："+data.id+",姓名："+data.name);
   },"json")

});
```





## 16.6 jQuery中的getJson方法

*   url 请求的url地址

*   data 发送的数据

*   callback 成功的回调函数


```javascript
// ajax--getJson请求
$("#getJSONBtn").click(function(){
   // 调用
   $.getJSON("http://localhost:8080/05_json_ajax_i18n/ajaxservlet","action=jquerygetjson",function (data) {
      $("#msg").html("getJson编号："+data.id+",姓名："+data.name);
   })

});
```





## 16.7 jQuery中的serialize方法

表单序列化serialize（）：

serialize（）可以把表单中的所有表单项内容都获取到，并以name=value&name=value的形式进行拼接

```javascript
// ajax请求
$("#submit").click(function(){
   // 把参数序列化
   alert($("#form01").serialize());
   $.getJSON("http://localhost:8080/05_json_ajax_i18n/ajaxservlet","action=jqueryserialize&"+$("#form01").serialize(),function (data) {
      $("#msg").html("Serialize编号："+data.id+",姓名："+data.name);
   })
});
```