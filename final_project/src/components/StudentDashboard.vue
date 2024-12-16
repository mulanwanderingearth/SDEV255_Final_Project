<template>
  <div class="student-dashboard">
    <h1>Student Dashboard</h1>

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
              <span v-if="isInCart(course) || isEnrolled(course)"
                >Already Added</span
              >
              <button v-else @click="addToCart(course)">Add to Cart</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

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
      courses: [],
      cart: [],
      enrolledCourses: [],
    };
  },
  computed: {
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
    async fetchCourses() {
      const res = await fetch("http://localhost:5000/api/courses");
      const data = await res.json();
      this.courses = data;
    },

    async fetchEnrolledCourses() {
      const userId = localStorage.getItem("userId");
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

    isInCart(course) {
      return this.cart.some((c) => c._id === course._id);
    },

    isEnrolled(course) {
      return this.enrolledCourses.some((c) => c._id === course._id);
    },

    async addToCart(course) {
      const userId = localStorage.getItem("userId");
      await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, courseId: course._id }),
      });
      this.cart.push(course);
    },

    async removeFromCart(course) {
      const userId = localStorage.getItem("userId");
      await fetch("http://localhost:5000/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, courseId: course._id }),
      });
      this.cart = this.cart.filter((c) => c._id !== course._id);
    },

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

    async unenrollCourse(course) {
      const userId = localStorage.getItem("userId");
      await fetch("http://localhost:5000/api/unenroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, courseId: course._id }),
      });
      this.enrolledCourses = this.enrolledCourses.filter(
        (c) => c._id !== course._id
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
