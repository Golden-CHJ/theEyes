const fs = require('fs')
const path = require('path')
const router = require('koa-router')()
const Person = require('../dbs/model/person.js')
const Rubbish = require('../dbs/model/rubbish.js')
const Rubbishes = require('../dbs/model/rubbishes.js')
const Detail = require('../dbs/model/detail.js')
router.get('/getRubbish',async function(ctx) {
  const results = await Rubbish.find()
  ctx.body = {
    results
  }
})

router.get('/getDetail',async function(ctx) {
  const results = await Detail.find()
  ctx.body = {
    results
  }
})


/*bug: 1 404not post无request参数
        2 run start 不行 只能用run dev
         */
router.post('/postDetail',async function(ctx) {
  const detail = new Detail({
   id:ctx.request.body.id,
   data:ctx.request.body.data
  })
  let _error
  let code
  try {
     await detail.save()
    code = 0
  } catch (error) {
    console.log(error)
    code = -1
  }
  ctx.body = {
    ru:ctx.request.body.id,
    de:ctx.request.body.data,
    code: code,
    _error: _error
  }
})

router.post('/getDetail',async function(ctx) {
  const results = await Detail.where({
    id:ctx.request.body.id
  })
  console.log(ctx.request.body.id)
  ctx.body = {
    results
  }
})

router.post('/postRubbish',async function(ctx) {
  const rubbish = new Rubbish({
    rubbish_classify: ctx.request.body.c,
    detail:ctx.request.body.d
  })
  let _error
  let code
  try {
     await rubbish.save()
    code = 0
  } catch (error) {
    console.log(error)
    code = -1
  }
  ctx.body = {
    ru:ctx.request.body.c,
    de:ctx.request.body.d,
    code: code,
    _error: _error
  }
})

router.get('/getRubbishes',async function(ctx) {
  const results = await Rubbishes.find()
  ctx.body = {
    results
  }
})



router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 211'
  })
})

router.post('/upload', async (ctx, next) => {
 ctx.body ={
   title: "¿"
 }
  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  file.name = ctx.request.body.class + "_" + Math.random().toFixed(5)*100000 + ".jpg"
  // console.log(ctx.request.body.class)
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  let filePath = path.join(__dirname, '../data') + `/${file.name}`;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  return ctx.body = "上传成功！";


})
router.post('/detail', async (ctx, next) => {
  console.log("请求文件"+ctx.request.body)
  ctx.body = {
    classification:"干垃圾",
    pic:"//csdnimg.cn/cdn/content-toolbar/csdn-logo_.png?v=20190924.1",
    similar:["电池","塑料","我","chj","臭衣服"],
    news:"干垃圾即其它垃圾，指除可回收物、有害垃圾、厨余垃圾（湿垃圾）以外的其它生活废弃物。干垃圾是对垃圾按照可回收垃圾、厨余垃圾、有害垃圾分类后剩余下来的一种垃圾。生活垃圾的具体分类标准可根据经济社会发展水平、生活垃圾特性和处置利用需要予以调整。",
    callback:ctx.request.body
  }
})

module.exports = router
