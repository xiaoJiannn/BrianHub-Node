const Koa = require("koa");
const koaRouter = require("@koa/router");

const { verifyToken } = require("../middleware/login.middleware");
const { handleAvatar } = require("../middleware/files.middleware");
const { createAvatar } = require("../controller/file-controlller");

const filesRouter = new koaRouter({ prefix: "/upload" });

filesRouter.post("/avatar", verifyToken, handleAvatar, createAvatar);

module.exports = filesRouter;
