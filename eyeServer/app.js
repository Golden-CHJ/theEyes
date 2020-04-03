const Koa = require('koa')
const app = new Koa()
var cors = require('koa2-cors');
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')



const index = require('./routes/index')
const users = require('./routes/users')
const koaBody = require('koa-body');
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(cors());
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

/**处理图片 */
// app.use(async(ctx)=>{
//   //当请求时GET请求时，显示表单让用户填写
//   if(ctx.url==='/detail' && ctx.method === 'GET'){
//       let html =`
//           该页面无法get
//       `
//       ctx.body =html
//       //当请求时POST请求时
//   }else if(ctx.url==='/detail' && ctx.method === 'POST'){
//       ctx.body='接收到请求'
//   }else{
//       //其它请求显示404页面
//       ctx.body='<h1>404!</h1>'
//   }
// })
module.exports = app
