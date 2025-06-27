import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Plan from '../views/Plan.vue'
import Community from '@/views/Community.vue'
import Note from '@/views/Note.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/plan', name: 'Plan', component: Plan },
  { path: '/community', name: 'Community', component: Community },
  { path: '/note', name: 'Note', component: Note },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
