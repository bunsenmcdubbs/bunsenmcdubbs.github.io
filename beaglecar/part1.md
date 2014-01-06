# Part 1: Sensors and Interfaces

written on 1/5/2014

## MPU-6050

### Connecting the board

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

### Probing with i2c-tools

I tested this connection with the `i2c-tools` already installed in the default
Angstrom distribution. `i2cdetect` looks for any I2C devices connected to a
specified bus (in our case i2c bus 1). `i2cdump` reads all of the information
from a specified I2C device; `i2cget` and `i2cset` work in the same way on
specific memory registers on a device.

<script src="https://gist.github.com/BunsenMcDubbs/8278364.js"></script>
    
Reading through the [Invensense
documentation](http://invensense.com/mems/gyro/documents/RM-MPU-6000A.pdf)
reveals that bit 6 on register 0x6b must be set to 0 for the device to exit
sleep mode. Currently register 0x6b is 0x40 or 0b0100000, meaning that the 6th
bit is 1 and the device is sleeping (bits are counted right to left with the
right-most bit being bit 0 and the left-most bit 7). Using `i2cset -y 1 0x68
0x6b 0x00` sets the register to all zeros and then a call to `i2cdump -y 1
0x68` shows that the sensor is active.

### Test script

I wrote this little test script to at least get some meaningful values from
the sensor. It uses the [Adafruit_BBIO library](http://learn.adafruit.com
/setting-up-io-python-library-on-beaglebone-black) to do the I2C interface
heavy lifting. All it does is print the acceleration on the x axis in g's to
the console. The code is also on my [github](https://github.com/BunsenMcDubbs/
BeagleCar/blob/master/src/test/xaccel.py).

<script src="https://gist.github.com/BunsenMcDubbs/8278435.js"></script>

### References

  * Ben Heck's Introduction to Interfaces video on [Youtube](http://youtu.be/nMZJwspSkAc?t=2m57s)
  * Derek Molloy's [I2C Beaglebone Tutorial](http://derekmolloy.ie/beaglebone/beaglebone-an-i2c-tutorial-interfacing-to-a-bma180-accelerometer/)
  * [I2C Tools Documentation](http://www.lm-sensors.org/wiki/i2cToolsDocumentation)
  * I2C Device Library's [MPU 6050 Documentation](http://www.i2cdevlib.com/devices/mpu6050)
  * BeagleBoard's email list on [I2C and Invensense MPU6050 Driver](https://groups.google.com/d/topic/beagleboard/hqqecmOjpTU/discussion)

