/* eslint no-unused-vars: 0 */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-auth';
import router from '../router';
import axiosRefresh from '../axios-refresh';

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
    autoLogin({commit,dispatch}){
      const idToken = localStorage.getItem('idToken');
      if (!idToken) return;
      const now = new Date();
      const expiryTimeMs = localStorage.getItem('expiryTimeMs');
      const isExpired = now.getTime() >= expiryTimeMs;
      const refreshToken = localStorage.getItem('refreshToken')
      if (isExpired){
        dispatch('refreshidToken');
      }else {
        const expiresInMs = expiryTimeMs - now.getTime();
        setTimeout(() => {
          dispatch('refreshIdToken',refreshToken)
        }, expiresInMs)
        commit('updateIdToken',idToken);
      }
    },
    login({commit,dispatch},authData){
      axios.post('accounts:signInWithPassword?key=AIzaSyCV06-LstDhMgn1BNoen64xfuScYL4G_dY',
      {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }
      ).then(response => {
        dispatch('setAuthData',
        {
          idToken: response.data.idToken,
          expiresIn: response.data.expiresIn,
          refreshToken: response.data.refreshToken,
        });
        router.push('/');
      });
    },
    logout({commit}){
      commit('updateIdToken',null);
      localStorage.removeItem('idToken');
      localStorage.removeItem('expiryTimeMs');
      localStorage.removeItem('refreshToken');
      router.replace('/login');
    },
    refreshIdToken({ dispatch},refreshToken){
      axiosRefresh.post('token?key=AIzaSyCV06-LstDhMgn1BNoen64xfuScYL4G_dY',
        {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
        .then(response =>{
          dispatch('setAuthData',
        {
          idToken: response.data.id_token,
          expiresIn: response.data.expires_in,
          refreshToken: response.data.refresh_token,
        });
        })
    },
    register({dispatch},authData){
      axios.post('accounts:signUp?key=AIzaSyCV06-LstDhMgn1BNoen64xfuScYL4G_dY',
      {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }
      ).then(response => {
        dispatch('setAuthData',
        {
          idToken: response.data.idToken,
          expiresIn: response.data.expiresIn,
          refreshToken: response.data.refreshToken,
        });
        router.push('/');
      });
    },
    setAuthData({commit,dispatch},authData){
      const now = new Date()
      const expiryTimeMs = now.getTime() + authData.expiresIn * 1000;
      commit('updateIdToken',authData.idToken);
      localStorage.setItem('idToken',authData.idToken);
      localStorage.setItem('expiryTimeMs',expiryTimeMs);
      localStorage.setItem('refreshToken',authData.refreshToken);
      setTimeout(() =>{
        dispatch('refreshIdToken',authData.refreshToken)
      }, authData.expiresIn * 1000);
    },
  }
});