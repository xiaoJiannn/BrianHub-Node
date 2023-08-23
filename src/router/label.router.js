const Koa = require("koa");
const koaRouter = require("@koa/router");
const { createLabel } = require("../controller/label-controller");
const { verifyToken } = require("../middleware/login.middleware");
const labelRouter = new koaRouter({ prefix: "/label" });
labelRouter.post("/", verifyToken, createLabel);
module.exports = labelRouter;
