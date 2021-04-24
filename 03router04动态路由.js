const Koa = require('koa')
const router = require('koa-router')()

// 实例化koa对象
const app = new Koa()

// 首页
router.get('/', async ctx => {
  ctx.body = '首页'
})

// 新闻列表页
router.get('/news', async ctx => {
  ctx.body = '新闻列表页'
})

// 新闻内容页 动态路由 http://localhost/newscontent/2
router.get('/newscontent/:aid', async ctx => {
  // 获取动态路由的传值
  console.log(ctx.params)
  ctx.body = '新闻内容页'
})

// 动态路由也可以传入多个值 http://localhost/package/2/3
router.get('/package/:aid/:cid', async ctx => {
  console.log(ctx.params)
  ctx.body = '多个值动态路由' //{ aid: '2', cid: '3' }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(80)
