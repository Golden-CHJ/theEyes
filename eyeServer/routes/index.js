const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/data', async (ctx, next) => {
  ctx.body = {
    classification:"干垃圾",
    pic:"//csdnimg.cn/cdn/content-toolbar/csdn-logo_.png?v=20190924.1",
    similar:["电池","塑料","我","chj","臭衣服"],
    news:"干垃圾即其它垃圾，指除可回收物、有害垃圾、厨余垃圾（湿垃圾）以外的其它生活废弃物。干垃圾是对垃圾按照可回收垃圾、厨余垃圾、有害垃圾分类后剩余下来的一种垃圾。生活垃圾的具体分类标准可根据经济社会发展水平、生活垃圾特性和处置利用需要予以调整。"
  }
})

module.exports = router
