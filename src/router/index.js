import Vue from 'vue'
import Router from 'vue-router'
import Subject from '@/components/choosesubject'
import Login from '@/components/Login'
import Practice from '@/components/practice'
import {store} from '../store/store.js'

Vue.use(Router)

export const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },{
    	path:'/subject',
    	name: 'subject',
    	component: Subject
    },{
    	path: '/practice',
    	name: 'practice',
    	component: Practice
    }
  ]
})

router.beforeEach((to,from,next) => {
	const loginIndex = localStorage.loginIndex;
	if(!store.state.schoolLogo){
		store.commit('SET_SCHOOL',{logoUrl:localStorage.getItem('schoolLogo'),title:localStorage.getItem('schoolName')})
	}
	// console.log(loginIndex);
	// console.log(store.state);
	if(check_login()){
		if(to.path === '/'){
			next()
		}else{
			next({name:'login'})
		}
	}else{
	next()
	}
})

function check_login(){
	if(!localStorage.loginIndex){
		return false
	}else{ 
		if(store.state.IsLogin){
			return true
		}else{
			// localStorage.setItem('')
			return true;
		}
	}
}