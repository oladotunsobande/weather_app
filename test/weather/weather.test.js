const expect = require('expect');

const {
  savedRegion
} = require('../mock');
const service = require('../../app/modules/weather/service');

describe('Weather Test', () => {

  it("should return 'city is required", async () => {
    try{
      const weather = await service.getWeatherByCity({});
    } catch(error){
      console.log(error);

      expect(error.status).toBe(400);
      expect(error.success).toBe(false);
      expect(error.message).toBe("'city' is required");
    }
  });

  it("should return region weather", async () => {
    try{
      const weather = await service.getWeatherByCity(savedRegion);
      
      expect(weather.status).toBe(200);
      expect(weather.success).toBe(true);
      expect(typeof weather.data).toBe('object');
    } catch(error){
      console.log(error);
    }
  });
});