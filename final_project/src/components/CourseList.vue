<template>
  <div>
    <h1>Available Courses </h1>
    <table border="1" cellspacing="0" cellpadding="10">
      <thead>
        <tr>
          
          <th>Course Name</th>
          <th>Code</th>
          <th>Description</th>
          <th>Credits</th>
          <th>Instructor</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courses" :key="course._id">
          <td>{{ course.name }}</td>
          <td>{{ course.code }}</td>
          <td>{{ course.description }}</td>
          <td>{{ course.credits }}</td>
          <td>{{ course.instructor }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "CourseList",
  data() {
    return {
      courses: [], // 存放课程数据
    };
  },
  mounted() {
    // 请求数据
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => {
        this.courses = data; // 将获取的数据赋值给 courses
      })
      .catch((error) => console.error("Error fetching courses:", error));
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
}

th {
  background-color: #007bff;
  color: white;
  text-align: left;
}

td, th {
  padding: 10px;
  border: 1px solid #ddd;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
