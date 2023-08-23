const Koa = require("koa");
const koaRouter = require("@koa/router");
const { showAvatar, createUser } = require("../controller/user-controller");
const {
  verifyUers,
  encryptionPassword,
} = require("../middleware/user.middleware");
// 创建app对象
const app = new Koa();

const userRouter = new koaRouter({ prefix: "/user" });
userRouter.post("/", verifyUers, encryptionPassword, createUser);
userRouter.get("/avatar/:id", showAvatar);

module.exports = userRouter;
