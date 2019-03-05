const Router = require('koa-router');
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const db = require('../db/assistant');

// 创建路由
var router = new Router();

router.get('/', async (ctx, next) => {
    let { page, limit } = ctx.query;
    var pa = page * 1;//字符串转成数字
    let lim = limit * 1;
    if (pa == 1) {
        pa = 0;
    }
    else {
        pa = (pa - 1) * 10;
    }
    let res = await db.find('list', { pa, lim });
    let res2 = await db.find('list', {});
    ctx.body = res
    let ti = {
        code: 0,
        data: res,
        count: res2.length
    }
    ctx.body = ti
});

router.get('/:del', async (ctx, next) => {
    let { id } = ctx.query;
    // console.log(id);
    // let data_id = id * 1; //转成数字
    let sql = { _id: ObjectId(id) };
    let res = await db.delete('list', sql);
    ctx.body = res
});

router.get('/:x/:xi', async (ctx, next) => {
    let { id, xi } = ctx.query;
    let sql = { xian: xi }
    let res = await db.update('list', { id, sql });
    ctx.body = res
});




module.exports = router;