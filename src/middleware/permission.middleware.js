const { verifyUpdateMoment } = require("../service/peimission.service");

const verifyPermission = function (table) {
  return async (ctx, next) => {
    const { id } = ctx.request.body;
    const { id: user_id } = ctx.userInfo;
    const res = await verifyUpdateMoment(id, user_id, table);
    console.log(user_id);
    if (!res[0]) {
      return ctx.app.emit("error", "permission_deny", ctx);
    }
    await next();
  };
};

module.exports = { verifyPermission };
