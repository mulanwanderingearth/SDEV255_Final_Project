<template>
    <div>
      <h1>Add New Course</h1>
      <form @submit.prevent="submitCourse">
        <div class="form-group">
          <label for="name">Course Name:</label>
          <input
            type="text"
            id="name"
            v-model="newCourse.name"
            required
          />
        </div>
        <div class="form-group">
          <label for="code">Course Code:</label>
          <input
            type="text"
            id="code"
            v-model="newCourse.code"
            required
          />
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea
            id="description"
            v-model="newCourse.description"
            required
          ></textarea>
        </div>
        <div class="form-group">
          <label for="credits">Credits:</label>
          <input
            type="number"
            id="credits"
            v-model.number="newCourse.credits"
            required
          />
        </div>
        <div class="form-group">
          <label for="instructor">Instructor:</label>
          <input
            type="text"
            id="instructor"
            v-model="newCourse.instructor"
            required
          />
        </div>
        <button type="submit" class="submit-button">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "AddCoursePage",
    data() {
      return {
        newCourse: {
          name: "",
          code: "",
          description: "",
          credits: 0,
          instructor: "",
        },
      };
    },
    methods: {
      async submitCourse() {
        try {
          await axios.post("http://localhost:5000/api/courses", this.newCourse);
          alert("Course added successfully!");
          this.$router.push("/courses"); // 重定向到课程列表页面
        } catch (error) {
          console.error("Error adding course:", error);
          alert("Failed to add course. Please try again.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* 样式仅应用于此组件 */
  form {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  textarea {
    resize: vertical;
  }
  
  button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  