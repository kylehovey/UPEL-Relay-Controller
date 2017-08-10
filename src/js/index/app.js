class App {
  constructor() {
    // Init active relay control
    this.activeRelay = 0;

    // Create the wheel nav
    let wheel = new wheelnav('pie-menu');
    wheel.colors = ['#EDC951'];
    wheel.spreaderEnable = true;
    wheel.spreaderRadius = 85;
    wheel.slicePathFunction = slicePath().DonutSlice;
    wheel.clickModeRotate = false;
    wheel.createWheel([..._.range(1,4).map(x => "" + x), ...(new Array(12)).fill(null)])

    wheel.navItems.forEach((item, i) => {
      item.navigateFunction = () => {
        // Set the relay
        this.activeRelay = i;

        // Set button text accordingly
        this.bigButton.setText(this.buttonStates[i] ? `Deactivate Relay ${i + 1}` : `Activate Relay ${i + 1}`);
      }
    });
  }

  /**
   * Initialize application
   */
  async init() {
    /**
     * Run an API command
     * @param {String} command Command to execute
     * @param {Object} data Data to send
     * @return {Promise}
     */
    async function runCommand(command, data) {
      return (await $.post({
        url : "/api",
        data : {
          command,
          data : JSON.stringify(data)
        }
      })).results;
    }

    // Get the current state of each relay
    this.buttonStates = await runCommand("getStatus");

    // Create the main button
    this.bigButton = new BigButton({
      containerID : "main-button",
      name : "Main Button",
      text : this.buttonStates[this.activeRelay] ? `Deactivate Relay ${this.activeRelay + 1}` : `Activate Relay ${this.activeRelay + 1}`,
      onClick : () => {
        // Fencepost name for relay
        let relayNo = this.activeRelay + 1;

        // Invert button state
        let state = this.buttonStates[this.activeRelay] = !this.buttonStates[this.activeRelay];

        // Set button text accordingly
        app.bigButton.setText(state ? `Deactivate Relay ${relayNo}` : `Activate Relay ${relayNo}`);

        // Run the command
        runCommand("set", {
          number : this.activeRelay,
          state
        })
          .then(console.log)
          .catch(console.log)
      }
    });
  }
};
