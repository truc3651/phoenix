"use strict";

const User = use("App/Models/User");
const Hash = use("Hash");
const Mail = use("Mail");
const Config = use("Config");
const uuid = use("uuid");
const moment = use("moment");

class AuthController {
  async login({ request, response, auth, session }) {
    const { email, password } = request.all();
    const userByEmail = await User.findBy("email", email);

    if (!userByEmail) {
      session.withErrors({ database: "Email non exists" }).flashAll();
      return response.redirect("back");
    }
    const isSamePassword = await Hash.verify(password, userByEmail.password);
    if (!isSamePassword) {
      session.withErrors({ database: "Wrong password" }).flashAll();
      return response.redirect("back");
    }
    await auth.remember(true).attempt(email, password);
    return response.redirect("/");
  }

  async register({ request, response, auth }) {
    const { email, password, fullname } = request.all();
    const userByEmail = await User.findBy("email", email);
    if (userByEmail) {
      session.withErrors({ database: "Email taken" }).flashAll();
      return response.redirect("/register");
    }

    const user = new User();
    user.email = email;
    user.password = password;
    user.fullname = fullname;
    await user.save();

    await auth.remember(true).attempt(email, password);
    return response.redirect("/");
  }

  async logout({ auth, response }) {
    await auth.logout();
    return response.redirect("/login");
  }

  async forgetPassword({ request, response, session }) {
    const { email } = request.all();
    const userByEmail = await User.findBy("email", email);

    if (!userByEmail) {
      session.withErrors({ database: "Email non exists" }).flashAll();
      return response.redirect("back");
    }
    userByEmail.reset_password_token = uuid.v4();
    userByEmail.password_token_expire = moment()
      .add(Config.get("app.forgotPasswordExpireTime"), "minutes")
      .toDate();
    await userByEmail.save();

    await Mail.send(
      "emails/reset-password",
      {
        fullname: userByEmail.fullname,
        reset_url: `${Config.get("app.appUrl")}/reset-password/${
          userByEmail.reset_password_token
        }`,
      },
      (message) => {
        message.to(email).from("phomai").subject("Phoenix Five");
      }
    );
  }

  async resetPassword({ request, response, session, auth }) {
    const { passwordToken, newPassword } = request.all();
    const userByPasswordToken = await User.query()
      .where({
        reset_password_token: passwordToken,
        password_token_expire: { $gt: new Date() },
      })
      .first();
    if (!userByPasswordToken) {
      session.withErrors({ database: "Invalid token" }).flashAll();
      return response.redirect("back");
    }
    userByPasswordToken.password = newPassword;
    userByPasswordToken.reset_password_token = null;
    userByPasswordToken.password_token_expire = null;
    await userByPasswordToken.save();

    await auth.remember(true).attempt(userByPasswordToken.email, newPassword);
    return response.redirect("/");
  }
}

module.exports = AuthController;
