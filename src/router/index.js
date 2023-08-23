const fs = require("fs");
function registerRouter(app) {
  // 读取当前目录下所有文件名
  const files = fs.readdirSync(__dirname);

  for (const file of files) {
    if (!file.endsWith("router.js")) continue;
    // 导入符合规则的路由
    const router = require(`./${file}`);
    app.use(router.routes());
    app.use(router.routes());
  }
}
module.exports = registerRouter;
