const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  ticker: { type: String, required: true },
  profit: { type: Number, required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Profit", schema);
