/**
 * 数据库操作：CRUD
 * 1. 增
 * 2. 删
 * 3. 改
 * 4. 查
 */
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const database_url = 'mongodb://localhost:27017';
const database_name = 'guestbook';
async function connect() {
    let client = await MongoClient.connect(database_url, { useNewUrlParser: true });
    let db = client.db(database_name);
    return { db, client };
}

exports.insert = async (colName, data) => {
    let { db, client } = await connect();
    // console.log('client',client)
    // console.log('db',db)
    let collection = db.collection(colName);
    let res = await collection[Array.isArray(data) ? 'insertMany' : 'insertOne'](data);
    client.close();
    return res;
}

exports.delete = async (colName, query) => {
    let { db, client } = await connect();
    let collection = db.collection(colName);
    let res = await collection['deleteMany'](query);
    client.close();
    return res;
}

exports.update = async (colName, que1,que2) => {
    let { db, client } = await connect();
    let collection = db.collection(colName);
    //var id,up;
    let res = await collection['updateMany'](que1,que2);
  // console.log(query);
   console.log(que1,que2);
  // {"onumber" : "001"},  
  // { $set: { "cname " : "zcy"} },  
    client.close();
    return res;
}

exports.find = async (colName, query) => {
    let { db, client } = await connect();
    let collection = db.collection(colName);
    let res = await collection.find(query).toArray();
    client.close();
    // 返回查询结果
    return res;
}

// insert('user',[{name:'xxx',age:20},{name:'xx2',age:18}]);
// delete('user',{age:{$lt:18}});
//更新指定字段
//查找name属性为tiantian的数据，并更新age属性为27
// db.user.updateOne({ods},{$set:{ods:27}})
