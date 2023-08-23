const { createAvatar } = require("../service/file.service");
const { updateUserAvatar } = require("../service/user.service");
const { SERVE_HOST } = require("../config/serve");
class filesController {
  async createAvatar(ctx, next) {
    // 获取信息
    const { id } = ctx.userInfo;
    const { filename, mimetype } = ctx.request.file;
    const result = await createAvatar(filename, id, mimetype);
    const avatarUrl = `${SERVE_HOST}/user/avatar/${id}`;
    const userResult = await updateUserAvatar(avatarUrl, id);

    ctx.body = { message: "请求成功", data: avatarUrl };
  }
}

module.exports = new filesController();
