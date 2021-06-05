"use strict";

class RegisterUser {
  get rules() {
    const _id = this.ctx.params._id;
    return {
      email: `required:unique:users,email,id,${_id}`,
      password: "required|min:3|max:10",
      confirmPassword: "required|same:password",
      fullname: "required",
    };
  }

  get messages() {
    return {
      required: "{{ field }} is required",
      "email.email": "You must provide a valid email address.",
      "email.unique": "This email is already registered.",
      "password.min": "password must be atleast 3 characters",
      "password.max": "password can take only 10 characters",
      "confirmPassword.same": "Password do not match",
    };
  }

  get validateAll() {
    return true;
  }

  get sanitizationRules() {
    return {
      email: "trim:normalize_email",
      fullname: "trim:plural",
    };
  }
}

module.exports = RegisterUser;
