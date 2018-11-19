<template>
  <div class="examlist">
      <div class="exam-top">
        <i class="iconfont icon-back" @click="gobackfunc"></i>
         <p>考试纪录</p>
      </div>
      <div class="examlist-main">
          <div class="examlist-main-top">
            <span>序号</span>
            <span>耗时</span>
            <span>正确率</span>
            <span>成绩</span>
            <span>操作</span>
          </div>
          <ul>
            <li v-for="(item,index) in list"><span>{{index}}</span><span>{{item.sumExamMinute}}</span><span>{{item.correctRate}}</span><span>{{item.totalScore}}</span><span v-if="item.state == 1">未开始</span><span v-if="item.state == 2">考试中</span><span v-if="item.state ==3" @click="backtoexam(item.examId)">查阅</span></li>
          </ul>
      </div>
  </div>
</template>

<script>
import '../assets/iconfont/iconfont.css';
import api from '../api/sendrequest.js';
export default {
  name: 'popupbox',
  data () {
    return {
      page:0,
      list:[] 
    }
  },
  mounted() {
    api.getexamlist({subjectId:this.$route.query.subjectId,page:this.page}).then(data => {
       // console.log(data);
       if(data.code == 0){
       this.list = data.data.list;
     }else{
      if(data.code == 400){
        this.$router.push('/login?schoolId='+this.$route.query.schoolId);
      }
     }
    });
    window.addEventListener('scroll',function(){
      console.log(111);
      if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
        console.log(123);
  }
    })
  },
  computed:{
    
  },
  methods : {
     gobackfunc(){
      this.$router.push({path:'/subject?schoolId='+this.$route.query.schoolId});
     }, 
     backtoexam(examId){
        this.$router.push({path:'/exam?schoolId='+this.$route.query.schoolId+'&subjectId='+this.$route.query.subjectId+'&examId='+examId+'&titleindex=1&ispush=1'})
     }
  }
}
</script>

<style lang="less" scoped>
    .examlist{
      width: 100%;
      height: 100%;
      background-color: white;
      overflow: hidden;
      .exam-top{
        height: 88px;
        background-color: white;
        display: flex;
        overflow: hidden;
        text-align: center;
        i{
          font-size: 50px;
          line-height: 88px;
          color: black;
          font-weight: bold;
        }
        p{
          line-height:88px;
          font-size: 32px;
          margin: 0 auto;
          position: relative;
          left: -25px;
        }
      }
      .examlist-main{
        width: 100%;
        height: calc(100% - 88px);
        overflow-y: auto;
        .examlist-main-top{
          padding: 0 62px;
          background-color: #1C8BE2;
          height: 88px;
          line-height: 88px;
          color: white;
          font-size: 30px;
          display:flex;
          text-align: center;
          span:nth-child(1){
            width: 110px;
          }
          span:nth-child(2){
              flex: 1;
          }
          span:nth-child(3){
            width: 110px;
          } 
          span:nth-child(4){
            width: 110px;
          }
          span:nth-child(5){
            width: 110px;
          }
        }
        ul{
          width: 100%;
          li{
            padding: 0 62px;
            display: flex;
            text-align: center;
            font-size: 30px;
            span:nth-child(1){
            width: 110px;
            }
            span:nth-child(2){
              flex: 1;
            }
            span:nth-child(3){
              width: 110px;
            } 
            span:nth-child(4){
              width: 110px;
            }
            span:nth-child(5){
              width: 110px;
            } 
          }
          li:nth-child(odd){
            height: 103px;
            line-height: 103px;
            color: black;
            background-color: white;
          }
          li:nth-child(even){
            height: 86px;
            line-height: 86px;
            color: white;
            background-color: #74BFDB;
          }
        }
      }
    }
</style>
