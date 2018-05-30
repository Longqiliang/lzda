module.exports = {
  proxyList: {
    '/api': {
      target: 'http://192.168.0.107:80',
      changeOrigin: true,
      pathRewrite: {'^/api': '/lzda' }
    }
  }
}
