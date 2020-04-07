const fs = require('fs')
const path = require('path');
 const  loadModel  = require ('../mobilenet/web_model/model.json')
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

// router.post('/uploadfile', async (ctx, next) => {
//   console.log("uploadfile请求文件"+ctx.request.body)
//   ctx.body ={
//     key:'aa'
//   }
// })

// /*好好分析 4.4 */
// router.post('/uploadfile', async (ctx, next) => {
//   // 上传单个文件
//   const file = ctx.request.files.file; // 获取上传文件
//   loadModel(file)
//   // 创建可读流
//   const reader = fs.createReadStream(file.path);
//   let filePath = path.join(__dirname, '../data') + `/${file.name}`;
//   // 创建可写流
//   const upStream = fs.createWriteStream(filePath);
//   // 可读流通过管道写入可写流
//   reader.pipe(upStream);
//   return ctx.body = "上传成功！";
// });

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
