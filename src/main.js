import Vue from 'vue';
import App from './App.vue';
import axios from "axios";
import router from './router';
import store from './store'

Vue.config.productionTip = false

axios.defaults.baseURL = "https://firestore.googleapis.com/v1/projects/vuejs-http-92632/databases/(default)/documents"
// サーバーに送る前の処理
const interceptorsRequest = axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// サーバーから取ってきた時の処理
const interceptorsResponse = axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.request.eject(interceptorsRequest);
axios.interceptors.response.eject(interceptorsResponse);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
