import Vue from 'vue';

import Router from 'vue-router';

import HomeView from './views/Home.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Vue.js Pokédex',
    },
  },
  {
    path: '/details/:number',
    name: 'details',
    meta: {
      title: 'Pokémon Details - Vue.js Pokédex',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "details" */ './views/Details.vue'),
  },
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
