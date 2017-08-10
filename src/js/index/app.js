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
   * Send a command to update relay state based upon current active state
   * @return {Promise}
   */
  async sendSet() {
    // Run the command
    return this.runCommand("set", {
      number : this.activeRelay,
      state : this.getActiveState()
    })
      .then(console.log)
      .catch(console.log)
  }

  /**
   * Set the active relay
   * @param {Number} index Index of relay to set
   */
  setActiveRelay(index) {
    this.activeRelay = index;
  }

  /**
   * Get the active state
   * @return {Boolean}
   */
  getActiveState() {
    return this.buttonStates[this.activeRelay];
  }

  /**
   * Get button text based upon active state
   * @return {String}
   */
  getButtonText() {
    // Fencepost name for relay
    let relayNo = this.activeRelay + 1;

    return this.getActiveState() ?
      `Deactivate Relay ${relayNo}` :
      `Activate Relay ${relayNo}`;
  }

  /**
   * Set the button text and state accordingly
   */
  updateButtonView() {
    // Fencepost name for relay
    let relayNo = this.activeRelay + 1;

    // Set button text accordingly
    app.bigButton.setText(this.getButtonText());

    // Set button loading animation
    app.bigButton.setLoading(this.getActiveState());

    // Update the colors of the checkbox group
    // TODO: Find out some way to not hard code this
    $("#active-relay-select")
      .find("label")
      .removeClass("btn-danger btn-success")
      .each(function (index) {
        $(this).addClass(app.buttonStates[index] ? "btn-success" : "btn-danger");
      });
  }

  /**
   * Toggle the current active state
   */
  toggleState() {
    // Invert button state
    this.buttonStates[this.activeRelay] = !this.getActiveState();
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
      text : this.getButtonText(),
      onClick : async () => {
        // Send the set command
        await this.sendSet();

        // Toggle this model
        this.toggleState();

        // Update the view
        this.updateButtonView();
      }
    });

    // Update the view
    this.updateButtonView();
  }
};
