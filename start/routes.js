"use strict";

const Route = use("Route");

Route.group(() => {
  Route.on("login").render("auth/login");
  Route.post("login", "AuthController.login").validator("LoginUser");
  Route.on("register").render("auth/register");
  Route.post("register", "AuthController.register").validator("RegisterUser");
  Route.on("forget-password").render("auth/forget-password");
  Route.post("forget-password", "AuthController.forgetPassword").validator([
    "ForgetPassword",
  ]);
  Route.get("reset-password/:passwordToken", ({ view, params }) => {
    return view.render("auth/reset-password", {
      passwordToken: params.passwordToken,
    });
  });
  Route.patch("reset-password", "AuthController.resetPassword").validator([
    "ResetPassword",
  ]);
}).middleware("guest");

Route.group(() => {
  Route.post("logout", "AuthController.logout");
  Route.on("profile").render("accounts/profile");
  Route.patch("update-profile", "AccountController.update").validator([
    "UpdateAccount",
  ]);
  Route.on("change-password").render("accounts/change-password");
  Route.patch("change-password", "AccountController.changePassword").validator(
    "ChangePassword"
  );

  Route.get("/", "PostController.posts");
  Route.get("/post/:_id", "PostController.postDetail");
  Route.post("posts", "PostController.create");
  Route.put("posts", "PostController.update");
  Route.delete("posts/:_id", "PostController.delete");
}).middleware("auth");
