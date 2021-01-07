const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  ticker: { type: String, required: true },
  name: { type: String, required: true },
  qty: { type: String, required: true },
  price: { type: String, required: true },
  currency: { type: String, required: true },
  date: { type: String, required: true },
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Stock", schema);
