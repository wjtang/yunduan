<template>
  <div class="exammessage">
      <div class="exam-top">
        <i class="iconfont icon-back" @click="gobackfunc"></i>
         <p>考试</p>
         <span @click="goexamlist">考试记录</span>
      </div>
      <div class="exammessage-main">
          <div class="message">
             <ul>
               <li>
                 <span>考试科目</span><span>{{examName}}</span>
               </li>
               <li>
                 <span>考试规格</span><span>{{examSpec}}</span>
               </li>
               <li>
                 <span>剩余次数</span><span>{{remainFrequency}}</span>
               </li>
               <li>
                 <span>平均成绩</span><span>{{avgScore}}</span>
               </li>
             </ul>
          </div>
          <span class="attention">{{mattersNeedAttention}}</span>
          <div class="go-exam" @click="goexam">开始考试</div>
      </div>
        <v-loading v-show = "loading"></v-loading>
  </div>
</template>

<script>
import '../assets/iconfont/iconfont.css';
import api from '../api/sendrequest.js';
import loading from './basetool/loading.vue'
export default {
  name: 'popupbox',
  data () {
    return {
      loading: false
    }
  },
  mounted() {
    if(!this.$store.state.exambasedata){
        api.getexaminfo(this.$route.query.subjectId).then(data => {
             if(data.code == 0){
             this.$store.dispatch('set_exambasedata',data.data);
           }else{
             if(data.code == 400){
              this.$router.push('/?schoolId='+this.$route.query.schoolId);
             }
           }
        })
    }
  },
  computed:{
    examName : function(){//试卷名称
      if(this.$store.state.exambasedata){
        return this.$store.state.exambasedata.examName;
      }
    },
    examSpec : function(){//考试规格
      if(this.$store.state.exambasedata){
        return this.$store.state.exambasedata.examSpec;
      }
    },
    remainFrequency: function(){//剩余次数
      if(this.$store.state.exambasedata){
        return this.$store.state.exambasedata.remainFrequency;
      }
    },
    avgScore : function(){//平均分数
      if(this.$store.state.exambasedata){
        return this.$store.state.exambasedata.avgScore;
      }
    },
    mattersNeedAttention : function(){//注意事项
      if(this.$store.state.exambasedata){
        return this.$store.state.exambasedata.mattersNeedAttention;
      }
    }
  },
  methods : {
     gobackfunc(){
        this.$router.push({path:'/subject?schoolId='+this.$route.query.schoolId});
     },
     goexamlist(){
        this.$router.push({path:'/examlist?schoolId='+this.$route.query.schoolId+'&subjectId='+this.$route.query.subjectId});
     },
     goexam(){
        this.loading = true;
        api.getexamid(parseInt(this.$route.query.subjectId)).then(data => {
            if(data.code == 0){
            api.getexam({sort:1,examid:data.data.examId}).then(data1 => {
              this.$store.dispatch('set_questioninfo',data1.data);
              api.getexammenu(data.data.examId).then(data2 => {
                  this.$store.dispatch('set_menusortinfolist',data2.data)
                  this.$store.dispatch('set_questioninfoall','');
                  this.$router.push({path:'/exam?schoolId='+this.$route.query.schoolId+'&subjectId='+this.$route.query.subjectId+'&examId='+data.data.examId+'&titleindex=1'})
              })
            })
          }else{
            if(data.code == -3){
              if(data.remainExamSecond > 0){
                api.getexam({sort:1,examid:data.examId}).then(data1 => {
              this.$store.dispatch('set_questioninfo',data1.data);
              api.getexammenu(data.examId).then(data2 => {
                  this.$store.dispatch('set_menusortinfolist',data2.data)
                  this.$store.dispatch('set_questioninfoall','');
                  this.$router.push({path:'/exam?schoolId='+this.$route.query.schoolId+'&subjectId='+this.$route.query.subjectId+'&examId='+data.examId+'&titleindex=1'})
              })
            })
              }else{
                api.submitexam({subjectId:this.$route.query.subjectId,examid:data.examId}).then(data1 => {
                    console.log(data1);
                    if(data.code == 0){
                      api.getexamid(parseInt(this.$route.query.subjectId)).then(data2 => {
                          if(data2.code == 0){
                              api.getexam({sort:1,examid:data2.data.examId}).then(data3 => {
                                this.$store.dispatch('set_questioninfo',data3.data);
                                api.getexammenu(data2.data.examId).then(data4 => {
                                  this.$store.dispatch('set_menusortinfolist',data4.data)
                                  this.$store.dispatch('set_questioninfoall','');
                                  this.$router.push({path:'/exam?schoolId='+this.$route.query.schoolId+'&subjectId='+this.$route.query.subjectId+'&examId='+data2.data.examId+'&titleindex=1'})
                                })
                              })
                          }
                      })
                    }
                })
              }
            }
          }
        })
     } 
  },
  components : {
    'v-loading' : loading
  }
}
</script>

<style lang="less" scoped>
    .exammessage{
      width: 100%;
      height: 100%;
      background-color: #EFEFEF;
      overflow: hidden;
      .exam-top{
        height: 88px;
        background-color: white;
        display: flex;
        overflow: hidden;
        text-align: center;
        justify-content: space-between;
        i{
          font-size: 50px;
          line-height: 88px;
          color: black;
          font-weight: bold;
        }
        p{
          line-height:88px;
          font-size: 32px;
          margin-left: 80px;
        }
        span{
          font-size: 26px;
          color: #666666;
          line-height: 88px;
          padding-right: 45px;
        }
      }
      .exammessage-main{
        width: 100%;
        height: calc(100% - 91px);
        margin-top: 3px;
        background-color: white;
        .message{
           height: 484px;
           padding: 119px 50px 90px 50px;
           ul{
              padding: 0 35px 0 50px;
              height: 100%;
              background-color: #F8F8F8;
              border-radius: 30px;
              li{
                width: 100%;
                height: 121px;
                line-height: 121px;
                font-size: 34px;
                color: #B4B4B4;
                display: flex;
                justify-content: space-between;
                span{
                  overflow: hidden;
                  text-overflow:ellipsis;
                  white-space: nowrap;
                }
                span:nth-child(1){
                    width: 170px;
                }
                span:nth-child(2){
                    flex:1;
                    text-align: right;
                    color: #666666;
                    font-size: 30px;
                }
              }
           }
        }
        .attention{
          display: block;
          margin: 0 auto;
          text-align: center;
          font-size: 24px;
          color: #9E9E9E;
          width: 512px;
          line-height: 30px;
          word-wrap: break-word;
          word-break: break-all;
          padding-bottom: 89px;
        }
        .go-exam{
          margin: 0 auto;
          width: 600px;
          height: 88px;
          line-height: 88px;
          font-size: 36px;
          color: white;
          text-align: center;
          background-color: #1784D9;
          border-radius: 44px;;
        }
      }
    }
</style>
