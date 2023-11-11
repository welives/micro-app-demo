const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})
