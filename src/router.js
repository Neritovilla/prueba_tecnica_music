// eslint-disable-next-line
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Index from './components/Index.vue';
import SongCategory from './components/SongCategory.vue';
import AdmSong from './components/AdmSong.vue';
import AdmCategory from './components/AdmCategory.vue';
import Profile from './components/Profile.vue';
import CategoryAction from './components/Accions/CategoryAction.vue';
/* create routes for pages */
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
  },
  {
    path: '/admSong',
    name: 'AdmSong',
    component: AdmSong
  },
  {
    path: '/admCategory',
    name: 'AdmCategory',
    component: AdmCategory
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/categoryAction/:id_category/:accion',
    name: 'CategoryAction',
    component: CategoryAction
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes
});


export default router;
