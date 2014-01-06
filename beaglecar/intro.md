# The BeagleCar

written on 1/5/2014

## An Autonomous RC Car Controlled by a Beaglebone Black

I'm making a self driving RC car for my senior project. It will be guided by
GPS waypoints and utilize GPS data as well as inertial movement readings to
accurately localize itself. I am also currently toying with the idea of
cameras and distance sensors so the car/robot won't be so "blind". But that is
a stretch goal far beyond my current capacities (need to get the car to move
first).

My previous (brief) experience with Arduino equipped me with a false sense of
confidence when I bought a Beaglebone Black and started my project. Embedded
Linux is something I have absolutely no experience with; but regardless, time
for the fun to begin.

For the project I have:

  * [Beaglebone Black](http://beagleboard.org/Products/BeagleBone%20Black)
  * [Sparkfun's MPU-6050 Breakout Board](https://www.sparkfun.com/products/11028)
  * [Adafruit "Ultimate" GPS Breakout](http://www.adafruit.com/products/746)
  * and a used toy RC Car

A lot of this project is inspired by [Jason Dorweiler's Autonomous
Car](http://www.transistor.io/tag/autonomous-car.html).

## Gameplan (rough and semi-overlapping)

  1. [_Get the sensors working with the BBB._](part1.html) I want to be able to get proper readings as well as play with some of the extra features of the two sensors.
  2. _Set up ROS._ I want to use [ROS (Robot Operating System)](http://www.ros.org/) to handle all the scafolding for the "brains" of the car. Also there are some nice testing tools that I don't have to write myself... hopefully this will save me time in the long run.
  3. _Navigation, localization and driving algorithms._ Use Kalman Filter, dead reckoning and PID control to let the robot figure out where it is going.
  4. _Get a toy RC car and modify it._ The steering in toy-grade RC cars is often just a motor that goes hard-left or hard-right, replacing it with a servo will give me much more control over the robot.
  5. _Integrate sensors, navigation/planning algorithms, and driving interface into ROS._
  6. _Tune PID_ and...
  7. **Drive!**
  8. Maybe even have cameras and distance sensors to give the robot "eyes" and do obstacle avoidance...
