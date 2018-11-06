<template>
  <div class="loading">
    <div class="loading-mask">
     <img src="../../assets/img/loading.gif">
   </div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  data () {
    return {
      
    }
  },
  methods : {
     
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .loading{
      width: 100%;
      height: 100%;
      position:absolute;
      top: 0px;
      left: 0px;
      .loading-mask{
        width: 450px;
        height: 200px;
        position: absolute;
        top: 50%;
        margin-top: -100px;
        text-align: center;
        left: 50%;
        margin-left: -225px;
        background-color: rgba(192,192,192,.3);
        border-radius: 20px;
        img{
          margin-top: 60px;
          width: 80px;
          }
        }
    }

</style>
