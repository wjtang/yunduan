import Vue from 'vue'
import Router from 'vue-router'
import Subject from '@/components/choosesubject'
import Index from '@/components/index'
import Login from '@/components/Login'
import Practice from '@/components/practice'
import ExamMessage from '@/components/examMessage'
import ExamList from '@/components/examList'
import Exam from '@/components/exam'
import {store} from '../store/store.js'
import api from '../api/sendrequest.js'

Vue.use(Router)

export const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'school',
      component: Index
    },{
    	path: '/login',
    	name: 'login',
    	component: Login
    },
    {
    	path:'/subject',
    	name: 'subject',
    	component: Subject
    },{
    	path: '/practice',
    	name: 'practice',
    	component: Practice
    },{
    	path: '/exammessage',
    	name: 'exammessage',
    	component: ExamMessage
    },{
    	path: '/examlist',
    	name: 'examlist',
    	component: ExamList
    },{
    	path: '/exam',
    	name: '/exam',
    	component: Exam
    }
  ]
})

router.beforeEach((to,from,next) => {
	if(to.query.schoolId){
		if(!check_login()){
			if(to.path === '/login'){
				next()
			}else{
				next({name:'login'})
			}
		}else{
			next();
		}

	}else{
		if(to.path === '/' || to.path === '/login'){
			next();
		}else{
			next({name:'school'})
		}
	}
})

function check_login(){
	let nowtime = new Date().getTime();
	// console.log(parseInt(localStorage.getItem('userupdate')),nowtime);
	// console.log(nowtime>parseInt(localStorage.getItem('userupdate')),!localStorage.getItem('userupdate'));
	if(!localStorage.getItem('userupdate')  || (nowtime > parseInt(localStorage.getItem('userupdate')))){
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