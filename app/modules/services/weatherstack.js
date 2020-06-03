const axios = require('axios');

async function callWeatherStackApi(query){
  try{
    const headerConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const path = `?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${query}`;
    const url = `${process.env.WEATHERSTACK_BASE_URL}${CURRENT_WEATHER_PATH}${path}`;

    let response = await axios.get(
      url,
      headerConfig
    );
    
    if(!response.data.success){
      throw response.data.error.info;
    }

    return response.data;
  } catch(error){
    console.error(`WeatherStack Error: ${JSON.stringify(error)}`);

    let msg = (typeof error == 'string') ? error : 'Error occurred';
    throw `WeatherStack - ${msg}`;
  }
}

module.exports = {
  callWeatherStackApi
};