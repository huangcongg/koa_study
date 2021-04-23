// es6语法复习
// 模板字符串
let name = 'zhangsan'
let age = 20
console.log(`${name}的年龄是${age}`);

// es6中属性和方法的简写
// 箭头函数 this指向上下文
// 回调函数 获取异步方法里面的数据
function getData(callback){
  // 异步
  setTimeout(function(){
    let name = '张三'
    return callback(name)
  })
}
getData((data)=>{
  console.log(data)
})

// promise来处理异步
let p = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    let name="zhangsan"
    if(Math.random()<0.5){
      resolve(name)
    }else{
      reject('error')
    }
  },1000)
})
p.then((res)=>{
  console.log(res);
}).catch(err=>{
  console.log(err);
})