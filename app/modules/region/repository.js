class RegionRepository {
  constructor() {
    this.connection = require('./region.do');
  }

  async getOne(id) {
    try{
      return await this.connection.findById(id)
        .select('-__v');
    } catch(error){
      throw error;
    }
  }

  async getOneBy(query) {
    try {
      return await this.connection.findOne(query)
        .select('-__v');
    } catch (error) {
      throw error;
    }
  }

  async persist(payload) {
    try {
      let data;

      if (payload.id) {
        data = await update.bind(this)(payload);
      } else {
        data = await save.bind(this)(payload);
      }

      data.__v = undefined;
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAll(skip = 0, limit = 20) {
    try {
      return await this.connection
        .find()
        .select('-__v')
        .sort({ createdAt: -1 })
        .skip(parseInt(skip))
        .limit(parseInt(limit));
    } catch (error) {
      throw error;
    }
  }

  async getAllBy(query, skip = 0, limit = 20) {
    try {
      return await this.connection
        .find(query)
        .select('-__v')
        .sort({ createdAt: -1 })
        .skip(parseInt(skip))
        .limit(parseInt(limit));
    } catch (error) {
      throw error;
    }
  }

  async countBy(condition) {
    try {
      return await this.connection.countDocuments(condition);
    } catch (error) {
      throw error;
    }
  }
}

async function update(payload) {
  try {
    const data = await this.connection.findById(payload._id);
    if (!data) {
      throw { status: 404, error: 'Region not found' };
    }

    payload.updatedAt = new Date();

    await this.connection.updateOne({ _id: payload._id }, payload);

    return await this.connection
      .findById(payload._id)
      .select('-__v');
  } catch (error) {
    throw error;
  }
}

async function save(payload) {
  try {
    const data = await this.connection.create(payload);
    return await this.connection
      .findById(data._id)
      .select('-__v');
  } catch (error) {
    if (error.name && error.name === 'ValidationError') {
      throw {
        status: 400,
        error: error.errors[Object.keys(error.errors)[0]].message,
      };
    }
    throw error;
  }
}

module.exports = RegionRepository;