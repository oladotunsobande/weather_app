const Joi = require('@hapi/joi');
const { v4: uuidv4 } = require('uuid');

const { 
  addRegion, 
  getRegionByName 
} = require('../region/service');
const { callWeatherStackApi } = require('../services/weatherstack');
const WeatherRepository = new (require('./repository'))();

function getCurrentDate(queryDate = null){
  let isoDate;

  if(queryDate){
    isoDate = new Date(queryDate).toISOString();
  } else{
    isoDate = new Date().toISOString();
  }

  return isoDate.split('T')[0];
}

exports.getWeatherByCity = async function (args) {
  try{
    const schema = Joi.object().keys({
      city: Joi.string().required(),
      searchDate: Joi.date().optional()
    });
    const validation = schema.validate({ ...args });
    if(validation.error){
      return {
        status: 400, 
        success: false,
        error: validation.error.details[0].message 
      };
    }

    let details;
    let callAPI = false;
    let weather;

    const currentDate = (args.searchDate) ? getCurrentDate(args.searchDate) : getCurrentDate();

    const region = await getRegionByName({ city: args.city });
    if(region.success){
      weather = await WeatherRepository.getOneBy({ region: region._id });
      if(!weather){
        callAPI = true;
      } else{
        const info = weather.details;

        const data = info.filter((vl) => {
          return vl.weatherDate.startsWith(currentDate);
        });

        if(data.length == 0){
          callAPI = true;
        } else{
          details = data[0].info;
        }
      }
    } else{
      callAPI = true;
    }

    if(callAPI){
      // Call weatherstack api
      try{
        const resp = await callWeatherStackApi(args.city);
      
        details = resp.current;

        // Save city weather data to db
        if(region.success && weather){
          weather.details.push({
            weatherDate: new Date(currentDate),
            info: resp.current
          });

          await WeatherRepository.persist(weather);
        } 
        else if(region.success && !weather){
          await WeatherRepository.persist({
            id: uuidv4(),
            region: region.data._id,
            details: {
              weatherDate: new Date(currentDate),
              info: resp.current
            }
          })
        } 
        else{
          const new_region = await addRegion({
            city: args.city,
            country: resp.location.country
          });

          await WeatherRepository.persist({
            id: uuidv4(),
            region: new_region.data._id,
            details: {
              weatherDate: new Date(currentDate),
              info: resp.current
            }
          });
        }

      } catch(err){
        throw err;
      }
    }

    return {
      status: 200,
      success: true,
      data: details
    };
  } catch(error){
    throw {
      status: 500,
      success: false,
      error
    };
  }
}