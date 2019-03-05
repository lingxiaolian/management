
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');

// 创建路由
var router = new Router();

// 引入页面路由
const registryRouter = require('./list');
const dactRouter = require('./add');
const redactRouter = require('./redact');
const sortRouter = require('./sort');
const loginRouter = require('./login');
const order=require('./order_list');
const tokenverifyRouter = require('./tokenverify');

router.use(koaBody({
    // 支持formdata
    multipart: true,

    // 文件支持
    formidable: {
        // 指定保存路径
        uploadDir: './uploads',
        keepExtensions: true,
        // 改文件名
        onFileBegin(filename, file) {
            // filename: 上传文件的原始名
            // file:文件信息对象
            //   * path:

            // file.path = './uploads/'+filename
        }
    }
}));

router.use('/list', registryRouter.routes());
router.use('/add', dactRouter.routes());
router.use('/redact', redactRouter.routes());
router.use('/sort', sortRouter.routes());
router.use('/login',loginRouter.routes());
router.use('/order_list',order.routes());
router.use('/tokenverify',tokenverifyRouter.routes());

module.exports = router;