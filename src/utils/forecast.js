const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=71794f37472635ea9e8d889c13d1396f&query=" +encodeURIComponent(latitude) +"," +encodeURIComponent(longitude);
    request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Invalid Location Address", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +". It is currently " +
          body.current.temperature +
          "°C. " +
          "It feels like " +
          body.current.feelslike +
          "°C." + " The humidity is "+body.current.humidity + "%."
      );
    }
  });
};

module.exports = forecast;
