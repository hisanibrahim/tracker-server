const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    speed: Number,
  },
});

// parent schema
const trackSchema = new mongoose.Schema({
  userId: {
    // this is how refer id from another schema
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    default: "",
  },

  // list of point objects to define track, that defined as another schema
  // and embeded in trackSchema
  locations: [pointSchema],
});

// we dont really need to tie pointSchema to mongoose
// only trackSchema will have collections
// all pontSchema objects are embeded in trackSchema
mongoose.model("Track", trackSchema);
