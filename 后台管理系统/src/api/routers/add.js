const Router = require('koa-router');

const db = require('../db/assistant');

// 创建路由
var router = new Router();


router.get('/', async (ctx, next) => {
    let { pinpai, price1, price2, hotsale, img, ku, xian, Day, interest } = ctx.query;
    // console.log(ctx.query);
    let sql = { pinpai: pinpai, price1: price1, price2: price2, hotsale: hotsale, img2: img, ku: ku, xian: xian, Day: Day, interest: interest, };
    var res = await db.insert('list', sql);
    ctx.body = res
});


module.exports = router;