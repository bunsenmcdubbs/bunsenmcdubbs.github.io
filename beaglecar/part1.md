# Part 1: Sensors and Interfaces

written on 1/5/2014 updated 1/12/2014

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

### Test script

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

## Adafruit Ultimate GPS Breakout (v3)

Adafruit's breakout is 5 volt tolerant which is a bonus for Arduino
compatibility but not necessary for this project since the Beaglebone is a 3.3
volt device. It communicates over a serial UART connection and is fairly easy 
to setup with the BBB.

(After encountering numerous issues with [gpsd](http://catb.org/gpsd/) I 
chose to reflash the BBB with Ubuntu. Maybe I'll write a guide in the future
but just Google'ing "beaglebone flash ubuntu" should be sufficient)

My plan is to use gpsd to do the dirty work of interpretting the raw NMEA 
sentences from the breakout and then use the Python interface to write a client
to handle all the data and control the robot (and even pass it into ROS ... if
I can get it to install on UbuntuARM 13.04).

### Wiring up the GPS

The breakout has numerous additional features but for now I'm just trying to get
basic funcationlity out of the device. UART is just serial communication.
This just means that a wire connects the transmit (TX) pin of one device to the
receive (RX) pin of the other and vice versa. Knowing this, I connected TX on 
the breakout to RX of UART1 (pin 9_26) on the Beaglebone and RX to TX (pin 
9_24). VIN connects to 3.3v (pin 9_3) and Gnd to ground (pin 9_1)

### Installing and Using gpsd

Sidenote: The Beaglebone community is still fairly small right now and it is
often easier to search for and follow guides for the Raspberry Pi, especially
after installing Ubuntu or Debian because of the Pi's Debian-based OS.

gpsd is a Linux daemon to parse the NMEA sentences coming from GPS devices. 
By using it, I can concentrate on using the GPS data rather than dealing with
the nitty gritty details of parsing text (and opens up the possibility of using
other GPS devices that have slightly different formats - yay portability!).

gpsd comes in several packages. `gpsd` is the core package containing the
daemon, `gpsd-clients` has several test clients, and `python-gps` installs
the Python library to communicate with gpsd (I know for a fact that 
`python-gps` is not a package available on Angstrom - it is under a different
name). 

After running into a [brick wall](http://pastie.org/8597750) with gpsd on
Angstrom, I elected to switch to Ubuntu and reflashed the BBB. 

On Ubuntu, I installed gpsd with

    sudo apt-get install gpsd gpsd-clients python-gpsd

Then with the breakout board wired up (TX and RX as well as VIN to 3.3V and GND
to ground), I started gpsd and pointed it to UART1 where the device lived.

    gpsd -n /dev/ttyO1 -F /var/run/gpsd.sock
    cgps

  * `-n` tells gpsd not to wait for client requests and immediately start
posting GPS data. This is useful for testing and debugging. If power consumption
 is important, you might consider leaving out that option.

  * `/dev/ttyO1` (that is an "O" not "0") is the location of the serial
connection. gpsd defaults to `/dev/USB0` for USB devices.

  * `-F /var/run/gpsd.sock` ... I don't actually know why this is necessary...
maybe defaults sometimes aren't correct?

  * `cgps` is a console gps test client to test if everything is working. Keep 
in mind that GPS devices take a while to lock on a signal. If you just plugged
in the device it might not be able to display any location information for 
upto 15 minutes.

If that doesn't work...

  * Visit the 
[gpsd troubleshooting page](http://www.catb.org/gpsd/troubleshooting.html)
  * And if you are still on Angstrom, install Ubuntu.

### References

  * Ben Heck's Introduction to Interfaces video on [Youtube](http://youtu.be/nMZJwspSkAc?t=2m57s)
  * Derek Molloy's [I2C Beaglebone Tutorial](http://derekmolloy.ie/beaglebone/beaglebone-an-i2c-tutorial-interfacing-to-a-bma180-accelerometer/)
  * [I2C Tools Documentation](http://www.lm-sensors.org/wiki/i2cToolsDocumentation)
  * I2C Device Library's [MPU 6050 Documentation](http://www.i2cdevlib.com/devices/mpu6050)
  * BeagleBoard's email list on [I2C and Invensense MPU6050 Driver](https://groups.google.com/d/topic/beagleboard/hqqecmOjpTU/discussion)
  * [gpsd](http://www.catb.org/gpsd/)
  * [Adafruit's Guide for GPS Breakout and Raspberry Pi](http://learn.adafruit.com/adafruit-ultimate-gps-on-the-raspberry-pi)
