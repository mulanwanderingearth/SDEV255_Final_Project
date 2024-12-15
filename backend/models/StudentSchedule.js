const mongoose = require("mongoose");

const StudentScheduleSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courses: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      name: String,
      instructor: String,
      credits: Number,
      status: { type: String, enum: ["cart", "enrolled"], default: "cart" },
    },
  ],
});

module.exports = mongoose.model("StudentSchedule", StudentScheduleSchema);

