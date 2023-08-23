const Koa = require("koa");
const cors = require("koa2-cors");

const app = new Koa();

const userRouter = require("../router/user_router");
const loginRouter = require("../router/login_router");
const bodyParser = require("koa-bodyparser");
const autoReg = require("../router/index");
app.use(bodyParser());
app.use(cors());
autoReg(app);
// 注册路由

module.exports = app;
