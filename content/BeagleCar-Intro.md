# The BeagleCar

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

  1. _Get the sensors working with the BBB._ I want to be able to get proper readings as well as play with some of the extra features of the two sensors.
  2. _Set up ROS._ I want to use [ROS (Robot Operating System)](http://www.ros.org/) to handle all the scafolding for the "brains" of the car. Also there are some nice testing tools that I don't have to write myself... hopefully this will save me time in the long run.
  3. _Navigation, localization and driving algorithms._ Use Kalman Filter, dead reckoning and PID control to let the robot figure out where it is going.
  4. _Get a toy RC car and modify it._ The steering in toy-grade RC cars is often just a motor that goes hard-left or hard-right, replacing it with a servo will give me much more control over the robot.
  5. _Integrate sensors, navigation/planning algorithms, and driving interface into ROS._
  6. _Tune PID_ and...
  7. **Drive!**
  8. Maybe even have cameras and distance sensors to give the robot "eyes" and do obstacle avoidance...

## Sensors and Interfaces

### MPU-6050

#### Connecting the board

I started with the 6 axis accelerometer/gyroscope. It communicates via an [I2C
interface](http://youtu.be/nMZJwspSkAc?t=2m57s). Careful reading of Sparkfun
and [Beaglebone](http://elinux.org/File:BeagleBone_p9_pinout.jpg)
documentation helped me wire up the board.

To connect the IMU to I2C bus 1:

  * [VDD](http://en.wikipedia.org/wiki/IC_power_supply_pin) to Pin 9_3 (3.3V)
  * VIO to Pin 9_3 (3.3V)
  * Gnd to Pin 9_1
  * SCL to Pin 9_19 (I2C Bus 1 Serial Clock)
  * SDA to Pin 9_20 (I2C Bus 1 Serial Data)

#### Probing with i2c-tools

I tested this connection with the i2c-tools already installed in the default
Angstrom distribution. _i2cdetect_ looks for any I2C devices connected to a
specified bus (in our case i2c bus 1). _i2cdump_ reads all of the information
from a specified I2C device; i2cget and i2cset work in the same way on
specific memory registers on a device.

    
    root@beaglebone:~# i2cdetect -y -r 1
      0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
    00:          -- -- -- -- -- -- -- -- -- -- -- -- -- 
    10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
    20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
    30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
    40: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
    50: -- -- -- -- UU UU UU UU -- -- -- -- -- -- -- -- 
    60: -- -- -- -- -- -- -- -- 68 -- -- -- -- -- -- -- 
    70: -- -- -- -- -- -- -- -- 
    root@beaglebone:~# i2cdump -y 1 0x68
    No size specified (using byte-data access)
         0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f    0123456789abcdef
    00: 81 7d 00 1d 3c cd fc ae 05 44 08 5c 28 8f 6e 90    ?}.?<????D?\(?n?
    10: d4 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ?...............
    20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
    30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
    40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
    50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
    60: 00 00 00 00 00 00 00 00 00 00 00 40 00 00 00 00    ...........@....
    70: 00 00 00 00 00 68 00 00 00 00 00 00 00 00 00 00    .....h..........
    80: 81 7d 00 1d 3c cd fc ae 05 44 08 5c 28 8f 6e 90    ?}.?<????D?\(?n?
    90: d4 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ?...............
    a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
    b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
    c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
    d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
    e0: 00 00 00 00 00 00 00 00 00 00 00 40 00 00 00 00    ...........@....
    f0: 00 00 00 00 00 68 00 00 00 00 00 00 00 00 00 00    .....h..........
    

Reading through the [Invensense
documentation](http://invensense.com/mems/gyro/documents/RM-MPU-6000A.pdf)
reveals that bit 6 on register 0x6b must be set to 0 for the device to exit
sleep mode. Currently register 0x6b is 0x40 or 0b0100000, meaning that the 6th
bit is 1 and the device is sleeping (bits are counted right to left with the
right-most bit being bit 0 and the left-most bit 7). Using `i2cset -y 1 0x68
0x6b 0x00` sets the register to all zeros and then a call to `i2cdump -y 1
0x68` shows that the sensor is active.

#### Test script

I wrote this little test script to at least get some meaningful values from
the sensor. It uses the [Adafruit_BBIO library](http://learn.adafruit.com
/setting-up-io-python-library-on-beaglebone-black) to do the I2C interface
heavy lifting. All it does is print the acceleration on the x axis in g's to
the console. The code is also on my [github](https://github.com/BunsenMcDubbs/
BeagleCar/blob/master/src/test/xaccel.py).

    
    from Adafruit_I2C import Adafruit_I2C
    from time import sleep
    
    # initialize i2c connection to MPU6050
    # i2c address is 0x68
    i2c = Adafruit_I2C(0x68)
    
    # wake up the device (out of sleep mode)
    # bit 6 on register 0x6B set to 0
    i2c.write8(0x6B, 0)
    
    print("X axis accelerations (in g's)")
    
    # read and print acceleration on x axis
    # Most significant byte on 0x3b
    # Least significant byte on 0x3c
    # Combined to obtain raw acceleration data
    for x in range(0, 5):
        # getting values from the registers
        b = i2c.readS8(0x3b)
        s = i2c.readU8(0x3c)
        # converting 2 8 bit words into a 16 bit
        # signed "raw" value
        raw = b * 256 + s
        # still needs to be converted into G-forces
        g = raw / 16384.
        print (str(g))
        sleep(0.2)
    

#### References

  * Ben Heck's Introduction to Interfaces video on [Youtube](http://youtu.be/nMZJwspSkAc?t=2m57s)
  * Derek Molloy's [I2C Beaglebone Tutorial](http://derekmolloy.ie/beaglebone/beaglebone-an-i2c-tutorial-interfacing-to-a-bma180-accelerometer/)
  * [I2C Tools Documentation](http://www.lm-sensors.org/wiki/i2cToolsDocumentation)
  * I2C Device Library's [MPU 6050 Documentation](http://www.i2cdevlib.com/devices/mpu6050)
  * BeagleBoard's email list on [I2C and Invensense MPU6050 Driver](https://groups.google.com/d/topic/beagleboard/hqqecmOjpTU/discussion)

