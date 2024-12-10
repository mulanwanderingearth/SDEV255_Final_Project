<template>
    <div>
      <h1>Available Courses</h1>
      <table border="1">
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
          <tr v-for="course in courses" :key="course.id">
            <td>{{ course["Course Name"] }}</td>
            <td>{{ course.Code }}</td>
            <td>{{ course.Description }}</td>
            <td>{{ course.Credits }}</td>
            <td>{{ course.Instructor }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import courses from '../../data/courses.json';
  
  export default {
    name: "CourseList",
    data() {
      return {
        courses: courses
      };
    }
  };
  </script>
  
  <style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    text-align: left;
    padding: 8px;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  </style>
  