---
layout: post
title: "Using an Xbox Controller on Ubuntu and ROS"
category: beaglecar
tags: [joystick, ros, ubuntu]
---

As part of my janky testing, I decided to try and use an wired Xbox controller
I had laying around for an alternate input method (typing in numbers wasn't
doing it for me anymore).

Thankfully most of the hardwork has already been done for me. Although Ubuntu
(LTS 12.04 on my testing desktop and 13.04 ARM on the Beaglebone Black) already
has default drivers for joysticks/gamepads and the Xbox controller specifically,
general internet consensus is that a third-party userspace driver called
`xboxdrv` is a much better alternative.

Installing `xboxdrv`

Random troubles I had

And with ROS, once again the hardwork has already been done for me. The ROS
package `joy` translates Xbox (old/360) (wired/wireless) inputs into ROS
messages in the `joy/joy` topic. I had trouble following the tutorial on setting
up the `turtlesim` demo since it was written for `groovy` and also a general
lack of familiarity with `C++`.


