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
      .on('click', options.onClick);
  }
};
