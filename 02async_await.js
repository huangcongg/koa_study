// 普通方法
/* function getData(){
  return '这是一个数据'
}
console.log(getData()) //这是一个数据
 */

// async 是让普通方法变异步方法
/* async function getData(){
  return '这是一个数据'
}
console.log(getData()) //Promise { '这是一个数据' }
 */

// promise的处理方法
/* async function getData(){
  return '这是一个数据'
}
getData().then(res=>{
  console.log(res);
}) */

// 错误的await用法
/* async function getData(){
  return '这是一个数据'
}
const d = await getData()
console.log(d); */

// 正确的await用法，await必须用在异步方法里面
/* async function getData(){
  return '这是一个数据'
}
async function d(){
  const d = await getData()
  console.log(d);
}
d() */

// await 阻塞的功能，把异步改成一个同步
/* async function getData(){
  console.log(2);
  return '这是一个数据'
}
async function d(){
  console.log(1);
  const d = await getData()
  console.log(d);
  console.log(3);
}
d() */

// 普通函数返回promise对象
/* function getData(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      var username = '张三'
      resolve(username)
    },1000)
  })
}
var p = getData()
p.then(function(d){
  console.log(d);
}) */

// await用于返回promise的普通函数
function getData(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      var username = '张三'
      resolve(username)
    },1000)
  })
}
async function test(){
  let data = await getData()
  console.log(data);
}
test()