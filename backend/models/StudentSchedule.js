const mongoose = require('mongoose');

const StudentScheduleSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, required: true },
  courses: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      name: String,
      code: String,
      credits: Number,
    },
  ],
});

module.exports = mongoose.model('StudentSchedule', StudentScheduleSchema);
