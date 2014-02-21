---
layout: post
title: "Beaglebone Internet Access Through USB"
date: 2014-02-09
tags: [beaglebone, ubuntu]
---

_The following scripts are adapted from instructions on [Robotic Controls.](http://robotic-controls.com/learn/beaglebone/beaglebone-internet-over-usb-only)_

These scripts (one for the Beaglebone and one for the computer) will
allow the computer to forward network traffic to the BBB. This way you only
need one cable - USB - to communicate with a networked BBB (I use this in lieu
of ethernet because I am nowhere near my router).

{% gist 8888980 %}

`chmod +x internet` and `chmod +x internetclient` will make the scripts
executable. Then simply run `./internet` on the computer first and
`./internetclient` after on the Beaglebone.

Keep in mind that many of the commands require root level access so a `sudo su`
will be needed. (`sudo` doesn't apply to any commands after the first so you
will still run into trouble running the scripts from a non-root user).
