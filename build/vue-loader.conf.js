var utils = require('./utils')
var config = require('../config')
var merge = require('webpack-merge')
var isProduction = process.env.NODE_ENV === 'production'

var cssLoaders =  utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
})
var extendLoaders = {
  i18n: '@kazupon/vue-i18n-loader'
}
// console.log(Object.assign({}, cssLoaders, extendLoaders))
module.exports = {
  // loaders: cssLoaders,
  loaders: merge(cssLoaders,extendLoaders),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
  // postcss: [
  //   require('autoprefixer')({
  //     browsers: ['last 5 versions']
  //   })
  // ]
}
