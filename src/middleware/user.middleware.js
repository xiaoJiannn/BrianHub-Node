const userService = require("../service/user.service");
const encryptPwd = require("../utils/encrypt-pwd");

const verifyUers = async (ctx, next) => {
  const user = ctx.request.body;
  console.log(user);

  const { userName, userPassword } = user;
  if (!userName || !userPassword) {
    return ctx.app.emit("error", "name_or_password_empty", ctx);
  }
  // 判断用户名存在
  const isRepetitive = await userService.queryUsers(userName);

  if (isRepetitive.length) {
    return ctx.app.emit("error", "name_existed", ctx);
  }

  await next();
};
const encryptionPassword = async (ctx, next) => {
  // // 获取密码
  const { userPassword } = ctx.request.body;
  try {
    ctx.request.body.userPassword = encryptPwd(userPassword);
  } catch (error) {
    console.log(error);
  }
  // // 加密并传回
  // // 继续下一个中间件
  // console.log(ctx.request.body);

  await next();
};
module.exports = { verifyUers, encryptionPassword };
