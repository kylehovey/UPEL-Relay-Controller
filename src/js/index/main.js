$(() => {
  // Create the application
  (window.app = new App()).init();

  // Set listeners
  $("#active-relay-select").on('click', e => {
    // Set the relay
    let i = app.activeRelay = $(e.target)
      .find("input")
      .data("value");

    // Set button text accordingly
    app.bigButton.setText(app.buttonStates[i] ? `Deactivate Relay ${i + 1}` : `Activate Relay ${i + 1}`);
  });
});
