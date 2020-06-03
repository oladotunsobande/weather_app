const expect = require('expect');

const {
  newRegion,
  regionWithoutCity,
  regionWithoutCountry,
  savedRegion,
  unsavedRegion
} = require('../mock');
const service = require('../../app/modules/region/service');

describe('Regions Test', () => {

  it("should create new region", async () => {
    try{
      const region = await service.addRegion(newRegion);
      if(region.success) {
        newRegion._id = region._id;
        newRegion.id = region.id;
      }

      expect(region.status).toBe(200);
      expect(region.success).toBe(true);
      expect(region.message).toBe('City added successfully');
    } catch(error){
      console.log(error);
    }
  });

  it("should return 'City exists'", async () => {
    try{
      const region = await service.addRegion(newRegion);
    } catch(error){
      console.log(error);

      expect(error.status).toBe(409);
      expect(error.success).toBe(false);
      expect(error.message).toBe('City exists');
    }
  });

  it("(Add region) should return 'city is required'", async () => {
    try{
      const region = await service.addRegion(regionWithoutCity);
    } catch(error){
      console.log(error);

      expect(error.status).toBe(400);
      expect(error.success).toBe(false);
      expect(error.message).toBe("'city' is required");
    }
  });

  it("should return 'country is required'", async () => {
    try{
      const region = await service.addRegion(regionWithoutCountry);
    } catch(error){
      console.log(error);
      
      expect(error.status).toBe(400);
      expect(error.success).toBe(false);
      expect(error.message).toBe("'country' is required");
    }
  });

  it("should return region", async () => {
    try{
      const region = await service.getRegionByName(savedRegion);
      
      expect(region.status).toBe(200);
      expect(region.success).toBe(true);
      expect(typeof region.data).toBe('object');
      expect(region.data.city).toBe(savedRegion.city.toLowerCase());
    } catch(error){
      console.log(error);
    }
  });

  it("should return 'City not found", async () => {
    try{
      const region = await service.getRegionByName(unsavedRegion);
    } catch(error){
      console.log(error);

      expect(error.status).toBe(404);
      expect(error.success).toBe(false);
      expect(error.error).toBe('City not found');
    }
  });

  it("(Fetch region) should return 'city is required'", async () => {
    try{
      const region = await service.getRegionByName(null);
    } catch(error){
      console.log(error);

      expect(error.status).toBe(400);
      expect(error.success).toBe(false);
      expect(error.message).toBe("'city' is required");
    }
  });

  it("should return all regions", async () => {
    try{
      const region = await service.getAllRegions(0, 20);
      
      expect(region.status).toBe(200);
      expect(region.success).toBe(true);
      expect(Array.isArray(region.data)).toBe(true);
    } catch(error){
      console.log(error);
    }
  });
});