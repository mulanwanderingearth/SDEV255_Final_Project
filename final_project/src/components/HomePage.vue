<template>
  <div class="home-container">
    
    <h2>Your journey of learning starts here!</h2>
    <button @click="$router.push('/courses')">Explore Courses</button>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  text-align: center; 
  background-color: #f9f9f9; 
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
}

button:hover {
  background-color: #0056b3;
}
</style>
