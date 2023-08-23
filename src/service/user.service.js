const connection = require("../app/database");
class userService {
  async createUser(user) {
    // 拿到信息拼接sql
    try {
      const { userName, userPassword } = user;
      const statement = "INSERT INTO users (name,password) VALUES (?,?) ";
      // 因为在conntroller中是先传入数据再返回成功结果，所以需要异步操作
      const result = await connection.execute(statement, [
        userName,
        userPassword,
      ]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async queryUsers(userName) {
    try {
      const statement = "SELECT * FROM users WHERE name = ? ";
      const [value] = await connection.execute(statement, [userName]);
      return value;
    } catch (error) {
      console.log(error);
    }
  }
  async updateUserAvatar(avatarUrl, id) {
    try {
      const statement = "UPDATE users SET avatar_url=? WHERE id=?;";
      const [value] = await connection.execute(statement, [avatarUrl, id]);
      return value;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new userService();
