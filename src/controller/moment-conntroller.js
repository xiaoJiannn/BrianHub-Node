const momentService = require("../service/moment.service");
class momentsController {
  async emitMoments(ctx, next) {
    const { id } = ctx.userInfo;
    const { content, title } = ctx.request.body;
    try {
      const res = await momentService.createMoment(content, title, id);
      ctx.body = {
        message: "请求成功",
        data: res,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async getList(ctx, next) {
    const { size, offset } = ctx.query;
    const result = await momentService.queryMoment(size, offset);
    ctx.body = {
      code: 0,
      data: result,
    };
  }
  async getDetail(ctx, next) {
    const { id } = ctx.query;
    const result = await momentService.queryMomentById(id);
    ctx.body = {
      code: 0,
      data: result,
    };
  }
  async updateMoment(ctx, next) {
    const { content, id } = ctx.request.body;
    const result = await momentService.updateMomentById(content, id);
    ctx.body = {
      code: 0,
      data: result,
    };
  }
  async removeMoment(ctx, next) {
    const { id } = ctx.request.body;
    console.log(id);
    const result = await momentService.removeMomentById(id);
    ctx.body = {
      code: 0,
      data: result,
    };
  }
}

module.exports = new momentsController();
