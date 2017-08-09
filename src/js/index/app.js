class App {
  constructor() {
    /**
     * Run an API command
     * @param {String} command Command to execute
     * @param {Object} data Data to send
     * @return {Promise}
     */
    async function runCommand(command, data) {
      return await $.post({
        url : "/api",
        data : {
          command,
          data : JSON.stringify(data)
        }
      });
    }

    // Create the main button
    this.bigButton = new BigButton({
      containerID : "main-button",
      name : "Do It",
      text : "Do It",
      onClick : () => runCommand("set", {
        number : 1,
        state : true
      })
        .then(console.log)
        .catch(console.log)
    });
  }
};
