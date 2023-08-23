const jwt = require("jsonwebtoken");
const { priviteKey, publicKeys } = require("../keys/config/readKeys");

class loginController {
  loginVerifyPassPanel(ctx, next) {
    const { id, name } = ctx.data;

    const payload = { id, name };
    const token = jwt.sign(payload, priviteKey, {
      expiresIn: 24 * 60 * 60,
      algorithm: "RS256",
    });
    ctx.body = {
      code: 0,
      data: {
        // id,
        // name,
        token,
        message: "验证通过",
      },
    };
  }
  isAuthorization(ctx, next) {
    console.log(ctx.userInfo);

    ctx.body = {
      message: "token验证成功",
    };
  }
}

module.exports = new loginController();
