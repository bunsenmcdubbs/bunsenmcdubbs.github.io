(function() {
  instagram_url = "https://docs.google.com/spreadsheets/d/1cJK_7uqOTtSR8zgc8toomNwcJObXFFPeR-U0QNBsklA/pubhtml";

  function tabletop_init(google_sheets_url, callback) {
    Tabletop.init({
      key: google_sheets_url,
      callback: callback,
      simpleSheet: true
    });
  }

  // NOTE not currently used
  function make_request(url, callback) {
    xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function(e) {
      callback(xhr.responseText, e);
    }, false);
    xhr.open('GET', url);
    xhr.send();
  }

  function load_instagram(data) {
    // TODO check for template capabilities?
    let tmpl = document.getElementById("template-instagram-post");
    let insta_posts = document.getElementById("instagram-pictures");

    let MAX_INSTAGRAMS = 3;
    for (let i = 0; i < MAX_INSTAGRAMS && i < data.length; i++) {
      let post = data[data.length - i - 1];
      tmpl.content.querySelector('a').href = post.post_url;
      tmpl.content.querySelector('img').src = post.image_url;
      tmpl.content.querySelector('.caption').textContent = post.caption;
      tmpl.content.querySelector('.meta').textContent = post.date;
      insta_posts.appendChild(document.importNode(tmpl.content, true));
    }
  }

  window.addEventListener('DOMContentLoaded', function() {
    // load instagram posts
    tabletop_init(instagram_url, load_instagram);
  });

})();
