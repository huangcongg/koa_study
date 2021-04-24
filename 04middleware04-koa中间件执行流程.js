const Koa = require('koa')
const router = require('koa-router')()
const app = new Koa()

app.use(async (ctx, next) => {
  console.log('1、这是一个中间件01');
  await next()
  console.log('5、匹配完了路由之后又返回来执行中间件');
})

app.use(async (ctx, next) => {
  console.log('2、这是一个中间件02');
  await next()
  console.log('4、匹配完了路由之后又返回来执行中间件');
})

router.get('/', async ctx => {
  ctx.body = '这是首页'
})

router.get('/news', async ctx => {
  ctx.body = '这是新闻页'
  console.log('3、匹配到了news这个路由');
})


app.use(router.routes())
app.use(router.allowedMethods())
app.listen(80)