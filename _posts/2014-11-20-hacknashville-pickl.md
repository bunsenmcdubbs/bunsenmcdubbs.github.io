---
layout: post
title:  "Pickl at HackNashville6"
date: 2014-11-20
tags: [hackathon, hacknashville, pickl, node]
---
In late October we (Michael, Nick and I) saw a post on the GTHackers group on
Facebook promoting HackNashville. Almost as a spur of the moment decision, we
all signed up and less than a month later we were on a van to Nashville. This is what we did.

<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-version="7" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="https://www.instagram.com/p/vHaACEM08P/" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;">Calm before the storm. #hacknashville</a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A photo posted by Andrew Dai (@bunsenmcdubbs) on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2014-11-07T22:44:25+00:00">Nov 7, 2014 at 2:44pm PST</time></p></div></blockquote>
<script async defer src="//platform.instagram.com/en_US/embeds.js"></script>

## The Idea

We came with an concept for a light-hearted web app that facilitated (friendly)
competition. It's simple. Integrate an everyday part of life more seamlessly
with web technologies and social media.

 1. First take an embarrassing pic(ture). A picture that you don't
want to be shared with your social network or the public as a
whole.

 2. Then pick your wager. Get a group of your friends and make a
bet, a game or some type of contest. There must be one
identifiable loser and they will suffer the consequences.

 3. Now you are stuck in a Pickl(e). No one can back out of this
commitment. once the picture has been uploaded to our servers
and the clock ticking, there can be no quitting or flaking.
Someone must lose.

## Implementation

In the past we had dabbled with Node.js and Express and made one
or two projects. This was by far our most ambitious endeavor.
Our app called for a full stack, database and interfacing
with other API's (Facebook and Imgur). The three of us all have
a bunch of experience programming but we'd soon learn that this
project was a bit over our heads.

First up was the question of which framework? Knowing that we
wanted to use Node simplified the search quite a bit but there
was still quick a selection. In the end, (after an enormous
amount of trial and error... mostly error) we settled on
Drywall. Based on Node and Express, it implements most of the
social media and user management tools that we needed to pull
off our app.

### Getting to work

Even though we found an excellent foundation for our work, it
was not smooth sailing to our final product. We encountered quite a few hiccups,
false starts and more than our fair share of backward steps throughout the
process. Overall it was definitely a learning experience.

First was installing the actual framework. Drywall is meant to be a starting
point for projects like ours but we started off having trouble installing it and
getting it running. In the process I learned the hard way how Grunt and Heroku
worked. In hindsight the problems we were having were very minimal and trivial
but in the moment they were each an abyss of misunderstandings and time
consumption.

We were pointed in the direction of Imgur to store our images. While trying to
use the Imgur API, we stumbled into another strange and mysterious bug. No
matter what we tried and copied from the sample code on Github, we would always
have an error. Initially we were trying to send the image as in a GET request.
We kept getting errors concerning the length of the URL. After that, we were
stuck on a problem with cross-site scripting that I still don't entirely
understand.

Through our own misunderstandings we had the hardest time learning how the
Jade templating engine works with Node and Express. That would have been more
of a problem if we didn't also struggle so much with signing in and setting
up Facebook integration.

Even though Passport and Drywall makes social media integration really easy, we
still had silly implementation issues with getting the nuts and bolts working.
For quite a while I wasn't sure how to actually store the OAuth key on Heroku.
I tried over and over to put it in the environment variables section of the
Gruntfile only to find that Heroku had an online dashboard where all the
variables were stored.

## Time is Up

In the end we did not finish the product. But we did get crucial parts working:
users could signup and login with Facebook and our servers could upload and
store pictures on Imgur. Our Node app could even send out confirmation emails
from an `@alternativeheroes.me` email account! Even though we didn't finish, our
presentation at expo time still got a lot of positive feedback.

## Future Plans

HackNashville was an awesome experience but we couldn't ship a product because
we didn't have the skill or knowledge to implement the backend. Our time at the
hackathon was essentially a 48 hour learning experience. It was an intense,
exhausting, no-sleep learning experience but an incredibly transformative one
nonetheless. We know have a working knowledge of most of the underpinnings of
the Drywall framework and are eager to implement one ourselves. Even though
we didn't finish Pickl at HackNashville, we do plan on rewriting the codebase
from the ground up and shipping the product within the school year. Stay tuned
for updates! You can find our work on our [Github](http://github.com/alternativeheroes).
