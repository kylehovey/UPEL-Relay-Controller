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
   * Get the active state
   * @return {Boolean}
   */
  getActiveState() {
    return this.buttonStates[this.activeRelay];
  }

  /**
   * Set the button text and state accordingly
   */
  updateButtonView() {
    // Fencepost name for relay
    let relayNo = this.activeRelay + 1;

    // Set button text accordingly
    app.bigButton.setText(this.getActiveState() ?
      `Deactivate Relay ${relayNo}` :
      `Activate Relay ${relayNo}`
    );

    // Set button loading animation
    app.bigButton.setLoading(this.getActiveState());
  }

  /**
   * Toggle the current active state
   */
  toggleState() {
    // Invert button state
    let state
      = this.buttonStates[this.activeRelay]
      = !this.getActiveState();
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
      text : this.getActiveState() ?
        `Deactivate Relay ${this.activeRelay + 1}` :
        `Activate Relay ${this.activeRelay + 1}`,
      onClick : () => {
        // Run the command
        this.runCommand("set", {
          number : this.activeRelay,
          state : this.getActiveState()
        })
          .then(console.log)
          .catch(console.log)

        // Toggle this model
        this.toggleState();

        // Update the view
        this.updateButtonView();
      }
    });
  }
};
