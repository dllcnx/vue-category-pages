var fs = require('fs')
const glob = require('glob')

// 需要保持和vue.config.js的publicPath保持一致
const publicPath = ''
/**
 * js文件copy
 * @param src
 * @param dst
 */
var callbackFileJs = function (src, dst) {
  fs.readFile(src, 'utf8', function (error, data) {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      return false
    }
    fs.writeFile(dst, data.toString(), 'utf8', function (error) {
      if (error) {
        // eslint-disable-next-line no-console
        console.log(error)
        return false
      }
      if (dst.includes('.map')) {
        // let srcName = src.split('/')[4]
        // fs.unlink(`./dist/js/${srcName}.map`,function () { // 删除map
        // })
        // fs.unlink(`./dist/js/${srcName}`,function () { // 删除js
        // })
      } else { // JS写入成功
        callbackFileJs(dst, `${dst}.map`)
      }
    })
  })
}
// 复制目录
glob.sync('./dist/js/*.js').forEach((filepath, name) => {
  let fileNameList = filepath.split('.')
  let fileName = fileNameList[1].split('/')[3]// 多页面页面目录
  let copyName = filepath.split('/')[3]
  let changeDirectory = `./dist/${fileName}/js`// 多页面JS文件地存放址
  if (!fileName.includes('chunk-vendors')) {
    // eslint-disable-next-line
    fs.exists(changeDirectory, function (exists) {
      if (exists) {
        // console.log(`${fileName}下JS文件已经存在`)
        callbackFileJs(filepath, `${changeDirectory}/${copyName}`)
      } else {
        fs.mkdir(changeDirectory, function () {
          callbackFileJs(filepath, `${changeDirectory}/${copyName}`)
          // console.log(`${fileName}下JS文件创建成功`)
        })
      }
    })
  }
})

/**
 * css文件拷贝
 * @param src
 * @param dst
 */
var callbackFileCss = function (src, dst) {
  fs.readFile(src, 'utf8', function (error, data) {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      return false
    }
    fs.writeFile(dst, data.toString(), 'utf8', function (error) {
      if (error) {
        // eslint-disable-next-line no-console
        console.log(error)
        PromiseRejectionEvent(error)
        return false
      }
      // console.log('CSS写入成功')
      fs.unlink(src, function () { // css删除成功
      })
    })
  })
}
// 复制目录
glob.sync('./dist/css/*.css').forEach((filepath, name) => {
  let fileNameList = filepath.split('.')
  let fileName = fileNameList[1].split('/')[3]// 多页面页面目录
  let copyName = filepath.split('/')[3]
  let changeDirectory = `./dist/${fileName}/css`// 多页面JS文件地存放址
  if (!fileName.includes('chunk-vendors')) {
    /* eslint-disable-next-line */
    fs.exists(changeDirectory, function (exists) {
      if (exists) {
        // console.log(`${fileName}下CSS文件已经存在`)
        callbackFileCss(filepath, `${changeDirectory}/${copyName}`)
      } else {
        fs.mkdir(changeDirectory, function () {
          callbackFileCss(filepath, `${changeDirectory}/${copyName}`)
          //   console.log(`${fileName}下CSS文件创建成功`)
        })
      }
    })
  }
})

/**
 * html文件替换
 * @param src
 * @param dst
 */
var callbackFile = function (src, dst, name, filepath) {
  const pt = publicPath && publicPath !== '/' ? '/' + publicPath : ''
  fs.readFile(src, 'utf8', function (error, data) {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      return false
    }
    let regCss = new RegExp(pt + '/css/' + name + '', 'g')
    let regJs = new RegExp(pt + '/js/' + name + '', 'g')
    let htmlContent = data.toString().replace(regCss, `./css/${name}`).replace(regJs, `./js/${name}`)
    fs.writeFile(dst, htmlContent, 'utf8', function (error) {
      if (error) {
        // eslint-disable-next-line no-console
        console.log(error)
        return false
      }
      // console.log('html重新写入成功')
      if (src.indexOf('/index.html') === -1) {
        fs.unlink(src, function () {
          //  console.log('html删除成功')
        })
      }
      fs.unlink(filepath, function () { // css删除成功
      })
      fs.unlink(filepath + '.map', function () { // css删除成功
      })
    })
  })
}
// 复制目录
glob.sync('./dist/js/*.js').forEach((filepath, name) => {
  let fileNameList = filepath.split('.')
  let fileName = fileNameList[1].split('/')[3]// 多页面页面目录
  let thisDirectory = `./dist/${fileName}/${fileName}.html`// 多页面JS文件地存放址
  let changeDirectory = `./dist/${fileName}/index.html`// 多页面JS文件地存放址
  if (!fileName.includes('chunk-vendors')) {
    callbackFile(thisDirectory, changeDirectory, fileName, filepath)
  }
})
