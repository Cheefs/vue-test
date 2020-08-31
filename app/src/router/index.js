import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/users' },
  { path: '/users/create', name: "Create", component: () => import('../views/Users') },
  { path: '/users/:id(\\d+)?', name: "Users", component: () => import('../views/Users') },
  { path: '*', component: () => import('../views/404') },
];

const router = new VueRouter({ mode: "history", routes });

export default router;
