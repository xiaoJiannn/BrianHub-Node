const Koa = require("koa");
const koaRouter = require("@koa/router");
const login = require("../controller/login-controller");
const { verifyLogin, verifyToken } = require("../middleware/login.middleware");
const loginRouter = new koaRouter({ prefix: "/login" });

loginRouter.post("/", verifyLogin, login.loginVerifyPassPanel);
loginRouter.get("/test", verifyToken, login.isAuthorization);

module.exports = loginRouter;
