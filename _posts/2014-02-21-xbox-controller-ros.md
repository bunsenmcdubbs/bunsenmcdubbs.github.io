---
layout: post
title: "Using an Xbox Controller on Ubuntu and ROS"
date: 2014-02-21 20:30 UTC-5
tags: [joystick, ros, ubuntu]
---

Curiosity struck again and so I decided to try and use an wired Xbox controller
I had laying around as an alternate input method (typing in numbers wasn't
doing it for me anymore).

<a name="xboxdrv" href="#xboxdrv"><h3>xboxdrv</h3></a>

Thankfully most of the hard-work has already been done for me. Although Ubuntu
(LTS 12.04 on my testing desktop and 13.04 ARM on the Beaglebone Black) already
has default drivers for joysticks/gamepads and the Xbox controller specifically,
general internet consensus is that a third-party user-space driver called
[xboxdrv](http://pingus.seul.org/~grumbel/xboxdrv/) is a much better alternative.

#### Disabling and blacklisting the kernel driver

_The blacklisting technique is from [Jonas Wagner](http://29a.ch/2013/2/24/xbox-controller-with-ubuntu-steam-xboxdrv)._

Before using `xboxdrv`, the default driver must be unloaded or blacklisted or
both. In case the default `xpad` driver is already loaded

    sudo rmmod xpad

will unload the driver. A more permanent solution is to blacklist the module so
it never is automatically loaded

    sudo su
    echo "blacklist xpad" > /etc/modprobe.d/blacklist.conf

#### Installing xboxdrv

Rather than install the package from the default Ubuntu repositories, using the
developer's repository ensures the latest version is installed.

    sudo add-apt-repository ppa:grumbel/ppa
    sudo apt-get update
    sudo apt-get install xboxdrv

#### Using xboxdrv

Starting the driver is really simple since it does the configuration and
searching for you.

    xboxdrv # might need root access

Using the `--silent` option might be preferred once its clear that the driver is
working with your install.

If you didn't use the silent option, there should be all sorts of information 
being spit out onto the console window detailing all the button presses and
trigger/joystick movements.

Checking `ls -l /dev/input` should reveal a new entry named `js0` or something
similar (maybe a different number). There is where controller is now mounted.

#### Quirks and troubles I ran into

I had some pretty frustrating experiences trying to setup xboxdrv. I'm still not
quite sure why but my Xbox 360 wired controller only worked when it was plugged
into a certain USB port on my computer. I had an error saying that xboxdrv was
unable to claim the device. Trying a different USB port solved the problem.

<a name="rosjoy" href="#rosjoy"><h3>Joy of ROS</h3></a>

And with ROS, once again the hard-work has already been done for me. The ROS
package joy translates Xbox (old/360) (wired/wireless) inputs into ROS
messages in the `joy` topic. I had trouble following the tutorial on setting
up the `turtlesim` demo since it was written for `groovy` and also a general
lack of familiarity with C++.

Using the ROS tutorials on writing publishers and subscribers, I wrote a node
that converted Xbox controller inputs from `joy` into commands for the 
`turtlesim` node.

{% highlight python %}
#!/usr/bin/env python
import rospy
from geometry_msgs.msg import Twist
from sensor_msgs.msg import Joy

# Author: Andrew Dai
# This ROS Node converts Joystick inputs from the joy node
# into commands for turtlesim

# Receives joystick messages (subscribed to Joy topic)
# then converts the joysick inputs into Twist commands
# axis 1 aka left stick vertical controls linear speed
# axis 0 aka left stick horizonal controls angular speed
def callback(data):
    twist = Twist()
    twist.linear.x = 4*data.axes[1]
    twist.angular.z = 4*data.axes[0]
    pub.publish(twist)

# Intializes everything
def start():
    # publishing to "turtle1/cmd_vel" to control turtle1
    global pub
    pub = rospy.Publisher('turtle1/cmd_vel', Twist)
    # subscribed to joystick inputs on topic "joy"
    rospy.Subscriber("joy", Joy, callback)
    # starts the node
    rospy.init_node('Joy2Turtle')
    rospy.spin()

if __name__ == '__main__':
    start()
{% endhighlight %}

_Also on my [Github](https://raw.github.com/BunsenMcDubbs/beaglecar/master/src/joystick-tests/turtle_teleop_joy.py)_

#### Actually running the test

1. Install ROS and setup the catkin workspace

2. Making a new project with the right dependencies (rospy, std_msgs, joy)
or just cloning my repository into the `src` folder of the workspace

3. Installing `xboxdrv`

4. Make sure the node is executable. `chmod +x src/joystick-tests/turtle\_teleop\_joy.py`

5. Start everything!

        # starting ROS
        roscore

        # xboxdrv in silent mode (in a new console window)
        sudo xboxdrv --silent

        # starting the joy node (in another new window)
        rosrun joy joy_node

        # starting turtlesim (in another new window)
        rosrun turtlesim turtlesim_node

        # starting the "translator" node (in another new window)
        rosrun beaglecar turtle_teleop_joy.py

<strike>
_2014-02-21: I haven't actually tested this code on the Beaglebone yet since the
BBB's install of ROS doesn't include `turtlesim` or any of the graphical tools._
</strike><br>I tested this by writing a [teleop test]
({{ site.url }}/beaglecar/rc-mod-update-2.html) for my beaglecar. Spoiler: it 
works!

