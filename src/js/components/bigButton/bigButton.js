class BigButton {
  /**
   * Construct a giant button that does something important.
   * @param {String} options.containerID - ID of container to place button
   * @param {String} options.name - Name of button
   * @param {String} options.text - Text of button
   */
  constructor(options) {
    // Save name
    this.name = options.name.replace(/ /g, "");

    // Create and save button
    this.button = $(`#${options.containerID}`)
      .append(`<div class="dramatic-button" id="${this.name}-button">${options.text}</div>`)
      .on('click', options.onClick)
      .find(".dramatic-button");
  }

  /**
   * Set the button text
   * @param {String} text Text to set
   */
  setText(text) {
    this.button.text(text);
  }

  /**
   * Start the loading animation
   */
  startLoading() {
    this.button.addClass("loading");
  }

  /**
   * Stop the loading animation
   */
  stopLoading() {
    this.button.removeClass("loading");
  }

  /**
   * Set the loading animation by argument
   * @param {Boolean} state Loading state
   */
  setLoading(state) {
    if (state) {
      this.startLoading();
    } else {
      this.stopLoading();
    }
  }
};
