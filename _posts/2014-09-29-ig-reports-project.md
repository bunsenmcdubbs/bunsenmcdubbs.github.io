---
layout: post
title: "Inspector General Reports Project aka My First Open Source Contribution"
date:   2014-09-29 16:40 UTC-5
tags: [opensource, igreports]
---

A couple months ago (April 2014) I found and contributed to a project on Github
that scraped government websites for otherwise obscure reports and downloads
them in an (hopefully) organized fashion.

The project set out to gather all the reports and investigations made by
the Inspector Generals. The majority of them are available online but they are
each in their own custom website with different organization and formatting.
The solution was to custom write a program, called scrapers, for each Inspector
General website that analysed the website and pulled links to the pdf's of the
publicly available documents.

I wrote a scraper for the Office of Personnel Management (OPM). The whole
scraper consisted of a short Python script that used BeautifulSoup to go through
the site and programmatically copy and download all the pdf's available. Writing
the scraper was a fun challenge and was my first contribution to an open source
project. The logic itself wasn't overly complicated but it was interesting to
learn about scraping in general and getting familiarized with BeautifulSoup (a
great library).

The project's next stages are to build a nice website that searches through
and serves up all the reports from a centralized repository.

Scrapers - [inspectors-general github project page](https://github.com/unitedstates/inspectors-general)

Website - [oversight.io github project page](https://github.com/konklone/oversight.io)
