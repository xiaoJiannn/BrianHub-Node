const connection = require("../app/database");
class filesService {
  async createAvatar(filename, userId, minitype) {
    const statment =
      "INSERT INTO avatar (filename,user_id,mimetype) VALUES(?,?,?) ;";
    const [value] = await connection.execute(statment, [
      filename,
      userId,
      minitype,
    ]);
    return value;
  }
  async queryAvatarById(userId) {
    const statment = "SELECT * FROM avatar WHERE user_id=?;";
    const [value] = await connection.execute(statment, [userId]);
    console.log(value);
    return value;
  }
}

module.exports = new filesService();
