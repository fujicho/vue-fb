import Vue from 'vue'
import App from './App.vue'
import axios from "axios";

Vue.config.productionTip = false

axios.defaults.baseURL = "https://firestore.googleapis.com/v1/projects/vuejs-http-92632/databases/(default)/documents"
// サーバーに送る前の処理
axios.defaults.request.use(
  config =>{
    console.log("interseptors request",config);
    return config;
  },
  error =>{
    return Promise.reject(error)
  }
);
// サーバーから取ってきた時の処理
axios.defaults.response.use(
  response =>{
    console.log("interseptors response",response);
    return response;
  },
  error =>{
    return Promise.reject(error)
  }
)

new Vue({
  render: h => h(App),
}).$mount('#app')
