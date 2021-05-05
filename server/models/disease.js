const { model, Schema, Types } = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
  },
  symptoms: [{ type: Types.ObjectId, ref: "Symptom" }],
});

module.exports = model("Disease", schema);
