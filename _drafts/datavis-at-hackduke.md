---
layout: post
title: "Data Visualization at HackDuke"
tags: [datavis, hackduke, nceduviz]
---

We gathered outside at some ungodly hour of the morning, shivering and weighed
down by backpacks. Soon we&rsquo;d be on our way to Durham, North Carolina for
HackDuke, a hackathon unlike any other I&rsquo;d attended. Instead of the usual
anything-goes hackathon event, HackDuke&rsquo;s theme of &ldquo;Code for Good&rdquo;
encouraged participants to create projects that benefited society.

## HackDuke Begins

We woke up to a beautiful morning on the road just outside Duke campus and
after an opening ceremony featuring former IBM engineer and current Durham 
Mayor, Bill Bell, I set my sights on&hellip; socializing. I used the opportunity
to meet and talk to my brilliant fellow hackers and learn from some of the
mentors.

There were four main tracks for the hackathon: Inequality, Energy and the
Environment, Education and Healthcare. After asking around and talking to a
series of awesome mentors (shoutout to Baris and Sandeep from Google and
everyone from Code for America Durham), we settled on making some sort of data
visualization for education.

We were pointed to [d3.js](http://d3js.org/) as the best tool for the job and
also warned that it would not be an easy too to use. But first, we had to gather
the data to visualize.

## Googling Searching, Scripting and Data Parsing

We spent quite a bit of time Google&rsquo;ing and looking for data sets. 
Since we didn&rsquo;t set out with a specific final product in mind, it was a
bit of a challenge. A lot of time was sunk into looking at various school
district websites and looking for data sets.

We finally found the [North Carolina Public Schools](http://www.ncpublicschools.org/)
website and downloaded quite a few excel spreadsheets. From there we split
up, tackling both the visualization and the data parsing at the same time.

Thinking that doing that data parsing &ldquo;wouldn&rsquo;t take that 
long&rdquo; was the biggest misconception we had. Despite having (relatively)
well-formatted Excel spreadsheets, each of them were slightly different,
changing year to year, and made Michael&rsquo;s life a nightmare.

## &ldquo;Using&rdquo; d3.js

Having no actual experience with d3.js, we just tried to find and modify
existing d3 code to fit our purposes.

# Outline

<intro>

we brainstormed and met some cool people (sandeep and baris from google, code
for america - durham mentors)

 1. decided on data visualization - thought it would be ez - d3.js... hard
 2. need to tell a story with the interactive
 3. chose education as our topic (seemed to have lots of data)
 4. looking for data (semi difficult) - lots of googling, lots of scripting
 5. d3.js magic - used and hacked/modified example code
 6. *working* demo
 7. flaws in analysis
   - gaps in data and inaccurate representation of abnormal school districts
   - statistical badness
   - use of standardized testing as metric
   - no use of growth year-over-year
 8. ways to improve
   - fix above flaws
   - more in depth data about each district (labeling)
