let Koa = require('koa')
let Router = require('koa-router')

let app = new Koa()
let router = new Router()

// ctx context 上下文，包含了request和response等信息
// 配置路由
router.get('/',async (ctx) => {
  ctx.body = '首页' // 返回数据 相当于原生里面的res.writeHead() res.end()
}).get('/news', async (ctx) => {
  ctx.body = '这是一个新闻页面'
})

// 启动路由
app
  .use(router.routes()) // 启动路由
  .use(router.allowedMethods()) // 可以配置也可以不配置，建议配置；这是官方推荐用法，用在路由匹配router.routes()之后，所以在当所有路由中间件最后调用，此时根据ctx.status设置response响应头

app.listen(3000)
