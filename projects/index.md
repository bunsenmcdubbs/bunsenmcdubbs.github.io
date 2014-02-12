---
layout: default
title: "My Projects"
---

<h3>BeagleCar</h3> a BeagleBone Black powered autonomous RC car. [In Progress]
  <ul class="posts">
    {% for post in site.categories.beaglecar %}
      <li><span class="meta">{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
