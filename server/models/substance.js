const { model, Schema, Types } = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
    require: true,
  },

  description: {
    type: String,
  },

  disease: [{ type: Types.ObjectId, ref: "Disease" }],
  contraindicationDrug: [String],
  contraindicationHuman: [{ type: Types.ObjectId, ref: "Feature" }],
  featureUse: [{ type: Types.ObjectId, ref: "FeatureUse" }],
});

module.exports = model("Substance", schema);
