const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const StudentSchedule = require("./models/StudentSchedule");

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

// app.post("/api/schedules", async (req, res) => {
//   const { courseId } = req.body;
//   const schedule = await StudentSchedule.findOne({ studentId: req.user.id });
//   const course = await Course.findById(courseId);
//   schedule.courses.push(course);
//   await schedule.save();
//   res.status(201).json(schedule);
// });

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

app.post("/api/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // 检查是否已有用户
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建新用户
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 生成 token 并返回
    const token = jwt.sign({ id: user._id }, "secretKey");
    return res.status(200).json({ token, role: user.role, userId: user.id });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// 验证中间件
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// 测试保护路由
app.get("/api/protected", authMiddleware, (req, res) => {
  res.status(200).json({ message: "You are authorized", user: req.user });
});

app.get("/api/student/courses", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Access denied" });
    }
    const courses = await Course.find(); // 示例：获取所有课程
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student courses", error });
  }
});

app.get("/api/teacher/courses", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied" });
    }
    const courses = await Course.find(); // 示例：获取所有课程
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teacher courses", error });
  }
});

app.post("/api/cart", async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    // 查找课程是否存在
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 查找学生的课程安排（studentschedule）
    let schedule = await StudentSchedule.findOne({ studentId: userId });
    if (!schedule) {
      // 如果学生没有 schedule，则创建一个新的
      schedule = new StudentSchedule({ studentId: userId, courses: [] });
    }

    // 检查课程是否已经在购物车或已注册
    const exists = schedule.courses.some(
      (c) => c.courseId.toString() === courseId && c.status === "cart"
    );
    if (exists) {
      return res.status(400).json({ message: "Course already in cart" });
    }

    // 添加到购物车
    schedule.courses.push({
      courseId: course._id,
      name: course.name,
      instructor: course.instructor,
      credits: course.credits,
      status: "cart",
    });

    await schedule.save();
    console.log("Schedule saved successfully!");
    res.status(201).json(schedule);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

app.post("/api/enroll", async (req, res) => {
  const { userId } = req.body;

  try {
    // 查找学生的课程安排
    const schedule = await StudentSchedule.findOne({ studentId: userId });
    if (!schedule) {
      return res.status(404).json({ message: "No courses in cart to enroll" });
    }

    // 将购物车中的课程状态更新为 "enrolled"
    schedule.courses.forEach((course) => {
      if (course.status === "cart") {
        course.status = "enrolled";
      }
    });

    await schedule.save();
    res.status(200).json(schedule);
  } catch (error) {
    console.error("Error enrolling courses:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

app.post("/api/unenroll", async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const schedule = await StudentSchedule.findOne({ studentId: userId });
    if (!schedule)
      return res.status(404).json({ message: "No enrolled courses found" });

    schedule.courses = schedule.courses.filter(
      (c) => c.courseId.toString() !== courseId || c.status !== "enrolled"
    );

    await schedule.save();
    res.status(200).json({ message: "Course unenrolled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error unenrolling course", error });
  }
});

app.get("/api/cart/:userId", async (req, res) => {
  const { userId } = req.params;
  const schedule = await StudentSchedule.findOne({ studentId: userId });
  const cart = schedule
    ? schedule.courses.filter((c) => c.status === "cart")
    : [];
  res.status(200).json(cart);
});

app.get("/api/enrolled/:userId", async (req, res) => {
  const { userId } = req.params;
  const schedule = await StudentSchedule.findOne({ studentId: userId });
  const enrolled = schedule
    ? schedule.courses.filter((c) => c.status === "enrolled")
    : [];
  res.status(200).json(enrolled);
});

// 移除课程从购物车
app.post("/api/cart/remove", async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const schedule = await StudentSchedule.findOne({ studentId: userId });

    schedule.cart = schedule.cart.filter((id) => id !== courseId);
    await schedule.save();

    res.status(200).json({ message: "Course removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Error removing course from cart", error });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
