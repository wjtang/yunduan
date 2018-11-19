<template>
  <div class="school">
      <img src="../assets/img/schooltext1.png">
      <img src="../assets/img/schooltext2.png">
      <div class="schoollist" ref="wrapper">
         <ul>
           <li v-for="item in schoolList" @click="gonext(item.schoolId)">
            <span></span>
           <p>{{item.schoolName}}</p></li>
         </ul>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import api from '../api/sendrequest.js'
export default {
  name: 'school',
  data () {
    return {
     schoolList:[]
    }
  },
  mounted(){
    api.getschoolist().then(data => {
       if(data.code == 0){
        this.schoolList = data.data;
        console.log(this.schoolList)
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.wrapper,{click:true});
        })
       }
    })
  },
  methods : {
      gonext(data){
        let nowtime = new Date().getTime();
        // localStorage.setItem('schoolId',data);
        if(localStorage.getItem('userupdate')){
          console.log(nowtime,localStorage.getItem('userupdate'))
          if(nowtime > parseInt(localStorage.getItem('userupdate'))){
            this.$router.push({path:'/login?schoolId='+data})
        }else{
          this.$router.push({path:'/subject?schoolId='+data})
        }
        }else{
          this.$router.push({path:'/login?schoolId='+data})
        }
      }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .school{
      width: 100%;
      min-height: 100%;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      background-image: url('../assets/img/schoolback.jpg');
      overflow: hidden;
      img:nth-child(1){
        display: block;
        width: 320px;
        margin: 0 auto;
        margin-top: 265px;
      }
      img:nth-child(2){
        display: block;
        width: 380px;
        margin: 0 auto;
      }
      .schoollist{
        width: 660px;
        height: 700px;
        background-color: rgba(86, 117, 220, 3);
        border-radius: 30px;
        margin: 0 auto;
        margin-top: 60px;
        ul{
          li{
            display: flex;
            line-height: 60px;
            padding: 25px 0px 25px 20px;
            font-size: 40px;
            color: white;
            font-weight: normal;
            span{
              display: block;
              width: 40px;
              background-position: center;
              background-size: contain;
              background-repeat: no-repeat;
              background-image: url('../assets/img/schoollogo.png');
            }
            p{
              padding-left: 20px;
            }
          }
        }
      }
    }
</style>
