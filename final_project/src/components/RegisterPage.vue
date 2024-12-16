<template>
  <div class="register-container">
    <div class="register">
      <h1>Register</h1>
      <form @submit.prevent="register">
        <div class="form-group">
          <label>First Name:</label>
          <input type="text" v-model="firstName" placeholder="Enter your first name" required />
        </div>

        <div class="form-group">
          <label>Last Name:</label>
          <input type="text" v-model="lastName" placeholder="Enter your last name" required />
        </div>

        <div class="form-group">
          <label>Email Address:</label>
          <input type="email" v-model="email" placeholder="Enter your email" required />
        </div>

        <div class="form-group">
          <label>Password:</label>
          <input type="password" v-model="password" placeholder="Enter your password" required />
        </div>

        <div class="form-group">
          <label>Confirm Password:</label>
          <input type="password" v-model="confirmPassword" placeholder="Confirm your password" required />
        </div>

        <div class="form-group">
          <label>I am a:</label>
          <select v-model="role" required>
            <option disabled value="">Select an option</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
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
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 页面垂直居中 */
  background-color: #f9f9f9; /* 背景色 */
}

.register {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

input,
select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

input:focus,
select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

button:active {
  background-color: #003f7f;
}

button:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
