(function() {
  instagram_url = "https://docs.google.com/spreadsheets/d/1cJK_7uqOTtSR8zgc8toomNwcJObXFFPeR-U0QNBsklA/pubhtml";
  github_url = "https://api.github.com/users/bunsenmcdubbs/events"

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
      callback(JSON.parse(xhr.responseText), e);
    }, false);
    xhr.open('GET', url);
    xhr.send();
  }

  function load_instagram(data) {
    // TODO check for template capabilities?
    let tmpl = document.getElementById("template-instagram-post");
    let insta_posts_elem = document.getElementById("instagram-pictures");

    insta_posts_elem.querySelector('.wait-spinner').hidden = true;

    let MAX_INSTAGRAMS = 3;
    for (let i = 0; i < MAX_INSTAGRAMS && i < data.length; i++) {
      let post = data[data.length - i - 1];
      // hacky way of requesting a standard resolution image (640x640)
      let url_parts = post.image_url.split('/');
      url_parts.splice(4, 0, 's640x640');
      let image_url = url_parts.join('/');

      tmpl.content.querySelector('a').href = post.post_url;
      tmpl.content.querySelector('img').src = image_url;
      tmpl.content.querySelector('.caption').textContent = post.caption.split('\n')[0];
      tmpl.content.querySelector('.meta').textContent = post.date;

      insta_posts_elem.appendChild(document.importNode(tmpl.content, true));
    }
  }

  function load_github(data) {
    let github_feed_elem = document.getElementById("github-feed");
    let handlers = {
      "PushEvent": render_github_pushed_event,
      "IssuesEvent": render_github_issue_event,
      "PullRequestEvent": render_github_pr_event
    };

    github_feed_elem.querySelector('.wait-spinner').hidden = true;

    let prev_date = undefined;
    data.forEach(function(e) {
      if (e.type in handlers) {
        let pretty_date = prettify_date(e.created_at);
        if (prev_date !== pretty_date) {
          render_github_time_ago(github_feed_elem, pretty_date);
          prev_date = pretty_date;
        }
        handlers[e.type](github_feed_elem, e);
      }
    })
  }

  // Thank you StackOverflow
  // https://stackoverflow.com/questions/2332811/capitalize-words-in-string
  function capitalize(str, lower) {
    return (lower ? str.toLowerCase() : str).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  }

  // and again
  // https://stackoverflow.com/questions/7641791/javascript-library-for-human-friendly-relative-date-formatting
  function prettify_date(date) {
    date = new Date(date);
    let delta = Math.round((new Date() - date) / 1000); // seconds

    const breakpoints = [
      [60, 'minute', 'minutes'],
      [60*60, 'hour', 'hours'],
      [60*60*24, 'day', 'days'],
      [60*60*24*7, 'week', 'weeks'],
      [60*60*24*7*52, 'year', 'years'],
      [Infinity]
    ];

    if (delta <= 60) {
      return 'just now';
    }
    let idx;
    for (idx = 0; idx < breakpoints.length && delta > breakpoints[idx][0]; idx++) {}
    idx--;
    let unit = breakpoints[idx][0];
    let plural = Math.floor(delta / unit) > 1;
    if (!plural) {
      return `a ${breakpoints[idx][1]} ago`;
    }
    return `${Math.floor(delta / unit)} ${breakpoints[idx][2]} ago`;
  }

  function render_github_time_ago(parent_elem, time_ago) {
    let tmpl = document.getElementById('template-github-time-ago');
    tmpl.content.querySelector('.meta').textContent = time_ago;
    parent_elem.appendChild(document.importNode(tmpl.content, true));
  }

  function render_github_pushed_event(parent_elem, data) {
    let tmpl = document.getElementById('template-github-pushed');
    let nc = data.payload.size;
    tmpl.content.querySelector('.num_commits').textContent = `${nc} commit${nc > 1 ? 's' : ''}`;
    tmpl.content.querySelector('.repository').href = `https://github.com/${data.repo.name}`;
    tmpl.content.querySelector('.repository').textContent = data.repo.name;
    parent_elem.appendChild(document.importNode(tmpl.content, true));
  }

  function render_github_issue_event(parent_elem, data) {
    let tmpl = document.getElementById('template-github-issue');
    tmpl.content.querySelector('.action').textContent = capitalize(data.payload.action);
    tmpl.content.querySelector('.issue_id').textContent = `#${data.payload.issue.number}`;
    tmpl.content.querySelector('.issue_id').href = data.payload.issue.html_url;
    tmpl.content.querySelector('.repository').href = `https://github.com/${data.repo.name}`;
    tmpl.content.querySelector('.repository').textContent = data.repo.name;
    parent_elem.appendChild(document.importNode(tmpl.content, true));
  }

  function render_github_pr_event(parent_elem, data) {
    let tmpl = document.getElementById('template-github-pull-request')
    tmpl.content.querySelector('.action').textContent = capitalize(data.payload.action);
    tmpl.content.querySelector('.pr_id').textContent = `#${data.payload.number}`
    tmpl.content.querySelector('.pr_id').href = data.payload.pull_request.html_url;
    tmpl.content.querySelector('.repository').href = `https://github.com/${data.repo.name}`;
    tmpl.content.querySelector('.repository').textContent = data.repo.name;
    parent_elem.appendChild(document.importNode(tmpl.content, true));
  }

  window.addEventListener('DOMContentLoaded', function() {
    // load instagram posts
    tabletop_init(instagram_url, load_instagram);
    make_request(github_url, load_github);
  });

})();
