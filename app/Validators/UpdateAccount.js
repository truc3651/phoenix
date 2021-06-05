"use strict";

class UpdateAccount {
  get rules() {
    return {
      email: `required:email`,
      password: "required",
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

module.exports = UpdateAccount;
