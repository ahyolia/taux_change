import { createRouter, createWebHistory } from 'vue-router'
import OptionsView from '../views/OptionsView.vue'
import CompositionView from '../views/CompositionView.vue'

const routes = [
  {
    path: '/',
    name: 'options',
    component: OptionsView
  },
  {
    path: '/composition',
    name: 'composition',
    component: CompositionView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router