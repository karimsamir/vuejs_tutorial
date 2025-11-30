import { createRouter, createWebHistory } from 'vue-router';

// route components
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestReceived from './pages/requests/RequestReceived.vue';
import NotFound from './pages/NotFound.vue';

const routes = [
  { path: '/', redirect: '/coaches' },

  {
    path: '/coaches',
    component: CoachesList,
  },
  {
    path: '/coaches/:id',
    component: CoachDetails,
    children: [
      // child paths must not start with / so they become relative to the parent
      { path: 'contact', component: ContactCoach },
    ],
  },
  { path: '/register', component: CoachRegistration },
  { path: '/requests', component: RequestReceived },
  {
    path: '/:notfound(.*)',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
