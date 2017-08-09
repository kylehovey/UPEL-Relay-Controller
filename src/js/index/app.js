class App {
  constructor() {}

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
    let 
      activeRelay = 0,
      buttonStates = await runCommand("getStatus");

    // Create the main button
    this.bigButton = new BigButton({
      containerID : "main-button",
      name : "Main Button",
      text : buttonStates[activeRelay] ? "Deactivate" : "Activate",
      onClick : () => {
        // Invert button state
        let state = buttonStates[activeRelay] = !buttonStates[activeRelay];

        // Set button text accordingly
        app.bigButton.setText(state ? "Deactivate" : "Activate");

        // Run the command
        runCommand("set", {
          number : activeRelay,
          state
        })
          .then(console.log)
          .catch(console.log)
      }
    });
  }
};
