---
layout: post
title: "RC Car Modifications Update 1"
category: beaglecar
tags: [beaglecar, beaglebone, rc car, servo, motor controller]
---

### Servo-Gyro Test

After [isntalling ROS](ros-on-beaglebone.html), I familiarized myself with the
framework by writing some small tests. First I tried turning a servo using
rotation, measured by a gyro. After several servo-abusing mistakes in my
code, everything was up and running. There wasn't any lag in my initial testing
so I'm not quite sure what caused the stuttering that appears in parts of the
video. Hopefully this doesn't become an issue later on as I add more complexity.

<iframe width="640" height="360" src="//www.youtube.com/embed/Js2NODN_0wM" frameborder="0" allowfullscreen></iframe>

The code consists of 2 ROSNodes. One to read and publish Z-axis rotatation rates
and another to receive and integrate the rates into a relative angular position.
The receiver node then turns the servo to that angle. Both nodes use the 
Adafruit BBIO library to interface with sensors and servos respectively.
Both nodes for the test can be found in my [Github](https://github.com/BunsenMcDubbs/beaglecar/tree/master/src/1-servo-gyro).

The rate at which I retrieved gyro data was arbitrarily chosen, more testing
is needed to determine an optimal rate that produces continuous, smooth readings
and minimizes lag. Although gyroscopic drift is a well documented issue with
rate gyroscopes like the ones in the MPU-6050, I am not concerned about its
effects in this small scale test because this is more of a proof-of-concept.
My later tests and final project will require a way to deal with the drift and
cumulative measurement error.

### Motor-Gyro Test

TODO
