const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;
const Schema = mongoose.Schema;

const userPrefSchema = new Schema({
   _id: ObjectId,
   user_id: ObjectId,
   prefRecipe_id: [ObjectId],
   dateOfOpening: { type: Date, default: Date.now },
});

module.exports = mongoose.model("userPref", userPrefSchema);