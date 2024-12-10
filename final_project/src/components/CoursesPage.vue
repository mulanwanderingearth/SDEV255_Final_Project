<template>
  <div>
    <div
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <h1>Courses</h1>
      <button @click="navigateToAddCourse" class="add-course-button">
        Add New Course
      </button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Course Name</th>
          <th>Code</th>
          <th>Description</th>
          <th>Credits</th>
          <th>Instructor</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courses" :key="course.id">
          <td>{{ course.name }}</td>
          <td>{{ course.code }}</td>
          <td>{{ course.description }}</td>
          <td>{{ course.credits }}</td>
          <td>{{ course.instructor }}</td>
          <td>
            <button @click="navigateToEdit(course._id)" class="edit-button">Edit</button>
            <button @click="deleteCourse(course._id)" class="delete-button">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CoursesPage",
  data() {
    return {
      courses: [],
    };
  },
  methods: {
    async fetchCourses() {
      try {
        const response = await axios.get("http://localhost:5000/api/courses");
        this.courses = response.data;
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    },
    navigateToAddCourse() {
      this.$router.push("/add-course"); 
    },
    navigateToEdit(courseId) {
    this.$router.push(`/edit-course/${courseId}`);
  },
    // addCourse(course) {
    //   axios
    //     .post("http://localhost:5000/api/courses", course)
    //     .then(() => {
    //       alert("Course added successfully!");
    //       this.fetchCourses(); 
    //     })
    //     .catch((error) => {
    //       console.error("Error adding course:", error);
    //       alert("Failed to add course. Please try again.");
    //     });
    // },

    deleteCourse(courseId) {
      if (confirm("Are you sure you want to delete this course?")) {
        axios
          .delete(`http://localhost:5000/api/courses/${courseId}`)
          .then(() => {
            alert("Course deleted successfully!");
            this.fetchCourses(); 
          })
          .catch((error) => {
            console.error("Error deleting course:", error);
            alert("Failed to delete course. Please try again.");
          });
      }
    },
  },
  created() {
    this.fetchCourses();
  },
};
</script>

<style scoped>
.add-course-button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 15px;
  float: right;
}

.add-course-button:hover {
  background-color: #0056b3;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}
th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}
th {
  background-color: #f4f4f4;
  font-weight: bold;
}
button {
  padding: 5px 10px;
  cursor: pointer;
}
.delete-button {
  color: white;
  background-color: red;
  border: none;
}
</style>
