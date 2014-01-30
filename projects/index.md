---
layout: default
title: "My Projects"
---

  - [_BeagleCar_]({{ site.url }}/beaglecar/intro.html) - a BeagleBone Black
powered autonomous RC car. [In Progress]
    {% for post in site.categories.beaglecar %}
       <a href="{{ post.url }}">{{ post.title }}</a>
    {% endfor %}
