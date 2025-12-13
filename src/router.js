import { createRouter, createWebHistory } from 'vue-router';

// route components
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestReceived from './pages/requests/RequestReceived.vue';
import store from './store/index.js';

import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';

const routes = [
  { path: '/', redirect: '/coaches' },

  {
    path: '/coaches',
    component: CoachesList,
  },
  {
    path: '/coaches/:id',
    component: CoachDetails,
    props: true,
    children: [
      // child paths must not start with / so they become relative to the parent
      { path: 'contact', component: ContactCoach },
    ],
  },
  { path: '/register', component: CoachRegistration, meta: { requiresAuth: true } },
  { path: '/requests', component: RequestReceived, meta: { requiresAuth: true } },
  { path: '/auth',component: UserAuth, meta: { requiresUnAuth: true } },
  {
    path: '/:notfound(.*)',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, _, next) => {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth');
    }
    else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
        next('/coaches');
    }
    else {
        next();
    }
});

export default router;
