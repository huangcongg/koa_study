const Koa = require('koa')
const router = require('koa-router')()
const app = new Koa()

// 应用级中间件，匹配路由之前做的一系列操作
// 匹配任何路由，如果不写next，这个路由被匹配到了就不会继续向下匹配
/* app.use(async (ctx) => {
  ctx.body = '这是一个中间件'
}) */

// 匹配路由之前打印日期
app.use(async (ctx, next) => {
  console.log(new Date());
  await next() //当前路由匹配完成以后继续向下匹配
})

router.get('/', async ctx => {
  ctx.body = '首页'
})

router.get('/news', async ctx => {
  ctx.body = '新闻列表页'
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(80)