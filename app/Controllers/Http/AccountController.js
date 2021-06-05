"use strict";

const User = use("App/Models/User");
const Hash = use("Hash");

class AccountController {
  async update({ request, response, auth, session }) {
    const { email, password, fullname } = request.all();
    const userByEmail = await User.findBy("email", email);

    if (
      userByEmail &&
      auth.user._id.toString() !== userByEmail._id.toString()
    ) {
      session.withErrors({ database: "Email taken" }).flashAll();
    }
    const isSamePassword = await Hash.verify(password, userByEmail.password);
    if (!isSamePassword) {
      session.withErrors({ database: "Wrong password" }).flashAll();
    } else {
      userByEmail.email = email;
      userByEmail.fullname = fullname;
      await userByEmail.save();
    }
    return response.redirect("back");
  }

  async changePassword({ request, response, auth, session }) {
    const { password, newPassword } = request.all();
    const user = auth.user;

    const isSamePassword = await Hash.verify(password, user.password);
    if (!isSamePassword) {
      session.withErrors({ database: "Wrong password" }).flashAll();
    } else {
      user.password = newPassword;
      await user.save();
    }
    return response.redirect("back");
  }
}

module.exports = AccountController;
