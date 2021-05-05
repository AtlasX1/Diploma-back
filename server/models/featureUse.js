const { model, Schema, Types } = require("mongoose");

const schema = new Schema({
  description: {
    type: String,
  },
  feature: {
    type: Types.ObjectId,
    ref: "Feature",
  },
});

module.exports = model("FeatureUse", schema);
