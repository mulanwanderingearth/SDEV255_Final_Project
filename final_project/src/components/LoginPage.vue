<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label>Email:</label>
      <input
        type="email"
        v-model="email"
        placeholder="Enter your email"
        required
      /><br />

      <label>Password:</label>
      <input
        type="password"
        v-model="password"
        placeholder="Enter your password"
        required
      /><br />

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:5000/api/login", {
          email: this.email,
          password: this.password,
        });

        // Save token and role in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("userId", response.data.userId); // 保存 userIds

        // Redirect based on role
        if (response.data.role === "student") {
          this.$router.push("/student-dashboard");
        } else if (response.data.role === "teacher") {
          this.$router.push("/teacher-dashboard");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert("Login failed. Please check your credentials.");
      }
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}
</style>
