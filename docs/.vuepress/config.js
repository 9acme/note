module.exports = {
  base: 'https://cdn.jsdelivr.net/gh/Annarheimur/note/dist/',
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
  }
};
