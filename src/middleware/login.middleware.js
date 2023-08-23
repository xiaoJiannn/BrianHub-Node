const jwt = require("jsonwebtoken");
const { queryUsers } = require("../service/user.service");
const encryptPwd = require("../utils/encrypt-pwd");
const { publicKeys } = require("../keys/config/readKeys");

const verifyLogin = async (ctx, next) => {
  // 1.用户/密码是否为空
  const { userName, userPassword } = ctx.request.body;
  if (!userName || !userPassword) {
    return ctx.app.emit("error", "name_or_password_empty", ctx);
  }
  // 2.用户是否存在与数据库
  const isExists = await queryUsers(userName);
  const userInfo = isExists[0];
  if (!userInfo) {
    return ctx.app.emit("error", "name_not_existed", ctx);
  }
  // 3.密码是否正确
  if (userInfo.password !== encryptPwd(userPassword)) {
    return ctx.app.emit("error", "password_error", ctx);
  }
  ctx.data = userInfo;
  // 下一中间件
  await next();
};

const verifyToken = async (ctx, next) => {
  const authorization = ctx.header.authorization;
  if (!authorization) return ctx.app.emit("error", "token_expired", ctx);
  const token = authorization.replace("Bearer ", "");
  try {
    const res = jwt.verify(token, publicKeys, {
      algorithms: ["RS256"],
    });
    const { id, name } = res;
    ctx.userInfo = { id, name };
    await next();
  } catch (error) {
    console.log(error);
    ctx.app.emit("error", "token_expired_errro", ctx);
  }
};
module.exports = { verifyLogin, verifyToken };
