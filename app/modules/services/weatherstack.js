const axios = require('axios');

async function callWeatherStackApi(query){
  try{
    const headerConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const path = `?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${query}`;
    const url = `${process.env.WEATHERSTACK_BASE_URL}${process.env.CURRENT_WEATHER_PATH}${path}`;

    return axios.get(
      url,
      headerConfig
    )
    .then((resp) => resp.data)
    .catch((error) => {
      throw error;
    });
  } catch(error){
    console.error(`WeatherStack Error: ${JSON.stringify(error)}`);

    let msg = (typeof error == 'string') ? error : 'Error occurred';
    throw `WeatherStack - ${msg}`;
  }
}

module.exports = {
  callWeatherStackApi
};