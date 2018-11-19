<template>
  <div class="practice">
      <div class="practice-top-nav">
          <i class="iconfont icon-back" @click="gobackfunc"></i>
          <div class="practice-type"><!-- <span :class="{practice_type_acitve: practiceType == 0}" @click="changePracticeType(0)">答题模式</span><span :class="{practice_type_acitve: practiceType == 1}"  @click="changePracticeType(1)">背题模式</span> --></div>
          <!-- <i class="iconfont icon-shezhi"></i> -->
      </div>
      <div class="practice-main">
            <div class="practice-main-title">
                <p>{{practicequestionindex}}、{{practicequestion.title}}</p>
                <ul>
                    <li v-for="(item,index) in practicequestion.option" @click="chooseanswer(item.optionLetter)" :class="{answertrue: !answerclickflag && answer === index,answererror: !answerclickflag && errorindex === index}"><span><i class="iconfont" v-html="item.optionLetter"></i></span> <p>{{item.optionContent}}</p></li>
                </ul>
                <span class="answer" v-show="answershow">答案: &nbsp; {{trueanswer}}</span>
            </div>
            <div class="changetitle">
                <span @click="previoustitle" v-show="subjecttype == 1">上一题</span>
                <span @click="nexttitle" :class="{next_another: subjecttype != 1}">下一题</span>
            </div> 
      </div>
      <component :is="pullupbox" @errormsg="pulluperror"></component>
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
import Pullup from './practicetool/pullup.vue'
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
      answer: 0, //当前问题的答案
      answerindex:['A','B','C','D','E','F','G'],
      answershow: false,//是否显示答案
      answerclickflag: true,//是否允许选择答案
      errorindex:1,
      loading: false,//是否显示loading
      popuoboxoption:{},//弹窗的初始数据
      popuoboxshow:false,//是否显示弹窗
      pullupbox:'',
      errorMessage:'',//错误信息
      errorshow:false //是否显示错误信息
    }
  },
  mounted() {
    if(this.$route.query.subjectType == 1){
      this.pullupbox = 'pullup'; //当前模块为顺序答题模块时才渲染下拉菜单模块
    }
    // console.log(this.$route)
  },
  computed : {
    trueanswer : function(){
      return this.answerindex[this.answer];
    },
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
    getquestionlist(){ //获取练习数据列表
      switch(this.subjecttype){//根据不同模式,执行不同的初始化方法,1为顺序答题,2为随机,3为错题
        case 1:
         let flag = this.getquestioninfoAll(this.$route.query.titleindex);//判断vuex的总集中是否已有该题目
           if(this.$store.state.questioninfo != ''){//判断vuex中是否已有题目数据(刷新页面后,数据会丢失)
              this.getquelistmain();
            }else{
              if(flag || flag === 0){//若题目总集中有当前请求的题目数据数据,就执行这个方法
              this.getlistfromall(flag);
              }else{
         let state = true;
        if(this.questioninfoall){state = 2;}else{state = 1;}//当vuex中有下拉菜单数据的时候,state为2,即不再往接口处取菜单信息
          api.getSequencelist(this.$route.query.subjectId,this.$route.query.subjectType,this.$route.query.titleindex,state).then(data => {
              if(data.code == 0){
              this.$store.dispatch('set_questioninfo',data.data);
              if(state == 1){
              this.$store.dispatch('set_menusortinfolist',data.data.menuSortInfoList);
            }
         this.$store.dispatch('set_questionid',data.data.questionInfo.questionId);
         this.getquelistmain();
       }else{
              if(data.code == 400){
                this.returntologin(data.msg);
              }
            }
      })
    }
    }
    break;
    case 2:
        if(this.$store.state.questioninfo != ''){
        this.getquelistmain();
        }else{
          api.getSequencelist(this.$route.query.subjectId,this.$route.query.subjectType,this.$route.query.titleindex,2).then(data => {
            if(data.code == 0){
               this.$store.dispatch('set_questioninfo',data.data);
               this.$store.dispatch('set_questionid',data.data.questionInfo.questionId);
               this.getquelistmain();
             }else{
              if(data.code == 400){
                this.returntologin(data.msg);
              }
             }
          })
        }
    break;
    case 3:
        if(this.$store.state.questioninfo != ''){
          this.getquelistmain();
        }else{
          api.getSequencelist(this.$route.query.subjectId,this.$route.query.subjectType,this.$route.query.titleindex,2).then(data => {
              if(data.code == 0){
              this.$store.dispatch('set_questioninfo',data.data);
              this.$store.dispatch('set_questionid',data.data.questionInfo.questionId);
              this.getquelistmain();
            }else{
              if(data.code == 400){
                this.returntologin(data.msg);
              }
            }
          })
        }
    break;
  }
    },
    getquelistmain(){ //获取当前题目数据后的主体逻辑方法
      this.loading = false;
      let questioninfo = this.$store.state.questioninfo;
      // console.log(questioninfo)
      this.practicequestionindex = questioninfo.questionInfo.sort;
      this.practicequestion.title = questioninfo.questionInfo.questionContent;
      this.practicequestion.option = questioninfo.questionInfo.optionInfoList;
      this.answerclickflag = true;
      this.$store.dispatch('set_collection',questioninfo.questionInfo.isCollection);
      // console.log(this.practicequestion);
      if(questioninfo.questionInfo.studentAnswer){
        this.answershow = true;
        this.answerclickflag = false;
        this.answer = getanswerindex.getindex(questioninfo.questionInfo.trueAnswer);
        if(questioninfo.questionInfo.studentAnswer == questioninfo.questionInfo.trueAnswer){
           this.errorindex = false;
           this.practicequestion.option[this.answer].optionLetter = '&#xe66c;'
        }else{
          this.errorindex = getanswerindex.getindex(questioninfo.questionInfo.studentAnswer);
          this.practicequestion.option[this.answer].optionLetter = '&#xe66c;'
          this.practicequestion.option[this.errorindex].optionLetter = '&#xe659;'
        }
      }else{
        this.errorindex = false;
        this.answer = false;
      }
      if(this.subjecttype === 1){
      this.changequestioninfoAll(questioninfo.questionInfo);
    }
    },
    getlistfromall(id){//用于顺序答题,若题目总集中有此题目数据,则不再往后台发送请求
        let data = this.questioninfoall[id];
        this.loading = false;
        this.practicequestionindex = data.sort;
        this.practicequestion.title = data.questionContent;
        this.practicequestion.option = data.optionInfoList;
        this.answerclickflag = true;
        this.$store.commit('SET_QUESTIONID',data.questionId);
        this.$store.commit('SET_COLLECTION',data.isCollection);
        if(data.studentAnswer){
           this.answershow = true;
           this.trueAnswer = data.trueAnswer;
           this.answerclickflag = false;
           this.answer = getanswerindex.getindex(data.trueAnswer);
           if(data.studentAnswer == data.trueAnswer){
           this.errorindex = false;
           this.practicequestion.option[this.answer].optionLetter = '&#xe66c;'
         }else{
          this.errorindex = getanswerindex.getindex(data.studentAnswer);
          this.practicequestion.option[this.answer].optionLetter = '&#xe66c;'
          this.practicequestion.option[this.errorindex].optionLetter = '&#xe659;'
          }
        }else{
          this.errorindex = false;
          this.answer = false;
        }
    },
     chooseanswer(index){
      if(this.answerclickflag){
        this.answerclickflag = false
        api.recordanswer({questionId:this.titleId,exercisesType:this.$route.query.subjectType,studentAnswer:index}).then(data => {
          // console.log(data)
          if(data.code == 0){
            let data1= {menuSort:parseInt(this.$route.query.titleindex),state:''};
            let data2 = {studentAnswer:index,trueAnswer:data.data.trueAnswer,num:this.getquestioninfoAll(parseInt(this.$route.query.titleindex)),isCollection:true};
            this.answershow = true;
            this.answer = getanswerindex.getindex(data.data.trueAnswer);
            this.trueAnswer = data.data.trueAnswer;
            if(index == data.data.trueAnswer){
                data1.state = 2; 
                this.errorindex = false;
                this.practicequestion.option[this.answer].optionLetter = '&#xe66c;';
                data2.isCollection = false;
            }else{
                data1.state = 3;
                this.$store.commit('SET_COLLECTION',true);
                this.errorindex = getanswerindex.getindex(index);
                this.practicequestion.option[this.answer].optionLetter = '&#xe66c;'
                this.practicequestion.option[this.errorindex].optionLetter = '&#xe659;'
            }
            if(this.subjecttype === 1){
            this.$store.dispatch('set_menusortinfolist_two',data1);
            this.$store.dispatch('set_questioninfoall_two',data2);
          }
          }else{
            if(data.code == 400){
               this.returntologin(data.msg)
            }
          }
        })
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
    // this.popuoboxshow = true;
    // this.popuoboxoption = {title:'123',content:'55555551555555555555555555555'}
    let index = parseInt(this.$route.query.titleindex) + 1;
    this.loading = true;
    this.$store.commit('SET_TITLE',index);
    this.$router.push({path:'/practice?schoolId='+this.$route.query.schoolId+'&subjectId='+this.$route.query.subjectId+'&subjectType='+this.$route.query.subjectType+'&titleindex='+index})
   },
   closepopup(){
    this.popuoboxshow = false;
   },
   popyesbtn(){

   },
   pulluperror(data){//子模块的添加错题错误状态收值方法
      // console.log(data)
      this.errorshow = true;
      this.errorMessage = data;
      setTimeout(() => {
        this.errorshow = false;
      },1500)
   },
   returntologin(msg){ //接口返回code == 400,需要重新登录时候调用此方法
      this.loading = false;
      this.errormsg = msg;
      this.errorshow = true;
      setTimeout(() => {
        this.errorshow = false;
      },1500);
      this.$router.push('/login?schoolId='+this.$route.query.schoolId);
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
            if(to.path === '/practice'){
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
      background-color: #EFEFEF;
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
          height: 52px;
          margin-left: calc(50% - 210px);
          margin-right: calc(50% - 230px);
          margin-top: 18px;
          color: white;
          span{
            display: block;
            width: 158px;
            height: 50px;
            float: left;
            border: 1px solid;
            border-color: transparent;
            border-radius: 10px;
            text-align: center;
            line-height: 50px;
          }
          .practice_type_acitve{
            border-color: black;
            background-color: white;
            color: black;
          }
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
            span{
            font-weight: bold;
          }
          }
          .answererror{
            color: #ED512D;
            span{
            font-weight: bold;
            i{
              font-size: 32px;
            }
          }
          }
          ul{
            padding: 0 46px;
            li{
              width: 100%;
              display: block;
              padding: 27.5px 0;
              span{
                width: 51px;
                height: 51px;
                display: block;
                float: left;
                line-height: 54px;
                border-radius: 50%;
                background-color: white;
                box-shadow:0px 3px 13px 0px rgba(167,167,167,0.46);
                -webkit-box-shadow:0px 3px 13px 0px rgba(167,167,167,0.46);
                -moz-box-shadow:0px 3px 13px 0px rgba(167,167,167,0.46);
                text-align: center;
                i{
                  font-size: 36px;
                }
              }
              p{
                padding: 0px;
                padding-left: 70px;
              }
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
          width: 338px;
          height: 88px;
          background-color: white;
          font-size: 30px;
          line-height: 88px;
          text-align: center;
        }
        span:nth-child(1){
           box-shadow:0px 3px 13px 0px rgba(167,167,167,0.46);
           -webkit-box-shadow:0px 3px 13px 0px rgba(167,167,167,0.46);
           -moz-box-shadow:0px 3px 13px 0px rgba(167,167,167,0.46);
           border-radius:20px 0px 0px 20px;
        }
        span:nth-child(2){
            box-shadow:0px 3px 13px 0px rgba(167,167,167,0.46);
           -webkit-box-shadow:0px 3px 13px 0px rgba(167,167,167,0.46);
           -moz-box-shadow:0px 3px 13px 0px rgba(167,167,167,0.46);
           border-radius:0px 20px 20px 0px;
        }
        .next_another{
           border-radius: 20px !important;
           width: 500px;
           margin: 0 auto;
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
