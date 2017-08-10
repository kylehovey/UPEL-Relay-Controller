class App {
  constructor() {
    // Init active relay control
    this.activeRelay = 0;
  }

  /**
   * Run an API command
   * @param {String} command Command to execute
   * @param {Object} data Data to send
   * @return {Promise}
   */
  async runCommand(command, data) {
    return (await $.post({
      url : "/api",
      data : {
        command,
        data : JSON.stringify(data)
      }
    })).results;
  }

  /**
   * Initialize application
   */
  async init() {

    // Get the current state of each relay
    this.buttonStates = await this.runCommand("getStatus");

    // Create the main button
    this.bigButton = new BigButton({
      containerID : "main-button",
      name : "Main Button",
      text : this.buttonStates[this.activeRelay] ?
        `Deactivate Relay ${this.activeRelay + 1}` :
        `Activate Relay ${this.activeRelay + 1}`,
      onClick : () => {
        // Invert button state
        let state
          = this.buttonStates[this.activeRelay]
          = !this.buttonStates[this.activeRelay];

        // Run the command
        this.runCommand("set", {
          number : this.activeRelay,
          state
        })
          .then(console.log)
          .catch(console.log)

        // Fencepost name for relay
        let relayNo = this.activeRelay + 1;

        // Set button text accordingly
        app.bigButton.setText(state ?
          `Deactivate Relay ${relayNo}` :
          `Activate Relay ${relayNo}`
        );
      }
    });
  }
};
