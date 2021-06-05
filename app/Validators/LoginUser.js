"use strict";

class LoginUser {
  get rules() {
    const _id = this.ctx.params._id;
    return {
      email: `required|email|unique:users,email,id,${_id}|not_equals:root`,
      password: "required",
    };
  }

  get messages() {
    return {
      required: "{{ field }} is required to log you in",
      "email.email": "You must provide a valid email address.",
      "email.unique": "This email is already registered.",
    };
  }

  get validateAll() {
    return true;
  }

  get sanitizationRules() {
    return {
      email: "trim",
    };
  }
}

module.exports = LoginUser;
