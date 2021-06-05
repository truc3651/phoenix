"use strict";

const Post = use("App/Models/Post");
const User = use("App/Models/User");

class PostController {
  async create({ request, response, session }) {
    const { link, poster_url, thumbnail, description } = request.all();
    const postByLink = await Post.findBy("link", link);
    if (postByLink) {
      session.withErrors({ database: "Link taken" }).flashAll();
      return response.redirect("back");
    }
    const post = new Post();
    post.link = link;
    post.poster_url = poster_url;
    post.thumbnail = thumbnail;
    post.description = description;
    await post.save();

    return response.redirect("/");
  }

  async update({ request, response, session }) {
    const { _id, link, poster_url, thumbnail, description } = request.all();
    const postById = await Post.find(_id);
    if (!postById) {
      session.withErrors({ database: "Post non exists" }).flashAll();
    } else {
      postById.link = link;
      postById.poster_url = poster_url;
      postById.thumbnail = thumbnail;
      postById.description = description;
      await postById.save();
    }

    return response.redirect("back");
  }

  async delete({ params, response, session }) {
    const { _id } = params;
    const post = await Post.find(_id);
    if (!post) session.withErrors({ database: "Post non exists" }).flashAll();
    else await post.delete();

    return response.redirect("back");
  }

  async posts({ view }) {
    const postsBare = (await Post.all()).rows;
    const posts = postsBare.map((post) => ({ ...post.$attributes }));
    return view.render("welcome", { posts });
  }

  async postDetail({ params, view }) {
    const { _id } = params;
    const post = await Post.find(_id);
    return view.render("posts/detail", { post, title: post.thumbnail });
  }
}

module.exports = PostController;
