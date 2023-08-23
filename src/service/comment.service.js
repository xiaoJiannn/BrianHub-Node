const connection = require("../app/database");
class commentService {
  async createCommentService(userId, momentId, content) {
    const statment =
      "INSERT INTO comments(moment_id,user_id,content) VALUES(?,?,?) ;";
    const [value] = await connection.execute(statment, [
      momentId,
      userId,
      content,
    ]);
    return value;
  }
  async replyCommentService(userId, momentId, commentId, content) {
    const statment =
      "INSERT INTO comments(moment_id,user_id,comment_id,content) VALUES(?,?,?,?) ;";
    const [value] = await connection.execute(statment, [
      momentId,
      userId,
      commentId,
      content,
    ]);
    return value;
  }
  async removeCommentService(id) {
    const statment = "DELETE FROM comments WHERE id=?;";
    const [value] = await connection.execute(statment, [id]);
    return value;
  }
}

module.exports = new commentService();
