const { model, Schema, Types } = require("mongoose");

const schema = new Schema({
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export default model("Test", schema);
