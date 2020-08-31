import Vue from 'vue';
import App from './App';
import router from "./router";
import store from "./store";

const vueInitialState = {
  router, store, render: next => next(App)
};
new Vue( vueInitialState ).$mount("#app");
