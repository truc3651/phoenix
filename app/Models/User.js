"use strict";

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class User extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeSave", async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  static get table() {
    return "users";
  }

  tokens() {
    return this.hasMany("App/Models/Token");
  }
}

module.exports = User;
