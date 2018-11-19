<template>
  <div class="dropdown">
      <p>选择你要考的科目</p>
      <div class="dropdown-main" @click="showdrop">
           <p>{{choosetitle}}</p> <img src="../../assets/img/down.png">
           <div class="downmenu" v-show="dropcanshow">
              <ul>
                <li v-for="(item,index) in downdata" @click="choosetype(item.subjectName,item.subjectId)">{{item.subjectName}}</li>
              </ul>
           </div>
      </div>
  </div>
</template>

<script>
import api from '../../api/sendrequest.js'
export default {
  name: 'dropdown',
  data () {
    return {
      choosetitle: '',
      downdata: [],
      dropcanshow: false
    }
  },
  mounted() {
     if(this.$store.state.subjectName){
      this.choosetitle = this.$store.state.subjectName;
      this.downdata = this.$store.state.subjectList;
     }else{
     // this.choosetitle = this.downdata[0].subjectName;
      api.getSubjectList().then(data => {
     if(data.code == 0){
      this.downdata = data.data;
      this.choosetitle = data.data[0].subjectName;
      this.$store.dispatch('set_subjectlist',data.data);
      this.$store.dispatch('set_subjectname',data.data[0])
     }else{
      if(data.code == 400){
        this.$router.push({path:'/login?schoolId='+this.$route.query.schoolId});
      }
     }
   })
   }
  },
  methods : {
      showdrop(){
        this.dropcanshow = !this.dropcanshow;
      },
      choosetype(data,index){
        this.choosetitle = data;
        this.$store.commit('SET_SUBJECTNAME',{subjectId:index,subjectName:data})
        // console.log(this.$store.state.subjectId)
      }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
     .dropdown{
        width:550px;
        background-color: rgba(131,178,247,.8); 
        margin: 0 auto;
        border-radius: 20px;
        p{
          text-align: center;
          padding: 31px 0 23px 0;
          font-size: 30px;
          font-weight: bold;
        }
        .dropdown-main{
          width: 481px;
          margin: 0 auto;
          height: 102px;
          position: relative;
          p{
            padding: 0px;
            display: block;
            height: 70px;
            line-height: 70px;
            border-radius: 12px;
            border: 1px solid white;
            font-size: 26px;
            width: 416px;
            padding-right: 64px;
            font-weight: normal;
          }
          img{
            position: absolute;
            width: 22px;
            top: 32px;
            right: 30px;
          }
          .downmenu{
            position:absolute;
            min-width: 481px;
            top: 80px;
            font-size: 26px;
            font-weight: normal;
            background-color: rgba(131,178,247,.8);
            border-radius: 12px;
            li{
              min-width: 420px;
              padding: 10px 30px;
            }
          }
        }
     }
</style>
