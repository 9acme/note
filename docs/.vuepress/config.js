module.exports = {
  base: '/dist/',
  dest: './dist',
  title: '学习笔记',
  themeConfig: {
    navbar: true,
    sidebar: [
      {
        title: 'webpack',
        collapsable: true,
        sidebarDepth: 2,
        children: [
          {
            title: '开发环境',
            path: 'webpack/webpack_dev.md'
          },
          {
            title: '生产环境',
            path: 'webpack/webpack_prod.md'
          }
        ]
      },
      {
        title: 'javascript',
        collapsable: true,
        sidebarDepth: 2,
        children: [
          { title: 'this', path: 'javascript/this.md' },
          { title: 'ES6 - ES11', path: 'javascript/es6.md' },
          { title: '模块化', path: 'javascript/module.md' }
        ]
      },
      {
        title: 'typescript',
        collapsable: true,
        sidebarDepth: 2,
        path: 'typescript/typescript.md'
      },
      {
        title: '自定义工具库',
        collapsable: true,
        children: [
          'JS工具库/05_函数相关',
          'JS工具库/06_数组相关',
          'JS工具库/07_对象相关',
          'JS工具库/08_字符串相关',
          'JS工具库/09_手写继承',
          'JS工具库/10_手写带委托的事件监听',
          'JS工具库/11_手写ajax请求函数',
          'JS工具库/12_手写事件总线',
          'JS工具库/13_手写消息订阅与发布'
        ]
      },
      {
        title: '发布NPM包', // 标题
        collapsable: true, // 下级列表不可折叠
        children: [
          // 下级列表
          'JS工具库/01_工具函数库说明',
          'JS工具库/02_创建工具包项目',
          'JS工具库/03_发布到npm中央仓库',
          'JS工具库/04_使用自定义工具包'
        ]
      },
      {
        title: 'mysql',
        collapsable: true,
        sidebarDepth: 2,
        children: [
          { title: '总纲', path: 'mysql/第00章_写在前面.md' },
          { title: '概述', path: 'mysql/第01章_数据库概述.md' },
          { title: '环境搭建', path: 'mysql/第02章_MySQL环境搭建.md' },
          { title: '基本的SELECT语句', path: 'mysql/第03章_基本的SELECT语句.md' },
          { title: '运算符', path: 'mysql/第04章_运算符.md' },
          { title: '排序与分页', path: 'mysql/第05章_排序与分页.md' },
          { title: '多表查询', path: 'mysql/第06章_多表查询.md' },
          { title: '单行函数', path: 'mysql/第07章_单行函数.md' },
          { title: '聚合函数', path: 'mysql/第08章_聚合函数.md' },
          { title: '子查询', path: 'mysql/第09章_子查询.md' },
          { title: '创建和管理表', path: 'mysql/第10章_创建和管理表.md' },
          { title: '数据处理之增删改', path: 'mysql/第11章_数据处理之增删改.md' },
          { title: '数据类型精讲', path: 'mysql/第12章_MySQL数据类型精讲.md' },
          { title: '约束', path: 'mysql/第13章_约束.md' },
          { title: '视图', path: 'mysql/第14章_视图.md' },
          { title: '存储过程与函数', path: 'mysql/第15章_存储过程与函数.md' },
          { title: '变量、流程控制与游标', path: 'mysql/第16章_变量、流程控制与游标.md' },
          { title: '触发器', path: 'mysql/第17章_触发器.md' },
          { title: 'MySQL8其它新特性', path: 'mysql/第18章_MySQL8其它新特性.md' }
        ]
      },
      {
        title: 'java',
        collapsable: true,
        sidebarDepth: 2,
        children: [
          { title: '概述', path: 'javaSE/1_Java语言概述.md' },
          { title: '变量', path: 'javaSE/2_变量、标识符、保留字.md' },
          { title: '运算符', path: 'javaSE/3_运算符.md' },
          { title: '流程控制', path: 'javaSE/4_程序流程控制.md' },
          { title: '数组', path: 'javaSE/5_数组.md' },
          { title: '面向对象', path: 'javaSE/6_面向对象.md' },
          { title: '异常', path: 'javaSE/7_异常.md' },
          { title: '多线程', path: 'javaSE/8_多线程.md' },
          { title: '常用类', path: 'javaSE/9_常用类.md' },
          { title: '枚举与注解', path: 'javaSE/10_枚举与注解.md' },
          { title: '集合', path: 'javaSE/11_集合.md' },
          { title: '泛型', path: 'javaSE/12_泛型.md' },
          { title: 'IO流', path: 'javaSE/13_IO流.md' },
          { title: '网络编程', path: 'javaSE/14_网络编程.md' },
          { title: '反射与动态代理', path: 'javaSE/15_反射与动态代理.md' },
          { title: 'Java8新特性', path: 'javaSE/16_Java8新特性.md' }
        ]
      },
      {
        title: 'javaWeb',
        collapsable: true,
        sidebarDepth: 2,
        path: 'javaWeb/javaWeb.md'
      },
      {
        title: 'JDBC',
        collapsable: true,
        sidebarDepth: 2,
        path: 'jdbc/jdbc.md'
      },
      {
        title: 'spring',
        collapsable: true,
        sidebarDepth: 2,
        path: 'spring/spring.md'
      },
      {
        title: 'springMVC',
        collapsable: true,
        sidebarDepth: 2,
        path: 'springMVC/springMVC.md'
      },
      {
        title: 'mybatis',
        collapsable: true,
        sidebarDepth: 2,
        path: 'mybatis/mybatis.md'
      },
      {
        title: 'maven',
        collapsable: true,
        sidebarDepth: 2,
        path: 'maven/maven.md'
      }
    ],
    // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    nextLinks: false,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    prevLinks: false
  },
  configureWebpack: () => {
    const NODE_ENV = process.env.NODE_ENV;
    //判断是否是生产环境
    if (NODE_ENV === 'production') {
      return {
        output: {
          publicPath: 'https://cdn.jsdelivr.net/gh/9acme/note/dist/'
        }
      };
    }
  }
};
