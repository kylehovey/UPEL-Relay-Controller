var express = require('express');
var router = express.Router();

const pinMap = require('config.json')('config/config.json').pinMap;

/**
 * Set up the GPIO pins in the map for output
 */
{
  // TODO
}

/**
 * Set the GPIO state of mapped pins to either high or low
 * @param {Number} index Index of pin to set high
 * @param {Boolean} state State to set
 * @return {Promise}
 */
function setGPIO(index, state) {
  return new Promise((resolve, reject) => {
    // Grab the right GPIO pin
    let pin = pinMap[index];

    // Make sure we have a valid pin
    if (!pin) {
      reject("Index not within mapped range");
    }

    // Set the output
    // TODO
    resolve(true);
  });
}

/**
 * Get the current status of each mapped pin
 * @return {Promise}
 */
function getStatus() {
  return new Promise((resolve, reject) => {
    resolve([
      true,
      false,
      false
    ]);
  });
}

/* GET home page. */
router.post('/', async function(req, res, next) {
  // Parse data out
  let
    data = req.body.data ? JSON.parse(req.body.data) : new Object,
    command = req.body.command;
  
  console.log({
    data,
    command
  });

  // Command logic
  switch (command) {
    case "getStatus":
      getStatus()
        .then(results => {
          res.json({
            success : true,
            results
          });
        })
        .catch(err => {
          console.log(err);

          res.json({
            success : false,
            message : "Could not acquire status."
          });
        });
      break;
    case "set":
      /*
       * Data comes in like this:
       *  {
       *    number : [1-3],
       *    state : [true,false]
       *  }
      */

      // Set the GPIO accordingly
      setGPIO(data.number, data.state)
        .then(status => {
          res.json({
            success : status,
            results : status
          });
        })
        .catch(err => {
          console.log(err);

          res.status(500).send({
            success : false,
            message : "Error in executing command."
          });
        });

      break;
    default:
      res.status(400).send({
        success : false,
        message : "Command not found."
      });
      break;
  }
});

module.exports = router;
