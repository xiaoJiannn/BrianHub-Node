const connection = require("../app/database");
class labelService {
  async createLable(name) {
    try {
      const statment = "INSERT INTO labels (name) VALUES (?)";
      const [value] = await connection.execute(statment, [name]);
      return value;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new labelService();
