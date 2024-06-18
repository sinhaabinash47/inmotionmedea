import { createRouter, createWebHistory } from 'vue-router';
import Weather from './components/Weather.vue';

const routes = [
  { path: '/', redirect: '/weather' }, // Redirect root to /home
  { path: '/weather', component: Weather }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
