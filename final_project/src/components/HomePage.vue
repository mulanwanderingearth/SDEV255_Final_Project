<template>
    <div>
      <h1>Welcome to My Academy</h1>
      <p>Your journey of learning starts here!</p>
      <button @click="$router.push('/courses')">Explore Courses</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "HomePage",
  };
  </script>
  
  <style>
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  