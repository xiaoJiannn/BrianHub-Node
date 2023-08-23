const labelService = require("../service/label.service");
class labelController {
  async createLabel(ctx, next) {
    const { name } = ctx.request.body;
    const result = await labelService.createLable(name);
    ctx.body = { message: "请求成功", data: result };
  }
}

module.exports = new labelController();
