// 引入koa
const koa = require('koa')
const app = new koa()

// 配置中间件（可以先当作路由）
app.use((ctx)=>{
  ctx.body = 'hello koa2111333111'
})


// 监听端口
app.listen(3000)