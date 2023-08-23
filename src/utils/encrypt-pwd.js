const encryption = require("crypto");

function encryptPwd(pwd) {
  // 创建加密
  const md5 = encryption.createHash("md5");
  // 加密为16进制字符
  const result = md5.update(pwd).digest("hex");
  console.log(result);
  return result;
}

module.exports = encryptPwd;
