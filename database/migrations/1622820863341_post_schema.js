"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PostSchema extends Schema {
  async up() {
    // const exists = await this.hasTable("posts");
    // if (!exists) {
    this.create("posts", (table) => {
      table.increments();
      table.string("imageUrl");
      table.string("thumbnail");
      table.string("description");

      table.timestamp("createdAt").defaultTo(this.fn.now());
      table.timestamp("updatedAt").defaultTo(this.fn.now());
    });
    // }
  }

  down() {
    this.drop("posts");
  }
}

module.exports = PostSchema;
