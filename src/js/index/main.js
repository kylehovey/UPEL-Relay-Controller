$(() => {
  // Create the application
  (window.app = new App()).init();

  // Set listeners
  $("#active-relay-select").on('click', e => {
    // Set the relay
    app.setActiveRelay(
      $(e.target)
        .find("input")
        .data("value")
    );

    // Update app view
    app.updateButtonView();
  });
});
