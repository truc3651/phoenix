"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  async up() {
    // const exists = await this.hasTable("users");
    // if (!exists) {
    this.create("users", (table) => {
      table.increments();
      table.string("email");
      table.string("password");
      table.string("fullname");

      table.timestamp("createdAt").defaultTo(this.fn.now());
      table.timestamp("updatedAt").defaultTo(this.fn.now());

      table.index("email_index", { email: 1 }, { unique: true });
    });
    // }
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
