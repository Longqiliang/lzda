module.exports = {
  proxyList: {
    '/lzda': {
      target: 'http://192.168.0.107:8080',
      changeOrigin: true,
      pathRewrite: {'^/lzda': '/lzda' }
    }
  }
}
