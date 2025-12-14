import { createRouter, createWebHistory } from 'vue-router';

// route components
import CoachesList from './pages/coaches/CoachesList.vue';
import store from './store/index.js';

const CoachDetails = () => import('./pages/coaches/CoachDetails.vue');

const CoachRegistration = () => import('./pages/coaches/CoachRegistration.vue');

const ContactCoach = () => import('./pages/requests/ContactCoach.vue');

const RequestReceived = () => import('./pages/requests/RequestReceived.vue');

const UserAuth = () => import('./pages/auth/UserAuth.vue');

const NotFound = () => import('./pages/NotFound.vue');

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
  {
    path: '/register',
    component: CoachRegistration,
    meta: { requiresAuth: true },
  },
  {
    path: '/requests',
    component: RequestReceived,
    meta: { requiresAuth: true },
  },
  { path: '/auth', component: UserAuth, meta: { requiresUnAuth: true } },
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
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
