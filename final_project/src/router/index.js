import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from "../components/HomePage.vue";
import CoursesPage from "../components/CoursesPage.vue";
import LoginPage from "../components/LoginPage.vue";
import RegisterPage from "../components/RegisterPage.vue";
import AddCoursePage from "../components/AddCoursePage.vue";
import EditCoursePage from "../components/EditCoursePage.vue";
import StudentDashboard from "../components/StudentDashboard.vue";
import CourseList from "../components/CourseList.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/courses", name: "Course", component: CourseList },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/register", name: "Register", component: RegisterPage },
  { path: "/add-course", name: "AddCourse", component: AddCoursePage },
  { path: "/edit-course/:id", component: EditCoursePage },
  {
    path: "/student-dashboard",
    name: "StudentDashboard",
    component: StudentDashboard,
  },
  {
    path: "/teacher-dashboard",
    name: "TeacherDashboard",
    component: CoursesPage,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const token = localStorage.getItem("token");

  if (authRequired && !token) {
    return next("/login");
  }

  next();
});
