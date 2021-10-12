import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.view.vue';
import ItemPage from '../views/ItemPage.view.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:id',
    name: 'ItemPage',
    component: ItemPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
