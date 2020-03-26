const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/data', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
