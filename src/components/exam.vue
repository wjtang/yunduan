<template>
  <div class="practice">
      <div class="practice-top-nav">
          <i class="iconfont icon-back" @click="gobackfunc"></i>
          <div class="practice-type" v-if="!ispush">倒计时&nbsp;{{remainingTime}}</div>
          <i></i>
      </div>
      <div class="practice-main">
            <div class="practice-main-title">
                <p>{{practicequestionindex}}、{{practicequestion.title}}</p>
                <ul>
                    <li v-for="(item,index) in practicequestion.option" @click="chooseanswer(item.optionLetter,index)" :class="{answerchoose:answer === index}"><span><i class="iconfont" v-html="item.optionLetter"></i></span> <p>{{item.optionContent}}</p></li>
                </ul>
                <span class="answer" v-show="answershow">答案: &nbsp; {{trueanswer}}</span>
            </div>
            <div class="changetitle">
                <span @click="nexttitle">确定</span>
            </div> 
      </div>
      <pullup  @errormsg="pulluperror" @submitexam="pushexam"></pullup>
      <v-loading v-show = "loading"></v-loading>
      <v-popup :options="popuoboxoption" :pshow="popuoboxshow" v-on:pclose="closepopup" v-on:popyes="popyesbtn"></v-popup>
        <div class="error-message" v-show="errorshow">
          {{errorMessage}}
       </div>
  </div>
</template>

<script>
import '../assets/iconfont/iconfont.css'
import loading from './basetool/loading.vue'
import Pullup from './practicetool/exampullup.vue'
import Popup from './basetool/popupbox.vue'
import api from '../api/sendrequest.js'
import getanswerindex from '../api/getanswerindex.js'
export default {
  name: 'practice',
  data () {
    return {
      close: '&#xe659;',
      practiceType: 0,
      practicequestionindex:1, //题号
      practicequestion:[], //当前问题的题目和选项
      answer:'', //当前问题的答案
      answerindex:['A','B','C','D','E','F','G'],
      answershow: false,
      loading: false,
      popuoboxoption:{},//弹窗信息
      popuoboxshow:false,//弹窗show或者hidden
      pullupbox:'',
      errorMessage:'',
      errorshow:false,
      remainingTime:'',
      remainExamSecond:'',
      remainingTimeflag:true,
      ispush:false,//判断是否已经提交试卷,进入查阅状态
      trueanswer:''
    }
  },
  mounted() {
    // console.log(this.$route)
    if(!this.$route.query.ispush){//题目未提交
      
    }else{
       this.ispush = true;
    }

  },
  computed : {
    titleId: function(){
      return this.$store.state.questionId
    },
    questioninfoall : function(){
      return this.$store.state.questioninfoAll;
    },
    subjecttype: function(){
      return parseInt(this.$route.query.subjectType);
    }
  },
  methods : {
    getquestionlist(){ //获取考试数据列表
         let flag = this.getquestioninfoAll(this.$route.query.titleindex);
           if(this.$store.state.questioninfo != ''){//判断vuex中是否已有题目数据(刷新页面后,数据会丢失)
              this.getquelistmain();
            }else{
              if(flag || flag === 0){
              this.getlistfromall(flag);
              }else{
          api.getexam({sort:parseInt(this.$route.query.titleindex),examid:parseInt(this.$route.query.examId)}).then(data => {
              if(data.code == 0){
              this.$store.dispatch('set_questioninfo',data.data);
              this.getquelistmain();
            }else{
              if(data.code == 400){
                this.returntologin(data.msg);
              }
            }
          })
    }
    }
    if(this.$store.state.menuSortInfoList.length == 0){
        api.getexammenu(this.$route.query.examId).then(data => {
            if(data.code == 0){
             this.$store.dispatch('set_menusortinfolist',data.data)
            }else{
              if(data.code == 400){
                this.returntologin(data.msg);
              }
            }
          })
    }
  },
    getquelistmain(){ //获取当前题目数据后的主体逻辑方法
      this.loading = false;
      if(this.remainingTimeflag && !this.ispush){
      this.getremainingtime(this.$store.state.questioninfo.remainExamSecond);
      }
      this.practicequestion = [];
      this.answer = '';
      let questioninfo = this.$store.state.questioninfo;
      this.practicequestionindex = questioninfo.sort;
      this.practicequestion.title = questioninfo.questionContent;
      this.practicequestion.option = questioninfo.optionInfo;
      this.$store.commit('SET_QUESTIONID',questioninfo.questionId);
      if(questioninfo.studentAnswer){
        this.answer = getanswerindex.getindex(questioninfo.studentAnswer);
      }
      if(this.ispush){// 试卷已提交的情况下,直接显示答案
          this.answershow = true;
          this.trueanswer = questioninfo.trueAnswer;
      }
      this.changequestioninfoAll(questioninfo);
    },
    getlistfromall(id){//用于顺序答题,若题目总集中有此题目数据,则不再往后台发送请求
        let data = this.questioninfoall[id];
        this.loading = false;
        this.practicequestionindex = data.sort;
        this.practicequestion.title = data.questionContent;
        this.answer = '';
        this.practicequestion.option = data.optionInfo;
        this.$store.commit('SET_QUESTIONID',data.questionId);
        this.$store.commit('SET_COLLECTION',data.isCollection);
        if(data.studentAnswer){
        this.answer = getanswerindex.getindex(data.studentAnswer);
        }
    },
     chooseanswer(item,index){
      if(!this.$route.query.ispush){
        this.answer= index;
      }
   },
   changequestioninfoAll(data){ 
        // 顺序答题时,每次数据更新前调用此方法,看是否需要更新顺序答题里面的题目总集
        if(this.getquestioninfoAll(data.sort)){
          return ;
        }else{
          this.$store.dispatch('set_questioninfoall',data);
        }
        // console.log(this.$store.state.questioninfoAll)
   },
   getquestioninfoAll(data){
      if(this.questioninfoall){
        let id = ''
      this.questioninfoall.forEach((item,index) => {
              if(item.sort === parseInt(data)){
                id = index;
              }
          })
      if(id === ''){
        return false
      }else{
      return id;
    }
    }else{
      return false;
    }
  },
   gobackfunc(){
      this.$router.push({path:'/subject?schoolId='+this.$route.query.schoolId});
   },
   changePracticeType(data){
     this.practiceType = data;
   },
   previoustitle(){
    if(parseInt(this.$route.query.titleindex) > 1){
    let index = parseInt(this.$route.query.titleindex) - 1;
    this.$store.commit('SET_TITLE',index);
    this.$router.push({path:'/practice?schoolId='+this.$route.query.schoolId+'&subjectId='+this.$route.query.subjectId+'&subjectType='+this.$route.query.subjectType+'&titleindex='+index})
    }
   },
   nexttitle(){
    let index = parseInt(this.$route.query.titleindex) + 1;
    this.loading = true;
    this.$store.commit('SET_TITLE',index);
    if(!this.ispush){
    // console.log(this.$store.state.questionId)
    api.sendexamanswer({examid:this.$route.query.examId,questionId:this.$store.state.questionId,sort:this.$route.query.titleindex,studentAnswer:this.answerindex[this.answer],remainExamSecond:this.remainExamSecond}).then(data => {
        if(data.code == 0){
          this.$store.dispatch('set_questioninfoall_three',{num:this.getquestioninfoAll(parseInt(this.$route.query.titleindex)),studentAnswer:this.answerindex[this.answer]});
          this.$store.dispatch('set_menusortinfolist_three',{sort:this.$route.query.titleindex,state:2,studentAnswer:this.answerindex[this.answer]});
          this.$router.push({path:'/exam?schoolId='+this.$route.query.schoolId+'&subjectId='+this.$route.query.subjectId+'&examId='+this.$route.query.examId+'&titleindex='+index})
        }else{
          if(data.code == 400){
            this.returntologin(data.msg);
          }
        }
    })
  }else{
      this.$router.push({path:'/exam?schoolId='+this.$route.query.schoolId+'&subjectId='+this.$route.query.subjectId+'&examId='+this.$route.query.examId+'&titleindex='+index+'&ispush=1'})
  }
   },
   closepopup(){
    this.popuoboxshow = false;
   },
   getremainingtime(data){ //获取倒计时
      this.remainingTimeflag = false;
      let _self = this;
      let data1 = data;
      let time = window.setInterval(() => {
         if(data1 >=0){
         var h = Math.floor(data1 / 3600) < 10 ? '0'+Math.floor(data1 / 3600) : Math.floor(data1 / 3600);
         var m = Math.floor((data1 / 60 % 60)) < 10 ? '0' + Math.floor((data1 / 60 % 60)) : Math.floor((data1 / 60 % 60));
         var s = Math.floor((data1 % 60)) < 10 ? '0' + Math.floor((data1 % 60)) : Math.floor((data1 % 60));
         data1 = data1 -1;
         _self.remainExamSecond = data1;
         if(h>0){
          _self.remainingTime = `${h}:${m}:${s}`
         }else{
         _self.remainingTime = `${m}:${s}`;
       }
       }else{
        _self.popuoboxoption = {content:'考试时间已经结束,是否确认交卷'};
        _slef.popuoboxshow = true;
        window.clearInterval(time);
       }
      },1000)
   },
   popyesbtn(){
      api.submitexam({subjectId:this.$route.query.subjectId,examid:this.$route.query.examId}).then(data => {
        if(data.code == 0 ){
          this.popuoboxshow = false;
          this.$router.push({path:'/examlist?schoolId='+this.$route.query.schoolId+'&subjectId='+this.$route.query.subjectId});
        }else{
          if(data.code == 400){
            this.returntologin(data.msg);
          }
        }
      })
   },
   pulluperror(data){//子模块的添加错题错误状态收值方法
      // console.log(data)
      this.errorshow = true;
      this.errorMessage = data;
      setTimeout(() => {
        this.errorshow = false;
      },1500)
   },
   pushexam(data){//下了窗模块的父子模块通信,--交卷按钮
      this.popuoboxoption = {content:'是否确认交卷'};
      this.popuoboxshow = true;
   },
   returntologin(msg){ //接口返回code == 400,需要重新登录时候调用此方法
      this.loading = false;
      this.errormsg = msg;
      this.errorshow = true;
      setTimeout(() => {
        this.errorshow = false;
      },1500);
      this.$router.push('/?schoolId='+this.$route.query.schoolId);
   }
  },
  created(){
    this.getquestionlist()
  },
  components : {
    'pullup' : Pullup,
    'v-loading' : loading,
    'v-popup' : Popup
  },
  watch : {
    '$route'(to,from){
            // console.log(to.path)
            if(to.path === '/exam'){
                this.$store.commit('SET_TITLE',to.query.titleIndex);
                this.$store.commit('SET_QUESTIONINFO','');
                this.answershow = false;
                this.getquestionlist()
            }
        }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .practice{
      width: 100%;
      height: 100%;
      background-color: white;
      position: relative;
      overflow: hidden;
      .practice-top-nav{
        height: 88px;
        background-color: white;
        display: flex;
        overflow: hidden;
        i{
          font-size: 50px;
          line-height: 88px;
          color: black;
          font-weight: bold;
        }
        .icon-shezhi{
          font-weight: normal;
        }
        .practice-type{
          width: 320px;
          margin-left: calc(50% - 210px);
          margin-right: calc(50% - 230px);
          color: black;
          text-align: center;
          font-size: 30px;
          line-height: 88px;
        }
      }
      .practice-main{
        width: 100%;
        height: calc(100% - 210px);
        padding-top: 24px;
        overflow-y: auto;
        .practice-main-title{
          width: 680px;
          margin: 0 auto;
          background-color: white;
          border-radius: 30px;
          box-shadow:3px 3px 6px 0px rgba(167,167,167,0.18);
          -webkit-box-shadow:3px 3px 6px 0px rgba(167,167,167,0.18);
          -moz-box-shadow:3px 3px 6px 0px rgba(167,167,167,0.18);
          p{
            padding: 36px 53px 7px 46px;
            font-size: 36px;
          }
          .answertrue{
            color: #358AFF;
          }
          .answererror{
            color: #ED512D;
          }
          ul{
            padding: 0 30px;
            li{
              display: block;
              padding: 17px 16px;
              border:2px solid white;
              border-radius:44px;
              margin-top: 19px;
              span{
                width: 51px;
                height: 51px;
                display: block;
                float: left;
                border-radius: 50%;
                background-color: white;
                box-shadow:2px 2px 15px 0px rgba(167,167,167,0.5);;
                -webkit-box-shadow:2px 2px 15px 0px rgba(167,167,167,0.5);;
                -moz-box-shadow:2px 2px 15px 0px rgba(167,167,167,0.5);;
                text-align: center;
                i{
                  font-size: 36px;
                  line-height: 50px;
                }
              }
              p{
                padding: 0px;
                padding-left: 70px;
              }
            }
            .answerchoose{
              border-color: #358AFF;
            }
          }
          .answer{
            display: block;
            padding: 46.5px 55px 44px 55px;
            font-size: 30px;
          }
        }
      }
      .changetitle{
        width: 680px;
        margin: 0 auto;
        display: flex;
        margin-top: 22px;
        span{
          display: block;
          width: 600px;
          height: 88px;
          background-color: white;
          font-size: 36px;
          line-height: 88px;
          text-align: center;
          margin: 0 auto;
          background-color: #358AFF;
          box-shadow:0px 3px 15px 0px rgba(167,167,167,0.5);
          border-radius:44px;
          color: white;
        }
      }
     .error-message{
        width: 500px;
        height: 100px;
        background-color: rgb(140,167,221);
        position: absolute;
        top: calc(50% - 50px);
        left: calc(50% - 250px);
        line-height: 100px;
        text-align: center;
        font-size: 30px; /*px*/
        border-radius: 20px;
      }
    }
</style>
