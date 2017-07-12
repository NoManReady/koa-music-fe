var px2rem = require('postcss-px2rem')
var vueLoaderOptions = {
  postcss: pack => {
    return [
      px2rem({
        remUnit: 75
      })
    ]
  },
  autoprefixer: {
    browsers: ["Android >= 4.0", "ChromeAndroid > 1%", "iOS >= 4"]
  }
}

module.exports = vueLoaderOptions