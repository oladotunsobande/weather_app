'use strict';

const service = require('./app/modules/weather/service');

function formatResponse(resp){
  const response = {
    statusCode: resp.status,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({
      success: resp.success,
      data: resp.data,
      message: resp.message,
      error: resp.error,
    })
  };

  return response;
}

module.exports.helloWorld = (event, context, callback) => {
  const data = {
    status: 200,
    success: true,
    message: 'Go Serverless v1.0! Your function executed successfully!',
    data: event,
  };

  const response = formatResponse(data);

  callback(null, response);
};

module.exports.getCityWeather = async (event, context, callback) => {
  try{
    const value = (event.queryStringParameters) ? event.queryStringParameters.city : event.city;
    const payload = { city: value };

    const data = await service.getWeatherByCity(payload);
    const response = formatResponse(data);

    callback(null, response);
  } catch(error){
    console.error(error);

    const err_resp = formatResponse(error);
    callback(null, err_resp);
  }
};
