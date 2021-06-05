"use strict";

class ForgetPassword {
  get rules() {
    return {
      email: `required|email`,
    };
  }

  get messages() {
    return {
      required: "{{ field }} is required to log you in",
      "email.email": "You must provide a valid email address.",
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

module.exports = ForgetPassword;
