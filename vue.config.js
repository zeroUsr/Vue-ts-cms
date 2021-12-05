const path = require('path')

module.exports = {
  // 配置方式一: 使用 cli 提供的方式配置
  // 配置打包输出的文件夹
  // outputDir: './bulid',
  // 配置方式二: 和 webpack 的属性一致,最后会将其合并
  // devServer: {
  // 跨域请求
  //   proxy: {
  //     '^/api': {
  //       target: 'http://152.136.185.210:5000',
  //       pathRewrite: {
  //         '^/api': ''
  //       },
  //       changeOrigin: true
  //     }
  //   }
  // },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        components: '@/components'
      }
    }
  }
  // configureWebpack: (config) => {
  //   // 会将其修改
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // }
  // 配置方式三: 链式调用
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  // }
}
