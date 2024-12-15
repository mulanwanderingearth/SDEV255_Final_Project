<template>
  <div class="student-dashboard">
    <h1>Student Dashboard</h1>

    <!-- 1. 课程列表 -->
    <div class="course-list">
      <h2>Available Courses</h2>
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Instructor</th>
            <th>Credits</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in availableCourses" :key="course.id">
            <td>{{ course.name }}</td>
            <td>{{ course.instructor }}</td>
            <td>{{ course.credits }}</td>
            <td>
              <!-- 已加入购物车或已注册显示状态 -->
              <span v-if="isInCart(course) || isEnrolled(course)"
                >Already Added</span
              >
              <button v-else @click="addToCart(course)">Add to Cart</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 2. 购物车 -->
    <div class="cart">
      <h2>My Cart</h2>
      <table v-if="cart.length">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Instructor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(course, index) in cart" :key="index">
            <td>{{ course.name }}</td>
            <td>{{ course.instructor }}</td>
            <td>
              <button @click="removeFromCart(course)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>Your cart is empty.</p>
      <button v-if="cart.length" @click="enrollCourses">Enroll</button>
    </div>

    <!-- 3. 已注册课程 -->
    <div class="enrolled-courses">
      <h2>Enrolled Courses</h2>
      <table v-if="enrolledCourses.length">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Instructor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(course, index) in enrolledCourses" :key="index">
            <td>{{ course.name }}</td>
            <td>{{ course.instructor }}</td>
            <td>
              <button @click="unenrollCourse(course)">Unenroll</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No enrolled courses yet.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentDashboard",
  data() {
    return {
      courses: [], // 所有课程
      cart: [], // 购物车中的课程
      enrolledCourses: [], // 已注册的课程
    };
  },
  computed: {
    // 计算可显示的课程 (过滤掉已加入购物车和已注册的课程)
    availableCourses() {
      return this.courses.filter(
        (course) => !this.isInCart(course) && !this.isEnrolled(course)
      );
    },
  },
  mounted() {
    this.fetchCourses();
    this.fetchEnrolledCourses();
  },
  methods: {
    // 获取所有课程
    async fetchCourses() {
      const res = await fetch("http://localhost:5000/api/courses");
      const data = await res.json();
      this.courses = data;
    },

    // 获取已注册的课程
    async fetchEnrolledCourses() {
      const userId = localStorage.getItem("userId"); // 从 localStorage 获取 userId
      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/enrolled/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch enrolled courses");
        }
        this.enrolledCourses = await response.json();
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    },

    // 检查课程是否在购物车中
    isInCart(course) {
      return this.cart.some((c) => c._id === course._id);
    },

    // 检查课程是否已注册
    isEnrolled(course) {
      return this.enrolledCourses.some((c) => c._id === course._id);
    },

    // 添加课程到购物车
    async addToCart(course) {
      const userId = localStorage.getItem("userId");
      await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, courseId: course._id }),
      });
      this.cart.push(course);
    },

    // 从购物车中移除课程
    async removeFromCart(course) {
      const userId = localStorage.getItem("userId");
      await fetch("http://localhost:5000/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, courseId: course._id }),
      });
      this.cart = this.cart.filter((c) => c._id !== course._id);
    },

    // 注册课程
    async enrollCourses() {
      const userId = localStorage.getItem("userId");
      await fetch("http://localhost:5000/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, courses: this.cart }),
      });
      this.enrolledCourses = [...this.enrolledCourses, ...this.cart];
      this.cart = [];
    },

    // 取消注册课程
    async unenrollCourse(course) {
      const userId = localStorage.getItem("userId");
      await fetch("http://localhost:5000/api/unenroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, courseId: course._id }),
      });
      this.enrolledCourses = this.enrolledCourses.filter(
        (c) => c.id !== course._id
      );
    },
  },
};
</script>

<style scoped>
.student-dashboard {
  padding: 20px;
}
h1,
h2 {
  text-align: center;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}
th {
  background-color: #007bff;
  color: white;
}
button {
  padding: 5px 10px;
  margin: 5px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #218838;
}
</style>
