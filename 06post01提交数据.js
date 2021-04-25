let Koa = require('koa'),
    router = require('koa-router')(),
    views = require('koa-views'),
    common = require('./06module/common.js'),
    app = new Koa()


app.use(views('06views',{
  extension: 'ejs'
}))

router.get('/',async (ctx) => {
  await ctx.render('index')
})

// 接收post提交的数据
router.post('/doAdd', async (ctx) => {
  // 原生nodejs在koa中获取表单提交的数据
  let data = await common.getPostData(ctx)
  console.log(data);
  ctx.body=data
})

app.use(router.routes()).use(router.allowedMethods()).listen(80)