/**
 * https://www.npmjs.com/package/koa-router
 * 
 * 1.安装模块
 * 2.看文档使用
 */
let Koa = require('koa')
let router = require('koa-router')() // 引入实例化路由 推荐这种方式
let app = new Koa()

router.get('/', async (ctx) => {
  ctx.body = '首页'
})
router.get('/news', async (ctx) => {
  ctx.body = '新闻页面'
})
router.get('/newscontent', async (ctx) => {
  ctx.body = '新闻详情页'
})

// 启动路由
app.use(router.routes()).use(router.allowedMethods)

app.listen(3002)

