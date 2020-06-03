const mongoose = require('mongoose');
const { Schema } = mongoose;

const connection = require('../../config/db');

const RegionSchema = new Schema(
  {
    id: {
      required: [true, 'Id is required'],
      unique: 'Id exists ({VALUE})',
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City name is required'],
      unique: 'City exists ({VALUE})',
      trim: true
    },
    country: {
      type: String,
      required: false,
      trim: true
    },
    continent: {
      type: String,
      required: false,
      trim: true
    }
  },
  { timestamps: true }
);

RegionSchema.index({
  id: 'text',
  city: 'text',
  country: 'text',
  continent: 'text'
});

module.exports = connection.model('Region', RegionSchema);