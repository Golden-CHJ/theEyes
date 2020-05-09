const router = require('koa-router')()
const Person = require('../dbs/model/person')
const Test = require('../dbs/model/test')
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'woshinidei'
})


router.post('/test',  async function (ctx, next) {
  const person = new Person({
    id:ctx.request.body.id,
    spell:ctx.request.body.spell,
    name:ctx.request.body.name
  })
  let _error
  let code
  try {
     await person.save()
    code = 0
  } catch (error) {
    console.log(error)
    code = -1
  }
  ctx.body = {
    id:ctx.request.body.id,
    name:ctx.request.body.name,
    spell:ctx.request.body.spell,
    code: code,
    _error: _error
  }
})
router.post('/data',async function (ctx, next) {
  const test = new Test({
    id:ctx.request.body.id,
    name:ctx.request.body.name
  })
  let _error
  let code
  try {
     await test.save()
    code = 0
  } catch (error) {
    console.log(error)
    code = -1
  }
  ctx.body = {
    id:ctx.request.body.id,
    name:ctx.request.body.name,
    spell:ctx.request.body.spell,
    code: code,
    _error: _error
  }
})


module.exports = router
