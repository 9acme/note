module.exports = {
  base: '/',
  title: '学习笔记',
  themeConfig: {
    navbar: true,
    sidebar: [
      {
        title: 'webpack',
        collapsable: true,
        children: [
          'webpack/1.md',
          'webpack/2.md',
          'webpack/3.md'
        ]
      }
    ]
  }

}