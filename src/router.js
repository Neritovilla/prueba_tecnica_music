import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Index from './components/Index.vue';
import SongCategory from './components/SongCategory.vue';

const routes = [
  {
    path: '/',
    redirect: '/login' // root rout
    },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/index',
    name: 'Index',
    component: Index
  },
  {
    path: '/songCategory/:id_category/:name',
    name: 'SongCategory',
    component: SongCategory
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
