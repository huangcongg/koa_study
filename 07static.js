/**
 * koa-static 静态资源中间件，静态web服务
 * 1.安装 npm install --save koa-static
 * 2.引入 const static = require('koa-static')
 * 3.配置中间件 app.use(static('static'))
 */
let Koa = require('koa'),
    router = require('koa-router')(),
    views = require('koa-views'),
    bodyparser = require('koa-bodyparser'),
    static = require('koa-static'),
    app = new Koa()

app.use(views('07views',{
  extension: 'ejs'
}))

// 配置静态web服务的中间件,http://localhost/css/basic.css,首先去static目录找，如果能找到返回对应的文件，找不到next()
// app.use(static('07static')) 
app.use(static(__dirname+'/07static')) //也可以这么写

// koa静态资源中间件可以配置多个
app.use(static(__dirname+'/07public'))

app.use(bodyparser())


router.get('/',async (ctx) => {
  await ctx.render('index')
})

// 接收post提交的数据
router.post('/doAdd', async (ctx) => {
  // 原生nodejs在koa中获取表单提交的数据
  ctx.body=ctx.request.body
})

app.use(router.routes()).use(router.allowedMethods()).listen(80)