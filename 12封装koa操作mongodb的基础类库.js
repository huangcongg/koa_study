/**
 * 1.安装mongodb、
 * cnpm install mongodb --save
 * 2.引入mongodb下面的MongoClient
 * var MongoClient = require('mongodb').MongoClient;
 * 3.定义数据库连接的地址，以及配置数据库
 * koa数据库的名称
 * var url = 'mongodb://localhost:27017/',
 * var dbName = 'koa'
 * 4.nodejs连接数据库
 * MongoClient.connect(url, function(err, client){
 *  const db = clienet.db(dbName); //数据库db对象 
 * })
 * 5.操作数据库
 * db.user.insert
 * MongoClient.connect(url, function (err, db) {
 *    db.collection('user').insertOne({'name':'张三'}, function (err, result) {
 *      db.close() //关闭连接
 *    })
 * })
 */

 const MongoClient = require('mongodb').MongoClient;
 const assert = require('assert');
 
 // Connection URL
 const url = 'mongodb://localhost:27017';
 
 // Database Name
 const dbName = 'koa';
 
 // Create a new MongoClient
 const client = new MongoClient(url);
 
 // Use connect method to connect to the Server
 /* console.time('start')
 client.connect(function(err) {
   assert.equal(null, err);
   console.log("Connected successfully to server");
 
   const db = client.db(dbName); 
   console.timeEnd('start');

   db.collection('user').insertOne({'username':'wangwu','age':25,'sex':'男','status':'1'},function (err,result) {
     if(!err){
       console.log('增加数据成功');
       client.close();
     }
   })
 }); */

console.time('start')
client.connect(function(err) {

  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName); 

  // 查询数据
  db.collection('user').find({}).toArray((err, docs) => {
    console.log(docs);
    console.timeEnd('start');
    client.close();
  })

});
 