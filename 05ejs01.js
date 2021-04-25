/**
 * 1 npm install --save koa-views
 * 2 npm install --save ejs
 * 3 app.use(views(_dirname, {extension: 'ejs'}))
 * 4 await ctx.render('index')
 * ejs模板引擎的使用
 * 公共的数据放在这个里面，这样的话在模板的任何地方都可以使用
 * ctx.state = { // 放在中间件里面
    session: this.session,
    title: 'app'
  };

 */

const Koa = require('koa')
const router = require('koa-router')()
const views = require('koa-views')

const app = new Koa()
// app.use(views('views',{ map:{ html: 'ejs' } })) // 这样配置也可以, 如果是这样配置，模板的后缀名是.html
app.use(views('05views', {extension: 'ejs'})) 

// 写一个中间件来配置公共的信息
app.use(async (ctx, next) => {
  ctx.state.userinfo = '张三'
  await next() //继续向下匹配路由
})

/**
 * 公共信息的引入跟视频教程里的不太一样
 * <%-include('public/header.ejs')%>
 * NOTE: Include preprocessor directives (<% include user/show %>) are not supported in v3.0+.
 */

router.get('/',async ctx => {
  await ctx.render('index')
})

router.get('/news', async ctx => {
  // let title = '这是一个新闻'
  const list = ['aaa', 'bbb', 'ccc']
  const content = '<h2>这是一个h2</h2>'
  let num = 25
  await ctx.render('news',{
    list,
    content,
    num
  })
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(80)