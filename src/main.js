/* eslint-disable */ 
import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router'; 

/* declare value false for use autenticate in simple guard  */
document.isAuthenticated = false;
/* create a simple guard for each routes */
router.beforeEach((to, from) => {
    if(to.path == '/index' && document.isAuthenticated == false){
        return '/login';
    }
    if(to.path == '/songCategory' && document.isAuthenticated == false){
        return '/login';
    }
    if(to.path == '/admSong' && document.isAuthenticated == false){
        return '/login';
    }
    if(to.path == '/admCategory' && document.isAuthenticated == false){
        return '/login';
    }
    if(to.path == '/profile' && document.isAuthenticated == false){
        return '/login';
    }
    if(to.path == '/categoryAction' && document.isAuthenticated == false){
        return '/login';
    }
})

createApp(App).use(router).mount('#app');
