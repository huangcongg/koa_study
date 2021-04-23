// 普通方法
/* function getData(){
  return '这是一个数据'
}
console.log(getData()) //这是一个数据
 */

// async 是让普通方法变异步方法
async function getData(){
  return '这是一个数据'
}
console.log(getData()) //Promise { '这是一个数据' }
