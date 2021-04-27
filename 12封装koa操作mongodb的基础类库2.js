const { Db } = require('mongodb')

let Koa = require('koa'),
    router = require('koa-router')(),
    render = require('koa-art-template'),
    path = require('path'),
    DB = require('./12module/db.js'),
    bodyParser = require('koa-bodyparser')

let app = new Koa()

// 配置post提交数据的中间件
app.use(bodyParser())

render(app, {
  root: path.join(__dirname, '12views'), // 视图的位置
  extname: '.html', // 后缀名
  debug: process.env.NODE_ENV !== 'production' // 是否开启调式模式
})
router.get('/', async ctx => {

  let list = await DB.find('user', {})

  await ctx.render('index', {
    list
  })
})

router.get('/news', async ctx => {
  console.time('start')
  let result = await DB.find('user', {})
  console.timeEnd('start')

  ctx.body = 'news'
})

// 增加学员
router.get('/add', async ctx => {
  await ctx.render('add')
})

// 执行增加学员的操作
router.post('/doAdd', async ctx => {
  // 获取表单提交的数据
  let data = await  DB.insert('user', ctx.request.body)
  try{
    if(data.result.ok){
      ctx.redirect('/')
    }
  }catch(err){
    console.log(err);
    ctx.redirect('/add')
  }
})

// 编辑学员
router.get('/edit', async ctx => {

  // 获取用户信息
  let id = ctx.query.id
  let data = await DB.find('user', {"_id": DB.getObjectID(id)})
  await ctx.render('edit', {
    data:data[0]
  })
})

router.post('/doEdit', async ctx => {
  let id = ctx.request.body.id
  let username = ctx.request.body.username
  let age = ctx.request.body.age
  let sex = ctx.request.body.sex
  let  data = await DB.update('user', {"_id": DB.getObjectID(id)}, {
    username, age, sex
  })
  try{
    if(data.result.ok){
      ctx.redirect('/')
    }
  }catch(err){
    console.log(err);
    ctx.redirect('/edit?id='+id)
  }
})

router.get('/delete', async ctx => {
  let id = ctx.query.id

  let result = await DB.remove('user', {"_id": DB.getObjectID(id)})
  
  if(result){
    ctx.redirect('/')
  }
})
app.use(router.routes()).use(router.allowedMethods()).listen(80)