<template>
  <div class="practice">
      <div class="practice-top-nav">
          <i class="iconfont icon-back" @click="gobackfunc"></i>
          <div class="practice-type"><span :class="{practice_type_acitve: practiceType == 0}" @click="changePracticeType(0)">答题模式</span><span :class="{practice_type_acitve: practiceType == 1}"  @click="changePracticeType(1)">背题模式</span></div>
          <i class="iconfont icon-shezhi"></i>
      </div>
      <div class="practice-main">
            <div class="practice-main-title">
                <p>{{practicequestionindex}}、{{practicequestion.title}}</p>
                <ul>
                    <li v-for="(item,index) in practicequestion.option" @click="chooseanswer(index)" :class="{answertrue: !answerclickflag && answer == index,answererror: !answerclickflag && errorindex === index}"><span><i class="iconfont" v-html="item.num"></i></span> <p>{{item.content}}</p></li>
                </ul>
                <span class="answer" v-show="answershow">答案: &nbsp; {{trueanswer}}</span>
            </div>
            <div class="changetitle">
                <span>上一题</span>
                <span>下一题</span>
            </div>
      </div>
      <v-pullup></v-pullup>
      <v-loading v-show = "loading"></v-loading>
  </div>
</template>

<script>
import '../assets/iconfont/iconfont.css'
import loading from './basetool/loading.vue'
import Pullup from './practicetool/pullup.vue'
export default {
  name: 'practice',
  data () {
    return {
      close: '&#xe659;',
      practiceType: 0,
      practicequestionindex:1,
      practicequestion:{title:'哪个部门负责日常监督检查工作,安全巡视的同时进行消防检查,推动消防安全制度的贯彻落实？',option:[{num:'A',content:'消防部门'},{num:'B',content:'管理部门'},{num:'C',content:'安全部门'}]},
      answer: 0,
      answerindex:['A','B','C','D','E','F','G'],
      answershow: false,
      answerclickflag: true,
      errorindex:1,
      loading: false
    }
  },
  mounted() {
    // console.log(this.$route)
  },
  computed : {
    trueanswer : function(){
      return this.answerindex[this.answer];
    }
  },
  methods : {
     chooseanswer(index){
      if(this.answerclickflag){
        this.answershow = true;
        this.answerclickflag = false;
        if(index == this.answer){
            this.errorindex = false;
            this.practicequestion.option[index].num = '&#xe66c;'
        }else{
            this.practicequestion.option[this.answer].num = '&#xe66c;'
            this.practicequestion.option[index].num = '&#xe659;'
            this.errorindex = index
        }
     }
   },
   gobackfunc(){
      this.$router.go(-1);
   },
   changePracticeType(data){
     this.practiceType = data;
   }
  },
  components : {
    'v-pullup' : Pullup,
    'v-loading' : loading
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .practice{
      width: 100%;
      height: 100%;
      background-color: #EFEFEF;
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
          border: 1px solid black;
          border-radius: 10px;
          font-size: 28px;
          background-color: black;
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
            padding: 0 46px;
            li{
              width: 100%;
              height: 55px;
              display: flex;
              padding: 27.5px 0;
              span{
                width: 51px;
                height: 51px;
                border-radius: 50%;
                background-color: white;
                box-shadow:0px 3px 13px 0px rgba(167,167,167,0.46);
                -webkit-box-shadow:0px 3px 13px 0px rgba(167,167,167,0.46);
                -moz-box-shadow:0px 3px 13px 0px rgba(167,167,167,0.46);
                text-align: center;
                i{
                  font-size: 36px;
                  line-height: 50px;
                }
              }
              p{
                padding: 0px;
                padding-left: 29px;
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
      }
     
    }
</style>
