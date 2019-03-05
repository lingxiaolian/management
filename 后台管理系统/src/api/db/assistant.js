/**
 * 数据库操作：CRUD
 * 1. 增
 * 2. 删
 * 3. 改
 * 4. 查
 */
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const MongoClient = mongodb.MongoClient;
const database_url = 'mongodb://localhost:27017';
const database_name = 'guestbook';

async function connect() {
    let client = await MongoClient.connect(database_url, { useNewUrlParser: true });
    let db = client.db(database_name);
    return { db, client }
}


exports.insert = async (colName, data) => {

    let { db, client } = await connect();

    let collection = db.collection(colName);
    let res = await collection[Array.isArray(data) ? 'insertMany' : 'insertOne'](data);

    client.close();

    return res;
}

exports.delete = async (colName, query) => {

    let { db, client } = await connect();

    console.log(query._id);
    let collection = db.collection(colName);
    let res = await collection['deleteMany'](query);

    client.close();

    return res;
}

exports.update = async (colName, query) => {

    let { db, client } = await connect();

    let collection = db.collection(colName);
    var res = await collection['updateMany']({ _id: ObjectId(query.id) }, { $set: query.sql });

    client.close();

    return res;
}

exports.find = async (colName, query) => {
    // console.log(pa);
    let { db, client } = await connect();
    let collection = db.collection(colName);  //查询的表

    let res = await collection.find();  //查询条件
    let id = query._id;
    var num;
    if (query.lim) {
        num = await res.skip(query.pa).limit(query.lim).toArray(); //查询对应条数
    }
    else if (query._id) {
        num = await collection.find({ _id: id }).toArray(); //通过id查询对应的数据
    }
    else {
        num = await collection.find().toArray(); //查询总数量
    }
    // console.log(sum);
    client.close();
    // 返回查询结果
    return num;
}

// insert('user',[{name:'xxx',age:20},{name:'xx2',age:18}]);
// delete('user',{age:{$lt:18}});
