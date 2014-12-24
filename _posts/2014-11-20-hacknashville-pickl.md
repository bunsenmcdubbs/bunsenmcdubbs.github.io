---
layout: post
title:  "Pickl at HackNashville6"
date: 2014-11-20
tags: [hackathon, hacknashville, pickl, node]
thumb: "http://photos-d.ak.instagram.com/hphotos-ak-xpa1/t51.2885-15/10808990_1502928523289643_815335201_n.jpg"
---

In late October we (Michael, Nick and I) saw a post on the GTHackers group on
Facebook promoting HackNashville. Almost as a spur of the moment decision, we
all signed up and less than a month later we were on a van to Nashville. This is what we did.

## The Idea

We came with an concept for a light-hearted web app that faciliated (friendly)
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
