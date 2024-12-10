<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="navbar-brand">Ivy Academy</div>
      <ul class="navbar-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/courses">Courses</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/register">Register</router-link></li>
      </ul>
    </nav>

    <!-- Banner -->
    <div class="banner">
      <h1>Welcome to Ivy Academy</h1>
      <p>Your journey of learning starts here!</p>
    </div>

    <!-- Main Content -->
    <main class="content">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2024 Ivy Academy. All Rights Reserved.</p>
      
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* General Reset */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

/* App Wrapper */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Navigation Bar */
.navbar {
  background-color: #333;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-links {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
}

.navbar-links li a {
  color: white;
  text-decoration: none;
}

.navbar-links li a:hover {
  text-decoration: underline;
}

/* Banner */
.banner {
  background-color: #007bff;
  color: white;
  text-align: center;
  padding: 2rem 1rem;
}

.banner h1 {
  margin: 0;
  font-size: 2.5rem;
}

.banner p {
  margin: 0.5rem 0 0;
  font-size: 1.2rem;
}

/* Main Content */
.content {
  flex: 1;
  padding: 2rem;
  background-color: #f9f9f9;
}

/* Footer */
.footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}

.footer a {
  color: #007bff;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
