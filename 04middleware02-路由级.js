const Koa = require('koa')
const router = require('koa-router')()
const app = new Koa()

router.get('/', async ctx => {
  ctx.body = '首页'
})

// 匹配到news路由以后继续向下匹配路由
router.get('/news', async (ctx, next) => {
  console.log('这是一个新闻');
  await next()
})
router.get('/news', async ctx => {
  ctx.body = '新闻列表页'
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(80)