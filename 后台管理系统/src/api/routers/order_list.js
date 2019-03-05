const Router = require('koa-router');
const db = require('../db/index_order');
// 创建路由
var router = new Router();
/**
 * ctx
 */
router.post('/', async (ctx, next) => {
    var res = await db.find('goods');
    if (res) {
        let { vale, id, ID } = ctx.request.body;
        console.log(vale, id, ID);
        let res1 = await db.update('goods', { "id": id * 1 }, { $set: { "ods": vale } });
        let del = await db.delete('goods', { "id": ID * 1 });
        let res23 = await db.find('goods');
        ctx.body = {
            arr: res,
            are: res23
        }
    } else {
        ctx.body = {
            code: 100,
            msg: 'fail'
        }
    }
});
module.exports = router;