const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;
const Schema = mongoose.Schema;

const userSchema = new Schema({
   _id: ObjectId,
   name: String,
   email: {type: String, unique: true},
   phone: String,
   biography: String,
   password: String,
   dateOfOpening: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", userSchema);
