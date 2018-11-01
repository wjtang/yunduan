import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
         state: {
           IsLogin : false,
           loginInfo:null ,
           schoolName:'',
           schoolLogo:''
         },
         mutations: {
           SET_LOGIN(state,data){
             state.IsLogin = true
             state.loginInfo = data
           },
           SET_SCHOOL(state,data){
             state.schoolLogo = data.logoUrl;
             state.schoolName = data.title;
             localStorage.setItem('schoolLogo',data.logoUrl);
             localStorage.setItem('schoolName',data.title);
           } 
         }
       });