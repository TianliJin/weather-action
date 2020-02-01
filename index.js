const core = require("@actions/core");
const github = require("@actions/github");
const request = require("request-promise");

(async () => {
  try {
    const lat = core.getInput("lat");
    const long = core.getInput("long");
    console.log(`lat: ${lat}, long: ${long}`);
    const uri = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`;

    const response = await request({
      uri: uri,
      json: true
    });
    console.log(JSON.stringify(response));

    core.setOutput("weather", response);
    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2);
    // console.log(`The event payload: ${payload}`);
  } catch (error) {
    console.log(error);
    core.setFailed(error.message);
  }
})();