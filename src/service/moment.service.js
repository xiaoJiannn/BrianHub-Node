const connection = require("../app/database");
class momentService {
  async createMoment(content, title, userId) {
    try {
      const statment =
        "INSERT INTO moments (content, title, user_id) VALUES (?, ?, ?)";
      const [value] = await connection.execute(statment, [
        content,
        title,
        userId,
      ]);
      return value;
    } catch (error) {
      console.log(error);
    }
  }
  async queryMoment(size = 5, offset = 0) {
    try {
      const statment = `SELECT m.content, m.createAt,
      JSON_OBJECT(
          'id',
          u.id,
          'name',
          u.name,
          'createTime',
          u.createAt,
          'avatarUrl',
          u.avatar_url
      ) user, 
      (
        SELECT COUNT(*)
        FROM comments c
        WHERE
            c.moment_id = m.id
    ) commentCount
      FROM moments AS m
          LEFT JOIN users as u ON m.user_id = u.id
      LIMIT ?
      OFFSET ?;`;
      const [value] = await connection.execute(statment, [
        String(size),
        String(offset),
      ]);
      // console.log(value);
      return value;
    } catch (error) {
      console.log(error);
    }
  }
  async queryMomentById(id) {
    try {
      const statment = `SELECT
      m.content,
      m.createAt,
      JSON_OBJECT(
          'id',
          u.id,
          'name',
          u.name,
          'createTime',
          u.createAt,
          'avatarUrl',
          u.avatar_url
      ) user, (
          JSON_ARRAYAGG(
            JSON_OBJECT(
          'id',
          c.id,
          'content',
          c.content,
          'commentId',
          c.comment_id,
          'user',
          JSON_OBJECT(
            'id',
            ui.id,
            'name',
            ui.name,
            'createTime',
            ui.createAt,
            'avatarUrl',
            ui.avatar_url
          ) ))) 
          comments
  FROM moments AS m
      LEFT JOIN users as u ON m.user_id = u.id
      LEFT JOIN comments as c ON m.id = c.moment_id
      LEFT JOIN users as ui ON ui.id = c.user_id
  WHERE m.id = ?
  GROUP BY m.id;`;
      const [value] = await connection.execute(statment, [id]);
      console.log(value);
      return value;
    } catch (error) {
      console.log(error);
    }
  }
  async updateMomentById(content, id) {
    try {
      const statment = `UPDATE moments SET content=? WHERE id=?`;
      const [value] = await connection.execute(statment, [content, id]);
      console.log(value);
      return value;
    } catch (error) {
      console.log(error);
    }
  }
  async removeMomentById(id) {
    try {
      const statment = `DELETE FROM comments WHERE id=?;`;
      const [value] = await connection.execute(statment, [id]);
      return value;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new momentService();
