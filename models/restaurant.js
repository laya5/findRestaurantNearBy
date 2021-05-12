const mongoose = require("mongoose");
const RestaurantSchema = new mongoose.Schema({
  nameofRestaurant: {
    type: String,
    required: true,
    index: true,
    unique: true,
    sparse: true,
  },
  DescriptionofRestaurant: {
    type: String,
    default: "",
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
    },
    Latitude: {
      type: Number, // first comes latitude  in degrees
    },
    Longitude: {
      type: Number,
    },
  },
  ratings: {
    type: Array,
    max: 5,
    min: 1,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Restaurant", RestaurantSchema);
