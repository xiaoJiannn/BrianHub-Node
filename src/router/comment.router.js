const Koa = require("koa");
const koaRouter = require("@koa/router");
const { verifyToken } = require("../middleware/login.middleware");
const commentController = require("../controller/comment-controller");
const permissionMiddleware = require("../middleware/permission.middleware");

const commentRouter = new koaRouter({ prefix: "/comment" });

commentRouter.post("/", verifyToken, commentController.createComment);
commentRouter.post("/reply", verifyToken, commentController.replyComment);
commentRouter.delete(
  "/del",
  verifyToken,
  permissionMiddleware.verifyPermission("comments"),
  commentController.removeComment
);
module.exports = commentRouter;
