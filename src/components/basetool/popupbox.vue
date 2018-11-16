<template>
  <div class="popupbox" v-show="pshow">
      <div class="mask-box" @click="closepopup" v-show="maskBox"></div>
      <div class="popupbox-main">
        <p>{{title}}</p>
        <div class="popupbox-text">{{content}}</div>
        <div class="button-box">
          <span class="cancel-box" @click="closepopup">{{canceltext}}</span>
          <span class="yes-box" @click="submityes">{{yestext}}</span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'popupbox',
    props:{
    options:{
      type:Object,
      default:''
    },
    pshow:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
     maskBox:true,
     title:'',
     content:'',
     canceltext:'取消',
     yestext:'确定'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.set_data()
    })
  },
  methods : {
      closepopup : function(){
        this.$emit('pclose');
      },
      set_data : function(){
        if(this.options.maskBox) this.maskBox = this.options.maskBox
        if(this.options.title) this.title = this.options.title
        if(this.options.content) this.content = this.options.content
        if(this.options.canceltext) this.canceltext = this.options.canceltext
        if(this.options.yestext) this.yestext = this.options.yestext
      },
      submityes: function(){
        this.$emit('popyes');
      }

  },
  watch : {
    options(){
      this.set_data()
    }
  }
}
</script>

<style lang="less" scoped>
    .popupbox{
      .mask-box{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        background-color: rgba(128,128,128,.8);
        z-index: 2;
      }
      .popupbox-main{
        width: 450px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 3;
        background-color: white;
        border-radius: 10px;
        text-align: center;
        p{
          padding: 15px;
          font-size: 36px;
          word-wrap: break-word;
        }
        .popupbox-text{
          padding: 15px;
          font-size: 30px;
          word-wrap: break-word;
        }
        .button-box{
          display: flex;
          padding: 20px 0px;
          span{
            flex:1;
            font-size: 36px;
          }
          span:nth-child(1){
            border-right: 1px solid grey;
          }
        }
      }
    }
</style>
