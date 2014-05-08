---
layout: post
title: "Journal 4: Week of May 9th"
date: 2014-5-9
category: beaglecar
---

This week I've worked on a lot of the programming for my project. Most of the
navigation and localization code for my project. The problem is that I haven't
had a chance to test the logic on the car itself... so bugs are just waiting
to happen. I need to add more mundane code pertaining to debugging and logging
information to help me figure out what went wrong when it doesn't work.

## Localization: a Tale of Bayesian State Estimation

I finished the localization node of the car by adding in a portion to handle
IMU data. It fills in the gaps between GPS updates with relative measurements
and contributes a little to the final estimates. It is most useful for smoothing
out the position estimates from the GPS, both because of the time lag and
because of jumps caused by constellation changes.

The localization estimates utilize Bayesian State Estimation to combine the two
sources of data. The main idea is that since both/all sensors are noisy and
inaccurate, the goal of any localization program is just to provide the most
useful estimate for the purpose of the project. Some projects my sacrifice
absolute accuracy over relative consistency while others need the extra accuracy
and don't mind having position estimates jump around. The main improvements in
this field try to optimize all aspects as much as possible without making any
major sacrifices. In this juxtaposition, my project is really trivial since it
isn't a very precise operation. I've (semi-arbitrarily) chosen to emphasize more
absolute accuracy by heavily utilizing the GPS data and adding in the IMU only
supplementally. Testing might prove otherwise.

There are many complex algorithms and high level mathematics in this field but
I've chosen to stick with one of the simplier methods: Bayesian State
Estimation. It's really just a long name for weighted averages. I (arbitrarily)
chose values for the weight (between 0 and 1 inclusive that sum to 1) based on
the level of "trust" I have for the data source. Since I'm depending on the GPS
more, it's weight in normal operation is much higher than the IMU (ex: 0.9 vs
0.1). So the "formula" for the position estimate is

> final estimate = 0.9 * (gps estimate) + 0.1 * (imu estimate)

But there are many cases in which the "trust" changes for the two sources.
When there is a constellation change in GPS satellites, I have place much more
trust in the more consistent and smooth relative estimates from the IMU and less
trust in the jumpy GPS data. Over time, since I still use the GPS data (just
less), the estimate wanders back towards the raw GPS again and then the trust
returns to normal.

## Navigation: PID control


