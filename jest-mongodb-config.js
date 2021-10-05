module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: 'latest',
      debug: true,
      arch: 'x64',
      skipMD5: true
    },
    autoStart: false,
    instance: {}
  }
}
