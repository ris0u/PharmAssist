<<<<<<< HEAD
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Vue Router
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './components/login.vue'
import RegisterPage from './components/register.vue'
import Homepage from './components/home.vue'

// Routes
const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/register', name: 'Register', component: RegisterPage },
    { path: '/home', name: 'Home', component: Homepage },
]

// Router instance
const router = createRouter({
    history: createWebHistory(),
    routes
})

// Create app
const app = createApp(App)
app.use(createPinia())
app.use(router)       // <- must be before mount
app.mount("#app")
=======
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

app.mount('#app');
>>>>>>> b0b6f42ee5a3add627a8d8e62e0b0827d0835388
