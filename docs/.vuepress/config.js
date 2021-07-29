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
        title: 'java',
        collapsable: true,
        sidebarDepth: 2,
        children: [{ title: 'java基础', path: 'java/javaSE.md' }]
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
          publicPath: 'https://cdn.jsdelivr.net/gh/annarheimur/note/dist/'
        }
      };
    }
  }
};
