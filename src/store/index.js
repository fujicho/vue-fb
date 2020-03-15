import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-auth';
import router from '../router'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null
  },
  mutations:{
    updateIdToken(state,idToken){
      state.idToken = idToken;
    }
  },
  getters: {
    idToken: state => state.idToken
  },
  actions:{
    login({commit},authData){
      axios.post('accounts:signInWithPassword?key=AIzaSyCV06-LstDhMgn1BNoen64xfuScYL4G_dY',
      {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }
      ).then(response => {
        commit('updateIdToken',response.data.idToken);
        router.push('/');
      });
    },
    register({commit},authData){
      axios.post('accounts:signUp?key=AIzaSyCV06-LstDhMgn1BNoen64xfuScYL4G_dY',
      {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }
      ).then(response => {
        commit('updateIdToken',response.data.idToken);
        router.push('/');
      });
    }
  }
});