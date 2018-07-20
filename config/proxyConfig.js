module.exports = {
  proxyList: {
    '/lzda': {
      target: 'http://192.168.0.105:8082',
      changeOrigin: true,
      pathRewrite: {'^/lzda': '/lzda' }
    }
  }
}
