

/*---------- START ----------*/
/********** DO NOT MODIFY **********/
/**
 * 将值插入数组中
 * @param path // module.exports下的路径
 * @param value // 需要push到数组的值或者对象
 */
function pushArr(path, value) {
  var pathArr = path.split('.'),
    len = pathArr.length,
    str = 'module.exports';
  for (var i = 0; i < len; i++ ) {
    str += '.'+pathArr[i];
    if(eval(str) == undefined){
      eval(str + '= {}')
      if(i == len-1) {
        eval(str + '= []')
      }
    }
  }
  eval(str).push(value)
}

/**
 * 将值插入map对象中
 * @param path // module.exports下的路径
 * @param key // 键值对的名称 如果不需要可不填 value的值将直接赋给path 此时value的值类型必须为 boolean String Number
 * @param value // 键值对的值
 */
function pushMap(path, key, value) {
  var pathMap = path.split('.'),
    len = pathMap.length,
    str = 'module.exports';
  for (var i = 0; i < len; i++ ) {
    str += '.'+pathMap[i];
    if(eval(str) == undefined){
      eval(str + '= {}')
    }
  }
  if(key) {
    eval(str)[key] = value
  } else {
    eval(str + '=' + value)
  }
}
// 为JS和Vue文件定制babel配置。https://nuxtjs.org/api/configuration-build/#analyze
pushMap('build.babel', 'presets', ['es2015', 'stage-2'])
pushMap('build.babel', 'plugins', ['transform-async-to-generator', 'transform-runtime'])
pushMap('build.babel', 'comments', true)

// 打包公共模块添加
pushArr('build.vendor', 'swiper')
pushArr('build.vendor', 'qs')

// 插入css自动补全
pushArr('build.postcss', require('postcss-nested')())
pushArr('build.postcss', require('postcss-responsive-type')())
pushArr('build.postcss', require('postcss-hexrgba')())
pushArr('build.postcss', require('autoprefixer')({browsers: ['last 3 versions']}))

// 设置缓存组件数量及时间
pushMap('cache', 'max', 10)
pushMap('cache', 'maxAge', 1000 * 60 * 10)

// 设置全局css
pushArr('css', { src: '~/assets/scss/app.scss', lang: 'scss' })

// 设置开发环境判断值
pushMap('dev', '', (process.env.NODE_ENV !== 'production'))

// 设置生产环境变量
pushMap('env', 'baseUrl', `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`)

// 开启离线应用
pushMap('offline', '', true)

// 添加插件
// 1.添加全局过滤器
pushArr('plugins', { src: '~/plugins/filters.js' })
// 2.添加google统计
pushArr('plugins', { src: '~/plugins/ga.js', ssr: false })
// 3.添加复制事件后插入版权声明
pushArr('plugins', { src: '~/plugins/copy-right.js', ssr: false })
// 4.添加百度seo自动push脚本
pushArr('plugins', { src: '~/plugins/baidu-seo-push.js', ssr: false })
// 5.添加开启离线应用
pushArr('plugins', { src: '~/plugins/offline.js', ssr: false })
// 6.添加swiper组件
pushArr('plugins', { src: '~/plugins/swiper.js', ssr: false })
// 添加路由中间件
pushArr('router.middleware', 'ssr-cookie')

/********** DO NOT MODIFY **********/
/*---------- END ----------*/