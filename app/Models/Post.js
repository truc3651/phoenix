"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Post extends Model {
  static boot() {
    super.boot();
  }

  static get table() {
    return "posts";
  }
}

module.exports = Post;
