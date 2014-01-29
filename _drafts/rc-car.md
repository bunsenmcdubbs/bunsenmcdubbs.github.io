---
layout: post
title: "RC Car Mods"
catagory: beaglecar
tags: [rc car]
---

This entire tutorial/post can be skipped with the use of a hobby-grade RC Car.
They can easily be identified by either the price tag or high quality
interchangable parts in the car itself. The mods outlined here are to upgrade
cheaper toy-grade RC cars to resemble the functionality of their hobby-grade
counterparts.

# Choosing a car

In my experience, it is far easier to use a smaller or regular sized RC car
rather than the enormous (1:6 scale+) toys. The larger toys are both more
expensive (especially when it inevitably breaks), less convenient to tear
apart and harder to modify. In terms of modifications, my main concern was
hacking together the motor controller. In smaller cars (powered by AA's)
the voltages are much smaller and the controllers are made from transistors
and smaller voltage componenents (read: cheaper and easier). Larger toys
have relays which, in addition to being slightly more difficult to control,
switch slower than transistors. This makes speed control far more
inaccurate and difficult since it needs a rapid on/off cycle to mix
speeds (aka PWM - pulse width modulated signal).

# Tearing Apart the Car

Pretty self explanatory. Take off the fluff and outer shells. Keep the
electronics in place (for now). Get to the core ("chassis") of the toy.
Locate the major components (and seperate if desired).

[<img src="{{ site.url }}/images/LabeledParts.jpg" alt="Bare RC Car without
cover" height="400" width="600">]
({{ site.url }}/images/LabeledParts.jpg)

# Modifications

There are several modifications necessary to emulate the driving functionality
of a real car. First, as mentioned above, is the motor controller. This way
the toy has more controls than just 100% forwards, 100% backwards and neutral.
Similarly, a servo-based steering control will replace the binary left-right
steering on the toy and allows for (gasp) varying turning angles.

## Motor Controller

## Servo Steering

Toy RC cars are extremely limited in their steering options, typically only
turning hard left or right from center. When the car is going forwards
(not turning left or right), the front wheels are pulled to the center with springs.
By using a servo that constantly maintains control over steering angle, the car
has a much stronger and finer grip on steering.

To install the servo, I tore out the existing motor and used a thin piece of
aluminum as a flat baseplate. Small strips of brass connected the servo horn
to the steering rack on the car.

[<img src="{{ site.url }}/images/Steering-top.jpg" alt="Servo steering
modification on a toy rc car" height="400" width="600">]
({{ site.url }}/images/Steering-top.jpg)
