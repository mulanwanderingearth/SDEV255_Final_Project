<template>
    <div>
      <h1>Edit Course</h1>
      <form @submit.prevent="updateCourse">
        <label for="name">Course Name:</label>
        <input v-model="course.name" id="name" type="text" required />
  
        <label for="code">Code:</label>
        <input v-model="course.code" id="code" type="text" required />
  
        <label for="description">Description:</label>
        <textarea v-model="course.description" id="description" required></textarea>
  
        <label for="credits">Credits:</label>
        <input v-model.number="course.credits" id="credits" type="number" required />
  
        <label for="instructor">Instructor:</label>
        <input v-model="course.instructor" id="instructor" type="text" required />
  
        <button type="submit">Save Changes</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        course: {
          name: "",
          code: "",
          description: "",
          credits: null,
          instructor: "",
        },
      };
    },
    methods: {
      async fetchCourse() {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/courses/${this.$route.params.id}`
          );
          this.course = response.data;
        } catch (error) {
          console.error("Error fetching course:", error);
        }
      },
      async updateCourse() {
        try {
          await axios.put(
            `http://localhost:5000/api/courses/${this.$route.params.id}`,
            this.course
          );
          alert("Course updated successfully!");
          this.$router.push("/courses");
        } catch (error) {
          console.error("Error updating course:", error);
          alert("Failed to update course. Please try again.");
        }
      },
    },
    created() {
      this.fetchCourse();
    },
  };
  </script>
  
  <style scoped>
  /* 添加样式 */
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  button {
    padding: 10px;
    background-color: blue;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: darkblue;
  }
  </style>
  