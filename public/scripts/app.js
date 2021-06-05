const YOUTUBE_API_KEY = "AIzaSyDWcvqxut8lBNCvHqbEN29ZpyxwemNCQlA";
const YOUTUBE_REGEX =
  /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

$(document).ready(function () {
  $(".richtext").richText();
  const description = $("#description").attr("data-description");
  if (description.length > 0) {
    html = $.parseHTML(description);
    $("#description").append(html);
  }
});

function createPost() {
  $("#postsForm").attr("action", "/posts");
  $("#action").text("Create post");
  $("#_id").val("");
  $("#link").val("");
  $("#poster_url").val("");
  $("#previewPhoto").attr("src", "");
  $("#thumbnail").val("");
  $("#description").val("");
}

function editPost(_id, link, poster_url, thumbnail, description) {
  $("#postsForm").attr("action", "/posts?_method=PUT");
  $("#action").text("Edit post");
  $("#_id").val(_id);
  $("#link").val(link);
  $("#poster_url").val(poster_url);
  $("#previewPhoto").attr("src", poster_url);
  $("#thumbnail").val(thumbnail);
  $("#description").val(description);
}

async function fetchYoutubeVideo({ value }) {
  if (value.match(YOUTUBE_REGEX)) {
    const idVideo = getIdVideo(value);
    const LINK = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${idVideo}&key=${YOUTUBE_API_KEY}`;
    const data = await fetch(LINK);
    const json = await data.json();
    const dataJson = await json.items[0];
    displayPreviewPhoto(dataJson);
  } else {
    displayPreviewPhoto();
  }
}

function displayPreviewPhoto(data) {
  if (data) {
    $("#previewPhoto").attr("src", data.snippet.thumbnails.high.url);
    $("#thumbnail").val(data.snippet.localized.title);
    $("#poster_url").val(data.snippet.thumbnails.high.url);
    $("#linkError").text("");
  } else {
    $("#previewPhoto").attr("src", "");
    $("#thumbnail").val("");
    $("#poster_url").val("");
    $("#linkError").text("Youtube link provided is NOT RIGHT");
  }
}

function getIdVideo(url) {
  try {
    var split_slash = url.split("/");
    var split_params = split_slash[3].split("?");
    var split_param = split_params[1].split("&");
    return split_param[0].substr(2);
  } catch (error) {
    return null;
  }
}
