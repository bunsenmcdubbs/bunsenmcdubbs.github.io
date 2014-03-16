---
layout: post
title: "RC Car Modifications Update 2"
category: beaglecar
tags: [beaglebone, servo, ros, motor]
---

I've "finished" a "functional" rc car, basically rebuilding the toy car I took
apart months earlier but with in a more fine tuned but limited fashion.
Currently it can drive (servo steering and motor control) under the direction of
an Xbox 360 controller but it's total range of motion is ~7 inches since it is
still tethered to the power supply (and Beaglebone-USB-Computer).

In order to enable that funtionality I made quite a bit of progress on the car
and I'm nearing completion of the working, driving car (albiet dependant on a
power supply and tethered to a computer). Electronics need to be moved onto more
permanent circuit boards (probably 1980's style through-hole point-to-point
perfboard) and the autonomous portion can start to take shape.

### Steering limit switches

[Earlier](/beaglecar/rc-mod-update-1.html) I built the servo steering mechanism.
One problem I ran into was centering the servo. I neither could nor wanted to
depend on a perfect physical mount especially since the linkage between the
servo arm and the steering rack was loose anyway (to make it more durable). My
solution was to mount switches on the steering rack that pressed when the
steering turned to the farthest postion either left or right.

Right now I've been too lazy to program interrupts into my teleop script but the
steering program uses the switches on initialization to find the far left and
right positions as well was averaging them to find the center.

Later I plan on using interrupts make sure the ateering doesn't go too far to
either side during operation because the sero could get displaced after
initialization. The "live" interrupts also ensure that the car has the fullest
range of motion.

### Motor control

I am also using PWM control to vary the speed of the motor controller (much like
how you control the brightness of the LED). By turning the motor on and off
faster than the response time of the circuit, I can change the effective
voltage applied to the motor.

### ROS Code



### Xbox integration



### Next steps... wifi and batteries


