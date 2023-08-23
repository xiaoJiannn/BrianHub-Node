const connection = require("../app/database");
class permissionService {
  async verifyUpdateMoment(id, user_id, table = "moments") {
    const statment = `SELECT * FROM ${table} WHERE id=? AND user_id=? ;`;
    const [value] = await connection.execute(statment, [id, user_id]);
    return value;
  }
}

module.exports = new permissionService();
