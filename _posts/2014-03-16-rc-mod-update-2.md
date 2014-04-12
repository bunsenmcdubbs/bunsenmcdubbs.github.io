---
layout: post
title: "RC Car Modifications Update 2"
date: 2014-03-16 23:00 UTC-5
category: beaglecar
tags: [beaglebone, servo, ros, motor]
---

<p class="lead">
I've "finished" a "functional" rc car, basically rebuilding the toy car I took
apart months earlier but with in a more fine tuned but limited fashion.
Currently it can drive (servo steering and motor control) under the direction of
an Xbox 360 controller but it's total range of motion is ~7 inches since it is
still tethered to the power supply (and Beaglebone-USB-Computer).
</p>

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

After [connecting my Xbox controller with the BBB](xbox-controller-ros.html), I
hacked together a ROSNode for teleop control of the Beaglecar. I used the
left joystick's x/horizontal axis to steer and the right joystick's y/vertical
axis to control motor speed.

{% highlight python linenos %}
#!/usr/bin/env python
import rospy
import time
import Adafruit_BBIO.GPIO as GPIO
import Adafruit_BBIO.PWM as PWM
from servo_controller import Servo
from sensor_msgs.msg import Joy

def callback(data):
    if data.buttons[8]:
        exit()
        return
    # map [-1,1] to [-90,90]
    # 0deg = straight forward
    angle = span * data.axes[0]
    # set servo angle
    servo.set_angle(angle + center)
    speed = 100 * data.axes[3]
    if speed > 0:
        PWM.set_duty_cycle(reverse, 0)
        PWM.set_duty_cycle(forward, speed)
    else:
        PWM.set_duty_cycle(forward, 0)
        PWM.set_duty_cycle(reverse, -speed)
    return

def exit():
    servo.stop()
    PWM.stop(forward)
    PWM.stop(reverse)
    PWM.cleanup()
    return

def start():
    # Starting servo controller
    global servo
    servo = Servo() # using default values
    servo.start()
    # Start motor control
    global forward
    global reverse
    global PWM
    forward = "P9_14"
    reverse = "P9_22"
    PWM.start(forward, 0, 200)
    PWM.start(reverse, 0, 200)
    # initializing the servo
    init_servo()
    # Subscribe to ROS Joy node
    rospy.Subscriber("joy", Joy, callback)
    rospy.init_node("Joy2Servo")
    rospy.spin()
    
def init_servo():
    global center
    global span
    pin1 = "P8_12"
    pin2 = "P8_14"
    GPIO.setup(pin1, GPIO.IN)
    GPIO.setup(pin2, GPIO.IN)
    # guessed center point
    center = 100
    # current angle
    angle = center
    # left and right limits
    limit1 = angle
    limit2 = angle
    # turning left
    while not GPIO.input(pin1) and not GPIO.input(pin2):
        angle += .5
        servo.set_angle(angle)
        time.sleep(.05)
    limit1 = angle
    time.sleep(.5)

    # resetting servo to guessed center
    angle = center
    servo.set_angle(angle)
    time.sleep(.2)

    # turning right
    while not GPIO.input(pin1) and not GPIO.input(pin2):
        angle -= .5
        servo.set_angle(angle)
        time.sleep(.05)
    limit2 = angle
    time.sleep(.5)

    # calculating center from left and right limits
    center = (limit1 + limit2) / 2
    span = (limit1 - limit2) / 2 * 1.02
    print "center = " + str(center)
    print "span = " + str(span)
    servo.set_angle(center)

if __name__ == '__main__':
    start()
{% endhighlight %}

_The code can also be found on my [Github](https://github.com/BunsenMcDubbs/beaglecar/blob/master/src/joystick-tests/teleop.py)_

### Next steps

Setting up the teleop was fun but it was severely limited by the 8 inch long
jumper cables I used to power the BBB and the car. I'm working on moving things
off the breadboard and start soldering onto perfboards or maybe even etched
pcb's (probably not). After things are seperated I can work on mounting them to
the car and using battery power. Then I'll have all the functionality of the
original car + limited range (Xbox controller cord)! Eventually I will add in
wireless capabilities (wifi or bluetooth or cheapo fm transmitter?) and the
actual autonomous driving portion.

