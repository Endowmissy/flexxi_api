const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Image schema
const ImageSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  photo_url: {
    type: String,
  },
  keywords: {
    type: String,
  }
},
{ timestamps: true });

ImageSchema.index({"$**":"text"})

module.exports = mongoose.model("Image", ImageSchema);
