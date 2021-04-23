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
              { title: '打包样式资源', path: 'webpack/1_style.md' },
              { title: '打包html资源', path: 'webpack/2_html.md' },
              { title: '打包图片资源', path: 'webpack/3_img.md' },
              { title: '打包其他资源', path: 'webpack/4_other.md' },
              { title: 'devServer', path: 'webpack/5_devServer.md' }
            ]
          },
          {
            title: '线上环境',
            collapsable: true,
            children: [
              { title: 'aaa', path: 'webpack/1_style.md' },
              { title: 'bbb', path: 'webpack/1_style.md' },
              { title: 'ccc', path: 'webpack/3_img.md' }
            ]
          },
          {
            title: '优化',
            collapsable: true,
            children: [
              { title: 'aaa', path: 'webpack/1_style.md' },
              { title: 'bbb', path: 'webpack/1_style.md' },
              { title: 'ccc', path: 'webpack/3_img.md' }
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
