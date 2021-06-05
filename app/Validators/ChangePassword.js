"use strict";

class ChangePassword {
  get rules() {
    return {
      password: "required",
      newPassword: "required|min:3|max:10",
      confirmPassword: "required|same:newPassword",
    };
  }

  get messages() {
    return {
      required: "{{ field }} is required",
      "newPassword.min": "new password must be atleast 3 characters",
      "newPassword.max": "new password can take only 10 characters",
      "confirmPassword.same": "Password do not match",
    };
  }

  get validateAll() {
    return true;
  }

  get sanitizationRules() {
    return {};
  }
}

module.exports = ChangePassword;
