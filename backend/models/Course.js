const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  id: { type: ObjectId, unique: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String },
  credits: { type: Number, required: true },
  instructor: { type: String, required: true },
});

module.exports = mongoose.model("Course", CourseSchema);
