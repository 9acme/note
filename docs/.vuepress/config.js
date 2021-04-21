module.exports = {
  base: '/note/dist/',
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
            collapsable: true,
            children: [
              { title: 'aaa', path: 'webpack/1.md' },
              { title: 'bbb', path: 'webpack/2.md' },
              { title: 'ccc', path: 'webpack/3.md' }
            ]
          },
          {
            title: '线上环境',
            collapsable: true,
            children: [
              { title: 'aaa', path: 'webpack/1.md' },
              { title: 'bbb', path: 'webpack/2.md' },
              { title: 'ccc', path: 'webpack/3.md' }
            ]
          },
          {
            title: '优化',
            collapsable: true,
            children: [
              { title: 'aaa', path: 'webpack/1.md' },
              { title: 'bbb', path: 'webpack/2.md' },
              { title: 'ccc', path: 'webpack/3.md' }
            ]
          }
        ]
      }
    ]
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
