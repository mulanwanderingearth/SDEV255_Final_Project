const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://IvytechXinLi:test1234@cluster0.2tqvg.mongodb.net/My_academy_system?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const courseSchema = new mongoose.Schema({
  id: Number,
  name: String,
  code: String,
  description: String,
  credits: Number,
  instructor: String,
});

const Course = mongoose.model("Course", courseSchema);

app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
});
app.post("/api/schedules", async (req, res) => {
  const { courseId } = req.body;
  const schedule = await StudentSchedule.findOne({ studentId: req.user.id });
  const course = await Course.findById(courseId);
  schedule.courses.push(course);
  await schedule.save();
  res.status(201).json(schedule);
});
app.post("/api/courses", async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: "Error adding course", error });
  }
});
app.put("/api/courses/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
    });
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Error updating course", error });
  }
});

app.delete("/api/courses/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    await Course.findByIdAndDelete(courseId);
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
