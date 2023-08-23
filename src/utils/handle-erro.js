const app = require("../app");

app.on("error", (error, ctx) => {
  let message = "";
  let code = "";
  switch (error) {
    case "name_or_password_empty":
      code = 1001;
      message = "name_or_password_empty";
      break;
    case "name_existed":
      code = 1002;
      message = "name_existed";
      break;
    case "name_not_existed":
      code = 1003;
      message = "name_not_existed";
      break;
    case "password_error":
      code = 1004;
      message = "password_error";
      break;
    case "token_expired":
      code = 1005;
      message = "token_error";
      break;
    case "permission_deny":
      code = 1006;
      message = "permission_deny";
      break;
    case "token_expired_errro":
      code = 1007;
      message = "token_expired_errro";
      break;
  }
  ctx.body = {
    code,
    message,
  };
});
