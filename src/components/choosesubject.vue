<template>
  <div class="subject">
      <div class="subject-top">
        <img :src="logoUrl">
      </div>
      <div class="subject-main">
        <p>{{title}}</p>
        <v-dropdown></v-dropdown>
        <div class="subject-type">
          <ul>
            <li v-for="(item,index) in subjecttype" @click="gosubject(item.title
            ,index)"><div :class="{subject_active: activename == item.title}"><img :src="item.imgUrl"><p>{{item.title}}</p></div></li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import dropdown from './basetool/dropdown.vue'
export default {
  name: 'subject',
  data () {
    return {
      title:'',
      logoUrl:'',
      subjecttype:[{imgUrl: require('../assets/img/orderlogo.png'),title:'顺序练习'},{imgUrl:require('../assets/img/randomlogo.png'),title:'随机练习'},{imgUrl: require('../assets/img/errorquslogo.png'),title:'错题练习'},{imgUrl:require('../assets/img/examlogo.png'),title:'考试'}],
      activename: '',
      clickflag: true
    }
  },
  mounted() {
     this.title = this.$store.state.schoolName;
     this.logoUrl = this.$store.state.schoolLogo
  },
  methods : {
      gosubject(data,index){
        if(this.clickflag){
            this.activename = data;
            this.clickflag = false;
            switch(index){
              case 0 :
                this.subjecttype[0].imgUrl = require('../assets/img/orderlogo1.png');
                break;
              case 1 :
                this.subjecttype[1].imgUrl = require('../assets/img/randomlogo1.png');
                break;
              case 2 :
                this.subjecttype[2].imgUrl = require('../assets/img/errorquslogo1.png');
                break;
              case 3 :
                this.subjecttype[3].imgUrl = require('../assets/img/examlogo1.png'); 
            }
            this.$router.push({path:'/practice'})
        }
      }
  },
  components : {
    'v-dropdown': dropdown
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .subject{
      width: 100%;
      height: 100%;
      .subject-top{
         width: 100%;
         height: 228px;
         background-image: url('../assets/img/subjectop.jpg');
         background-repeat: no-repeat;
         background-size: cover;
         background-position: center center;
         img{
            width: 120px;
            height: 120px;
            position: relative;
            top: calc(100% - 60px);
            left: 50px;
         }
      }
      .subject-main{
          width: 100%;
          height: calc(100% - 228px);
          background-image: url('../assets/img/subjectbottom.jpg');
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
          color: white;
          p{
            position: relative;
            font-size: 30px;
            padding-left: 195px;
            padding-top: 14px;
            padding-bottom: 61px;
            font-weight: bold;
            letter-spacing: 5px;
          }
      }
      .subject-type{
          width: 606px;
          margin: 0 auto;
          height: 616px;
          margin-top: 51px;
          background-image: url('../assets/img/line1.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-position: center center;
          ul{
            width: 100%;
            height: 100%;
            li{
              width: 50%;
              height: 50%;
              display: block;
              float: left;
              div{
                width: 185px;
                height: 185px;
                border: 3px solid white;
                border-radius: 50%;
                p{
                  padding: 0px;
                  text-align: center;
                  font-size: 28px;
                  padding-top: 5px;
                  font-weight: normal;
                }
                img{
                  display: block;
                  margin: 0 auto;
                  width: 67px;
                  margin-top: 31px;
                }
              }
              .subject_active{
                background-color: rgba(255,255,255,.7);
                color: #3CA2FF;
              }
            }
            li:nth-child(1){
              div{
                margin-top: 60px;
                margin-left: 27px;
              }
            }
            li:nth-child(2){
              div{
                float: right;
                margin-right: 27px;
                margin-top: 60px;
              }
            }
            li:nth-child(3){
              div{
                margin-left: 27px;
                margin-top: 60px;
              }
            }
            li:nth-child(4){
              div{
                float: right;
                margin-right: 27px;
                margin-top: 60px;
              }
            }
          }
      }
    }

</style>
