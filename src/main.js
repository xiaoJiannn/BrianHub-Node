const app = require("./app");

const env = require("dotenv");

env.config();

require("./utils/handle-erro");

app.listen(process.env.SERVE_PORT, () => {
  console.log("koa服务器启动成功🚀");
});
