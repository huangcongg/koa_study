/**
 * 1.npm install koa-session
 * 2.引入：const session = require('koa-session')
 * 3.
  app.keys = ['some secret hurr'];
  const CONFIG = {
    key: 'koa.sess', // (string) cookie key (default is koa.sess) 
    // (number || 'session') maxAge in ms (default is 1 days) 
    // 'session' will result in a cookie that expires when session/browser is closed 
    // Warning: If a session cookie is stolen, this cookie will never expire 
    maxAge: 86400000,
    autoCommit: true, // (boolean) automatically commit headers (default true) 
    overwrite: true, // (boolean) can overwrite or not (default true) 
    httpOnly: true, // (boolean) httpOnly or not (default true) 
    signed: true, // (boolean) signed or not (default true) 
    rolling: false, // (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) 
    renew: false, // (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)
    secure: true, // (boolean) secure cookie
    sameSite: null, // (string) session cookie sameSite options (default null, don't set it) 
  };
  app.use(session(CONFIG, app));
  4.设置session
  ctx.session.username = '张三'; 
  获取session
  ctx.session.username
 */
 let Koa = require('koa'),
 router = require('koa-router')(),
 render = require('koa-art-template'),
 path = require('path'),
 session = require('koa-session'),
 app = new Koa()

//  配置koa-art-template模板引擎
render(app, {
  root: path.join(__dirname, '09views'), // 视图的位置
  extname: '.html', // 后缀名
  debug: process.env.NODE_ENV !== 'production' // 是否开启调试模式
})

// 配置session的中间件
app.keys = ['some secret hurr']; // cookie的签名
const CONFIG = {
  key: 'koa.sess', // (string) cookie key (default is koa.sess) 默认不用改
  // (number || 'session') maxAge in ms (default is 1 days) 
  // 'session' will result in a cookie that expires when session/browser is closed 
  // Warning: If a session cookie is stolen, this cookie will never expire 
  maxAge: 86400000, // session的过期事件，【需要修改】
  autoCommit: true, // (boolean) automatically commit headers (default true)  
  overwrite: true, // (boolean) can overwrite or not (default true) 没有效果，默认
  httpOnly: true, // (boolean) httpOnly or not (default true) true表示只有服务器端可以该session
  signed: true, // (boolean) signed or not (default true)  默认
  // 设置为true表示每次访问服务器都重新设置session，到期时间也每次重新计算
  rolling: false, // (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) 
  // 当session快要到期的时候，重新设置
  renew: false, // (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)，【需要修改】
  secure: false, // (boolean) secure cookie
  sameSite: null, // (string) session cookie sameSite options (default null, don't set it) 
};
app.use(session(CONFIG, app));

router.get('/',async (ctx) => {

  // 获取session
  console.log(ctx.session.userinfo);
  const list = {
    name:'koa'
  }
  await ctx.render('index',{
    list
  })
})

router.get('/login', async (ctx) => {

  // 设置session
  ctx.session.userinfo = '张三'
  ctx.body = '登录成功'
})

app.use(router.routes()).use(router.allowedMethods()).listen(80)