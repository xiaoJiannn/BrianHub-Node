const { queryAvatarById } = require("../service/file.service");
const { createUser } = require("../service/user.service");
const fs = require("fs");
class userController {
  async createUser(ctx, next) {
    // 接收传输信息
    const user = ctx.request.body;

    // 存储数据库
    const res = await createUser(user);
    // 返回创建成功信息
    ctx.body = { message: "请求成功", data: res };
  }
  async showAvatar(ctx, next) {
    const { id } = ctx.params;
    console.log(id);
    const result = await queryAvatarById(id);
    const { filename, mimetype } = result.pop();
    ctx.type = mimetype;
    ctx.body = fs.createReadStream(`./uploads/${filename}`);
  }
}

module.exports = new userController();
