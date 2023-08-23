const Koa = require("koa");

const koaRouter = require("@koa/router");

const { verifyToken } = require("../middleware/login.middleware");

const momentConntroller = require("../controller/moment-conntroller");

// const { permissionMoment } = require("../middleware/permission.middleware");
const permissionController = require("../middleware/permission.middleware");
const { verifyUpdateMoment } = require("../service/peimission.service");

const momentRouter = new koaRouter({ prefix: "/moment" });
// 增
momentRouter.post("/", verifyToken, momentConntroller.emitMoments);
// 查
momentRouter.post("/list", momentConntroller.getList);
momentRouter.post("/list/detail", momentConntroller.getDetail);

// 删
momentRouter.delete(
  "/list/delete",
  verifyToken,
  permissionController.verifyPermission("moments"),
  momentConntroller.removeMoment
);
// 改
momentRouter.patch(
  "/list/update",
  verifyToken,
  // permissionMoment,
  permissionController.verifyPermission,
  momentConntroller.updateMoment
);

module.exports = momentRouter;
