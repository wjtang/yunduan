<template>
  <div class="dropdown">
      <p>选择你要考的科目</p>
      <div class="dropdown-main" @click="showdrop">
           <p>{{choosetitle}}</p> <img src="../../assets/img/down.png">
           <div class="downmenu" v-show="dropcanshow">
              <ul>
                <li v-for="item in downdata" @click="choosetype(item)">{{item.data}}</li>
              </ul>
           </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'dropdown',
  data () {
    return {
      choosetitle: '',
      downdata: [{id:0,data:'高处安装、拆除、维护 —初训'},{id:1,data:'111123'},{id:0,data:'12312323'}],
      dropcanshow: false
    }
  },
  mounted() {
     this.choosetitle = this.downdata[0].data;
  },
  methods : {
      showdrop(){
        this.dropcanshow = !this.dropcanshow;
      },
      choosetype(data){
        this.choosetitle = data.data;
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
