const Koa = require('koa')
const router = require('koa-router')()
const app = new Koa()

router.get('/', async ctx => {
  ctx.body = '这是首页'
})

router.get('/news', async ctx => {
  ctx.body = '这是新闻页'
})

// 无论中间件放在路由的前面还是后面，都是先执行中间件再执行路由
app.use((ctx, next) => {
  console.log('这是一个中间件01');
  next()

  if(ctx.status == 404){ // 如果页面找不到
    ctx.status = 404
    ctx.body = '这是一个404页面'
  }else{
    console.log(ctx.url)
  }
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(80)