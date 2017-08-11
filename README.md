# UPEL-Relay-Controller
## Node.js app for controlling relays via Raspberry Pi GPIO.

# Installing

This relay control software is designed to run on the [Raspberry Pi 3 Model B](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/). Wireless connection of the Pi is not required, but if you would like to control the interface from your phone, laptop, or tablet, then WiFi connection is required. To get everything set up:

1. Flash the SD card on the Pi with [Raspbian](https://www.raspberrypi.org/downloads/raspbian/) using any of the popular methods.
2. Install [Node.js](https://nodejs.org/en/) on the Pi using [(Node Version Manager (nvm)](https://github.com/blobsmith/raspberryTestNode/wiki/Node.js-installation-with-nvm-on-Raspberry-pi). This is done by executing `nvm install 8.0.0` then `nvm use 8.0.0` in the shell. This relay control software requires Node.js to be at least version 8.
3. Compiling of client-side JavaScript files requires the automation utility `gulp`. Install it by running `npm install -g gulp` after node is installed.
4. Clone this repository onto the Pi.
5. In a shell on the Pi, `cd` into the repo directory and run `npm install`.
6. After that, run `gulp` while inside of the repo to compile client-side JS and CSS.
7. Now run `npm start` from within the repository to start the application.
8. At this point you can now navigate to http://localhost:3000 on the Pi (or http://[Pi's IP Address]:3000 if viewing from your phone/laptop/tablet) to use the applicaiton.
9. Make sure that 12V power is plugged in for the relay control board, otherwise the relays will not fire.
