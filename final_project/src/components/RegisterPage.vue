<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <label>First Name:</label>
      <input type="text" v-model="firstName" placeholder="Enter your first name" required /><br />

      <label>Last Name:</label>
      <input type="text" v-model="lastName" placeholder="Enter your last name" required /><br />

      <label>Email Address:</label>
      <input type="email" v-model="email" placeholder="Enter your email" required /><br />

      <label>Password:</label>
      <input type="password" v-model="password" placeholder="Enter your password" required /><br />

      <label>Confirm Password:</label>
      <input type="password" v-model="confirmPassword" placeholder="Confirm your password" required /><br />

      <label>I am a:</label>
      <select v-model="role" required>
        <option disabled value="">Select an option</option>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select><br />

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterPage",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "", // Student or Teacher
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      try {
        await axios.post("http://localhost:5000/api/register", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          role: this.role,
        });
        alert("Registration successful!");
        this.$router.push("/login");
      } catch (error) {
        console.error("Error registering user:", error);
        alert("Failed to register. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}
</style>
