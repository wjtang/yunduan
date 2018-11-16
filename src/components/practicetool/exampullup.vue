<template>
  <div class="pullup">
    <div class="practice-bottom" :class="{practice_bottom_active: choosetitle}">
        <div class="practice-bottom-left" @click="submitexam">
          <!-- <i class="iconfont" :class="{icon_xing: !collection,icon_xingxing: collection}"></i>
          <span>添加至错题</span> -->
          <img src="../../assets/img/exam_push.png" v-show="!ispush">
          <span v-show="!ispush">交卷</span>
        </div>
        <div class="practice-bottom-right">
            <img src="../../assets/img/more.png" @click="showtitlebox">
            <span>{{titleIndex}}/{{titlesumnum}}</span>
        </div>
      </div>
     <div class="titlebox" :class="{titlebox_active: choosetitle}">
          <p>{{subjectName}}</p>
          <div class="titlebox-main" ref="wrapper">
            <ul>
              <li v-for="(item,index) in titlenum" @click="gotitle(index)"><span :class="{done: item.state == 2, notdone: item.state == 1}">{{item.menuSort}}</span></li>
            </ul>
          </div>
      </div>
      <div class="mask-box" v-show="choosetitle" @click="showtitlebox"></div>
  </div>
</template>

<script>
import '../../assets/iconfont/iconfont.css'
import BScroll from 'better-scroll'
import api from '../../api/sendrequest.js'
export default {
  name: 'pullup',
  data () {
    return {
      choosetitle: false,
      subjectName:'',
      titletruenum:0,
      titleerrornum:0,
      ispush:false
    }
  },
  mounted(){
      this.subjectName = this.$store.state.subjectName;
      // this.titlesumnum = this.$store.state.
      this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper,{click:true});
      if(!this.$route.query.ispush){

      }else{
        this.ispush = true;
      }
    })
  },
  computed :{
    titleIndex: function(){
      return this.$route.query.titleindex
    },
    titlenum : function(){
       let num = []
       if(this.$store.state.menuSortInfoList){
       let data = this.$store.state.menuSortInfoList
       let truenum = 0;
       let errornum = 0;
       data.forEach((item,index) => {
         num.push({menuSort:item.sort,state:item.state})
       })
     }
      // console.log(num)
       return num
    },
    collection: function(){
        return this.$store.state.isCollection;
    },
    titlesumnum : function(){
      if(this.$store.state.menuSortInfoList){
      return this.$store.state.menuSortInfoList.length
    }else{
      return 0;
    }
    },
    titleid : function(){
      return this.$store.state.questionId
    }
  },
  methods : {
    getdata(){

    },
    showtitlebox(){
      this.choosetitle = !this.choosetitle;
   },
    setcollection(){
      // this.collection = !this.collection;
      api.seterrorques(this.titleid).then(data => {
        if(data.code == 0){
            this.collection = true
        }else{
          this.$emit('errormsg',data.msg);
        }
      })
    },
    gotitle(index){
      this.choosetitle = !this.choosetitle;
      index = index +1;
      if(!this.ispush){
      this.$router.push({path:'/exam?schoolId='+this.$route.query.schoolId+'&subjectId='+this.$route.query.subjectId+'&examId='+this.$route.query.examId+'&titleindex='+index})
      }else{
        this.$router.push({path:'/exam?schoolId='+this.$route.query.schoolId+'&subjectId='+this.$route.query.subjectId+'&examId='+this.$route.query.examId+'&titleindex='+index+'&ispush=1'})
      }
    },
    submitexam(){
      this.$emit('submitexam');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
         .practice-bottom{
        position: absolute;
        top: 100%;
        margin-top: -98px;
        width: 100%;
        height: 98px;
        background-color: white;
        display: flex;
        justify-content: space-between;
        transition: all .5s;
        .practice-bottom-left{
          display: flex;
          font-size: 26px;
          img{
            height: 30px;
            margin-left: 36px;
            margin-top: 34px;
            margin-right: 12px;
          }
          span{
            line-height: 98px;
          }
      }
      .practice-bottom-right{
          width: 360px;
          display: flex;
          line-height: 98px;
          justify-content: flex-end;
          .icon-gouxuan, .icon-shanchuguanbicha2{
            font-size: 28px;
            padding-right: 8px;
          }
          span{
            font-size: 28px;
            padding-right: 60px;
          }
          img{
            height: 29px;
            margin-left: 35px;
            margin-top: 35px;
            margin-right: 12px;
          }
      }
    }
    .practice_bottom_active{
        margin-top: -680px;
        z-index: 4;
    }
    .titlebox{
      width: 100%;
      height: 582px;
      position: absolute;
      top: 100%;
      transition: all .5s;
      background-color: white;
      margin-top: 0px;
      z-index: 4;
      overflow:hidden;
      p{
        padding: 40px 42px;
        font-size: 26px;
        font-weight: bold;
      }
      div{
        padding: 0 42px 24px 42px;
        height: 445px;
        overflow: hidden;
        ul{
          width: 100;
          li{
            width: 14.28%;
            height: 66px;
            margin-bottom: 24px;
            display: inline-block;
            
            span{
              display: block;
              margin: 0 auto;
              width: 62px;
              height: 62px;
              border-radius: 50%;
              border:2px solid grey;
              text-align: center;
              line-height: 62px;
              font-size: 32px;
              color: grey;
            }
            .done{
                background-color: #358AFF;
                color: white;
                border-color: #358AFF;
            }
          }
        }
      }
    }
    .titlebox_active{
      margin-top: -582px;
    }
    .mask-box{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0px;
      background-color: rgba(128,128,128,.8);
      z-index: 3
    }
</style>
