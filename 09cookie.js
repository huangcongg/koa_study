/**
 * 1.cookie保存在浏览器客户端
 * 2.cookie是存储于访问者的计算机中的变量。可以让我们用同一个浏览器访问同一个域名的时候共享数据
 * 
 * 1.保存用户信息
 * 2.浏览器历史记录
 * 3.猜你喜欢的功能
 * 4.10天免登陆的功能
 * 5.多个页面之间的数据传递
 * 6.cookie实现购物车功能
 * ctx.cookies.set()
 * ctx.cookies.get(key,value,{options})
 * options：
 * maxAge:表示从Date.now()得到的毫秒数
 * expires:cookie过期的date
 * path:cookie路径，默认是'/'
 * domain:cookie域名
 * secure:暗转cookie，默认false，设置成true表示只有https可以访问
 * httpOnly：是否只是服务器可访问cookie，默认是true
 * overwrite：表示是否覆盖以前设置的同名的cookie（默认是false）。
 */
 let Koa = require('koa'),
 router = require('koa-router')(),
 render = require('koa-art-template'),
 path = require('path'),
 app = new Koa()

//  配置koa-art-template模板引擎
render(app, {
  root: path.join(__dirname, '09views'), // 视图的位置
  extname: '.html', // 后缀名
  debug: process.env.NODE_ENV !== 'production' // 是否开启调试模式
})

router.get('/',async (ctx) => {

  // 正常就这样配置就可以使用了
  /* ctx.cookies.set('userinfo', 'zhangsan', {
    maxAge: 60*1000*60
  }) */

  /**
   * koa中没法直接设置中文的cookie
   */
  let userinfo = new Buffer.from('张三').toString('base64')
  console.log(userinfo);

  ctx.cookies.set('userinfo', userinfo, {
    maxAge: 60*1000*60,
    path: '/', // 配置可以访问的页面路径
    // domain: '.baidu.com' // 正常情况下不要设置，默认就是当前域下面的所有页面都可以访问
    /**
     * a.baidu.com
     * b.baidu.com
     * 共享cookie的数据
     */
    secure: false, //默认为false，如果为true，表示只有https协议可以使用 
    httpOnly: false, // true表示这个cookie只有服务器端可以访问，false表示客户端(js)和服务器端都可以访问
    overwrite: false
  })
   
  const list = {
    name:'koa'
  }
  await ctx.render('index',{
    list
  })
})

router.get('/news', async (ctx) => {
  let userinfo = ctx.cookies.get('userinfo')
  console.log(userinfo);
  userinfo = new Buffer.from(userinfo,'base64').toString()
  console.log(userinfo);
  ctx.body = '新闻'+userinfo
  // await ctx.render('news')
})

router.get('/shop', async (ctx) => {
  let userinfo = ctx.cookies.get('userinfo')
  ctx.body = '这是商品页面'+userinfo
})

app.use(router.routes()).use(router.allowedMethods()).listen(80)