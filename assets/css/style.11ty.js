const path = require('path')
const sass = require('node-sass-promise')
const CleanCSS = require('clean-css')

const inputFile = path.join(__dirname, '../../_includes/scss/main.scss')
const outputFile = path.join(__dirname, '../../assets/css/style.css')

module.exports = class {
  data() {
    return {
      layout: '',
      permalink: 'assets/css/style.css',
      eleventyExcludeFromCollections: true
    }
  }

  async render() {
    const { css } = await sass.render({ file: inputFile })
    const output = new CleanCSS({}).minify(css.toString()).styles

    return output
  }
}
