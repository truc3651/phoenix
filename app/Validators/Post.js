"use strict";

class Post {
  get rules() {
    const _id = this.ctx.params._id;
    return {
      link: "required:unique",
      poster_url: `required`,
      thumbnail: "required|min:10|max:200",
      description: "",
    };
  }

  get messages() {
    return {
      required: "{{ field }} is required",
      "link.unique": "This link is already registered.",
      "thumbnail.min": "thumbnail must be atleast 3 characters",
      "thumbnail.max": "thumbnail can take only 10 characters",
    };
  }

  get validateAll() {
    return true;
  }

  get sanitizationRules() {
    return {
      link: "trim",
      thumbnail: "trim",
      description: "trim",
    };
  }
}

module.exports = Post;
