import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from '../components/HomePage.vue';
import CoursesPage from '../components/CoursesPage.vue';
import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '../components/RegisterPage.vue';
import AddCoursePage from "../components/AddCoursePage.vue";
import EditCoursePage from "../components/EditCoursePage.vue";


Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/courses', name: 'Courses', component: CoursesPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: "/add-course", name: "AddCourse", component: AddCoursePage },

{ path: "/edit-course/:id", component: EditCoursePage },

];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
