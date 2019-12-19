let pageMethod = require('./script/getPages.js')
const pages = pageMethod.pages()
// build-s编译不能将publicPath设置为'./'或'',会导致相对路径资源路径混乱
module.exports = {
  pages,
  publicPath: '/',
  outputDir: 'dist'
}
