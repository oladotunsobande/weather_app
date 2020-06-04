const Joi = require('@hapi/joi');
const { v4: uuidv4 } = require('uuid');

const RegionRepository = new (require('./repository'))();

exports.addRegion = async function (args) {
  try{
    const schema = Joi.object().keys({
      city: Joi.string().required(),
      country: Joi.string().required()
    });
    const validation = schema.validate({ ...args });
    if(validation.error){
      return {
        status: 400, 
        success: false,
        error: validation.error.details[0].message 
      };
    }

    const region = await RegionRepository.getOneBy({ city: args.city.toLowerCase().trim() });
    if(region){
      return {
        status: 409,
        success: false,
        error: 'City exists'
      };
    }

    const doc = {
      id: uuidv4(),
      city: args.city.toLowerCase(),
      country: args.country
    };
    const new_region = await RegionRepository.persist(doc);

    return {
      status: 200, 
      success: true,
      message: 'City added successfully',
      data: new_region
    };
  } catch(error){
    throw error;
  }
}

exports.getRegionByName = async function (args) {
  try{
    const schema = Joi.object().keys({
      city: Joi.string().required(),
    });
    const validation = schema.validate({ ...args });
    if(validation.error){
      return {
        status: 400, 
        success: false,
        error: validation.error.details[0].message 
      };
    }

    const region = await RegionRepository.getOneBy({ city: args.city.toLowerCase().trim() });
    if(!region){
      return {
        status: 404,
        success: false,
        error: 'City not found'
      };
    }

    return {
      status: 200, 
      success: true,
      data: region
    };
  } catch(error){
    throw error;
  }
}

exports.getAllRegions = async function (args) {
  try{
    const schema = Joi.object().keys({
      skip: Joi.string().optional(),
      limit: Joi.string().optional()
    });
    const validation = schema.validate({ ...args });
    if(validation.error){
      return {
        status: 400, 
        success: false,
        error: validation.error.details[0].message 
      };
    }

    const regions = await RegionRepository.getAll(args.skip, args.limit);

    return {
      status: 200, 
      success: true,
      data: regions
    };
  } catch(error){
    throw error;
  }
}