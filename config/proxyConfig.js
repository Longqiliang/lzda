module.exports = {
  proxyList: {
    '/api': {
      target: 'http://192.168.0.202:9000',
      changeOrigin: true,
      pathRewrite: {'^/api': '/lzda' }
    }
  }
}
