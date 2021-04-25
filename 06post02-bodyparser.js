/**
 * koa中koa-bodyparser中间件获取表单提交的数据
 * 1.安装 npm install --save koa-bodyparser
 * 2.引入 let bodyParser = require('koa-bodyparser')
 * 3.app.use(bodyParser()) 
 * 4.ctx.request.body 
 */
let Koa = require('koa'),
    router = require('koa-router')(),
    views = require('koa-views'),
    bodyparser = require('koa-bodyparser')
    app = new Koa()


app.use(views('06views',{
  extension: 'ejs'
}))
app.use(bodyParser())

router.get('/',async (ctx) => {
  await ctx.render('index')
})

// 接收post提交的数据
router.post('/doAdd', async (ctx) => {
  // 原生nodejs在koa中获取表单提交的数据
  ctx.body=ctx.request.body
})

app.use(router.routes()).use(router.allowedMethods()).listen(80)