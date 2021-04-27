/**
 * 单例模式的定义：无论类实例化多少次，构造函数只执行一次
 */

class Db {
  static getInstance () { // 单例
    if(!Db.instance) {
      Db.instance = new Db();
    }
    return Db.instance;
  }
  constructor () {
    console.log('构造函数里面的方法');
    this.connect();
  }
  // 连接数据库
  connect () {
    console.log('连接数据库');
  }
  // 查找数据
  find () {
    console.log('查找数据库的方法');
  }
}
var p1 = Db.getInstance();
var p2 = Db.getInstance();
p1.find();
p2.find();
