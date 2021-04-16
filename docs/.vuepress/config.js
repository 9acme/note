module.exports = {
  // base: 'https://cdn.jsdelivr.net/gh/Annarheimur/note@main/dist/',
  dest: './dist',
  title: '学习笔记',
  themeConfig: {
    navbar: true,
    sidebar: [
      {
        title: 'webpack',
        collapsable: true,
        children: ['webpack/1.md', 'webpack/2.md', 'webpack/3.md']
      }
    ]
  },
  configureWebpack: () => {
    const NODE_ENV = process.env.NODE_ENV;
    //判断是否是生产环境
    if (NODE_ENV === 'production') {
      return {
        output: {
          publicPath: 'https://cdn.jsdelivr.net/gh/Annarheimur/note@main/dist/'
        }
      };
    }
  }
};
