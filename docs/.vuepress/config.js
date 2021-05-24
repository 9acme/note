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
