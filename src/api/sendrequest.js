import axios from 'axios'
import qs from 'qs'


export default {
	postreq(url,data){
		return new Promise((resolve, reject) => {
			axios.post(url,qs.stringify(data)).then(response => {
				// console.log(response.data);
				resolve(response.data)
			})
		})
	},
	getreq(url,data){
		return new Promise((resolve, reject) => {
			axios.get(url).then(response => {
				resolve(response.data)
			})
		})
	},
	postreq1(url,data){
		return new Promise((resolve, reject) => {
			axios.post(url,qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded','token': localStorage.getItem('usertoken')}}).then(response => {
				// console.log(response.data);
				resolve(response.data)
			})
		})
	},
	getschool(id){
		return this.postreq('/api/student/getSchoolInfo',{schoolId:id})
	},
	login(uname,pasw){
		return this.postreq('/api/student/login',{account:uname,password:pasw})
	},
	getSubjectList(){
		return this.postreq1('/api/subject/getSubjectList')
	},
	getSequencelist(id,num,sort,state){//顺序练习
			let sentdata = '';
			if(sort){
				sentdata = {subjectId:parseInt(id),exercisesType:parseInt(num),sort:parseInt(sort),state:state}
			}else{
				sentdata = {subjectId:parseInt(id),exercisesType:parseInt(num)}	
			}
		return  this.postreq1('/api/subject/getQuestionList',sentdata)
	},
	seterrorques(id){
		return this.postreq1('/api/question/insertErrorQuestion',{questionId:id})
	},
	recordanswer(data){
		return this.postreq1('/api/subject/recordAnswer',data)
	},
	getexaminfo(data){
		return this.postreq1('/api/exam/getExamInfo',{subjectId:data})
	},
	getexamlist(data){
		return this.postreq1('/api/exam/getExamList',{subjectId:data.subjectId,page:data.page,size:10})
	},
	getexamid(data){
		return this.postreq1('/api/exam/createExamPaper',{subjectId:data})
	},
	getexammenu(data){
		return this.postreq1('/api/exam/questionState',{examId:data})
	},
	getexam(data){
		return this.postreq1('/api/exam/questionOneByOne',{sort:data.sort,examId:data.examid})
	},
	submitexam(data){
		return this.postreq1('/api/exam/submitExam',{subjectId:data.subjectId,examId:data.examid})
	},
	sendexamanswer(data){
		return this.postreq1('/api/exam/submitQuestion',{examId:data.examid,questionId:data.questionId,sort:data.sort,remainExamSecond:data.remainExamSecond,studentAnswer:data.studentAnswer})
	}
}