/**
 * 1.安装，https://aui.github.io/art-template/zh-cn/docs/installation.html
 * npm install --save art-template
 * npm install --save koa-art-template
 * 2.const render = require('koa-art-template')
 * 3.
 * render(app, {
  root: path.join(__dirname, 'view'), // 视图的位置
  extname: '.art', // 后缀名
  debug: process.env.NODE_ENV !== 'production' // 是否开启调试模式
});
4.await ctx.render('user');
 */
 let Koa = require('koa'),
 router = require('koa-router')(),
 render = require('koa-art-template'),
 path = require('path'),
 app = new Koa()

//  配置koa-art-template模板引擎
render(app, {
  root: path.join(__dirname, '08views'), // 视图的位置
  extname: '.html', // 后缀名
  debug: process.env.NODE_ENV !== 'production' // 是否开启调试模式
})

router.get('/',async (ctx) => {
  const list = {
    value:'koa',
    value2:'<a>111</a>',
    v1:10,
    target:[1,2,3,4]
  }
  await ctx.render('index',{
    list
  })
})

router.get('/news', async (ctx) => {
  ctx.body = '新闻'
  await ctx.render('news')
})

app.use(router.routes()).use(router.allowedMethods()).listen(80)