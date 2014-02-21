---
layout: post
title: "Using an Xbox Controller on Ubuntu and ROS"
tags: [joystick, ros, ubuntu]
---

Curiosity struck again and so I decided to try and use an wired Xbox controller
I had laying around for an alternate input method (typing in numbers wasn't
doing it for me anymore).

### [xboxdrv](http://pingus.seul.org/~grumbel/xboxdrv/)

Thankfully most of the hard-work has already been done for me. Although Ubuntu
(LTS 12.04 on my testing desktop and 13.04 ARM on the Beaglebone Black) already
has default drivers for joysticks/gamepads and the Xbox controller specifically,
general internet consensus is that a third-party user-space driver called
`xboxdrv` is a much better alternative.

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

### Joy of ROS

And with ROS, once again the hard-work has already been done for me. The ROS
package `joy` translates Xbox (old/360) (wired/wireless) inputs into ROS
messages in the `joy/joy` topic. I had trouble following the tutorial on setting
up the `turtlesim` demo since it was written for `groovy` and also a general
lack of familiarity with `C++`.


