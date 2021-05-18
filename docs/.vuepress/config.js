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
              { title: 'devServer', path: 'webpack/5_devServer.md' },
              { title: '开发环境总配置', path: 'webpack/6_dev_config.md' }
            ]
          },
          {
            title: '线上环境',
            collapsable: true,
            children: [
              { title: '提取单独css', path: 'webpack/7_extract_css.md' },
              { title: 'css兼容性', path: 'webpack/8_css_compatibility.md' },
              { title: '压缩css', path: 'webpack/9_css_compress.md' },
              { title: 'js语法检查', path: 'webpack/10_js_check.md' },
              { title: 'js兼容性', path: 'webpack/11_js_compatibility.md' },
              { title: 'html和js压缩', path: 'webpack/12_js_html_compress.md' },
              { title: '生产环境总配置', path: 'webpack/13_prod_config.md' }
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
      },
      {
        title: 'javascript',
        collapsable: true,
        sidebarDepth: 2,
        children: [
          { title: 'this', path: 'javascript/this.md' },
          { title: 'ES6', path: 'javascript/es6.md' }
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
