const commentService = require("../service/comment.service");
const {
  createCommentService,
  replyCommentService,
  removeCommentService,
} = require("../service/comment.service");
class commentController {
  async createComment(ctx, next) {
    // 用户id
    const { id: userId } = ctx.userInfo;
    // 动态id&评论内容
    const { content, moment_id: momentId } = ctx.request.body;
    const result = await createCommentService(userId, momentId, content);
    ctx.body = { message: "请求成功", data: result };
  }
  async replyComment(ctx, next) {
    // 用户id
    const { id: userId } = ctx.userInfo;
    // 动态id&评论内容
    const {
      content,
      moment_id: momentId,
      comment_id: commentId,
    } = ctx.request.body;
    const result = await replyCommentService(
      userId,
      momentId,
      commentId,
      content
    );
    ctx.body = { message: "请求成功", data: result };
  }
  async removeComment(ctx, next) {
    const { id } = ctx.request.body;
    const result = await removeCommentService(id);
    ctx.body = {
      code: 0,
      data: result,
    };
  }
}

module.exports = new commentController();
