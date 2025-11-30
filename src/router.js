import createRouter from 'vue-router';

const routes = [
  { path: '/', redirect: '/coaches' },

  { path: '/coaches', component: () => import('./components/coaches.vue') },
  {
    path: '/coaches/:id',
    component: () => import('./components/coach.vue'),
    children: [
      { path: '/contact', component: () => import('./components/contact.vue') },
    ],
  },
  { path: '/register', component: () => import('./components/register.vue') },
  { path: '/requests', component: () => import('./components/requests.vue') },
  {
    path: '/:notfound(.*)',
    component: () => import('./components/notfound.vue'),
  },
];

const router = createRouter({
  history: createRouter.createWebHistory(),
  routes,
});

export default router;
