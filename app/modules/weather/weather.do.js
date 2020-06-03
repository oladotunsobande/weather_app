const mongoose = require('mongoose');
const { Schema } = mongoose;

const connection = require('../../config/db');

const WeatherSchema = new Schema(
  {
    id: {
      required: [true, 'Id is required'],
      unique: 'Id exists ({VALUE})',
      trim: true
    },
    region: {
      type: Schema.Types.ObjectId,
      ref: 'Region',
      required: true
    },
    details: [
      {
        weatherDate: { type: Date, required: true },
        info: { type: {}, required: true }
      }
    ]
  },
  { timestamps: true }
);

WeatherSchema.index({
  id: 'text'
});

module.exports = connection.model('Weather', WeatherSchema);