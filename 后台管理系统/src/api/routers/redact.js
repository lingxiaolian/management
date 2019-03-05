const Router = require('koa-router');
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const db = require('../db/assistant');

// 创建路由
var router = new Router();


router.get('/', async (ctx, next) => {
    let { id, pinpai, price1, price2, hotsale, img, ku, xian, interest, Day } = ctx.query;
    if (ctx.query.pinpai == undefined) {
        let sql = { _id: ObjectId(id) };
        var res = await db.find('list', sql);

    } else {
        let _price1 = price1 * 1;
        let _price2 = price2 * 2;
        let _ku = ku * 1;
        let sql = { pinpai: pinpai, price1: _price1, price2: _price2, ku: _ku, xian: xian, img2: img, hotsale: hotsale, interest: interest, Day: Day }
        var res = await db.update('list', { id, sql });
    }
    ctx.body = res
});


module.exports = router;