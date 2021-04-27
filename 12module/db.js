// Db库
let MongoClient = require('mongodb').MongoClient
let Config = require('./config.js')
let ObjectID = require('mongodb').ObjectID

class Db {

  static getInstance () { // 单例 解决多次实例化实例不共享的问题
    if(!Db.instance){
      Db.instance = new Db()
    }
    return Db.instance
  }

  constructor () {
    this.dbClient = '' // 属性，放db对象
    this.connect()
  }

  // 连接数据库
  connect () {
    let _that = this
    return new Promise( (resolve, reject) => {

      if(!_that.dbClient){ // 解决数据库多次连接的问题
        let client = new MongoClient(Config.dbUrl,{ useUnifiedTopology: true });
        this._client = client
        client.connect((err) => {
          if(err){
            reject(err)
          }else{
            _that.dbClient = client.db(Config.dbName)
            resolve(_that.dbClient)  
          }
        })
      }else{
        resolve(_that.dbClient)
      }
      
    })
  }

  find (collectionName, json) {
    return new Promise( (resolve, reject) => {
      this.connect().then(function (db) {
        var result  = db.collection(collectionName).find(json)
        result.toArray(function (err, docs) {
          
          if(err){
            reject(err)
          }else{
            resolve(docs);
          }
        })
      })
    })
  }
  update (collectionName, json1, json2) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).updateOne(json1, {
          $set: json2
        }, (err, result) => {
          if(err){
            reject(err)
          }else{
            resolve(result)
          }
        })
      })
    })
  }
  insert (collectionName, json) {
    return new Promise((resolve, reject) => {

      this.connect().then(db => {
        db.collection(collectionName).insertOne(json, function (err, result) {
          if(err){
            reject(err)
          }else{
            resolve(result)
          }
        })
      })

    })
  }
  remove (collectionName, json) {
    return new Promise((resolve, reject) => {

      this.connect().then(db => {
        db.collection(collectionName).removeOne(json, function (err, result) {
          if(err){
            reject(err)
          }else{
            resolve(result)
          }
        })
      })

    })
  }
  getObjectID(id){ // mongodb里面查询_id把字符串转换成对象
    return new ObjectID(id)
  }
}

module.exports = Db.getInstance()
