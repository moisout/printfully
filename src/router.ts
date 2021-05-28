import { createRouter, createWebHistory } from 'vue-router';
import Configurator from './components/steps/Configurator.vue';
import Confirmation from './components/steps/Confirmation.vue';
import Payment from './components/steps/Payment.vue';
import Uploader from './components/steps/Uploader.vue';

const routes = [
  { path: '/', component: Uploader },
  { path: '/configurator', component: Configurator },
  { path: '/payment', component: Payment },
  { path: '/confirmation', component: Confirmation }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
