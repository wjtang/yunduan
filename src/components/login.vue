<template>
  <div class="login">
       <img :src="logoUrl">
       <p>{{title}}</p>
       <div class="login-box">
          <div class="member-num">
            <span></span>
            <input type="text" placeholder="输入你的账号" v-model="memberNum">
            <img src="../assets/img/line.png">
          </div>
          <div class="password">
             <span class="password-logo"></span>
            <input type="password" placeholder="输入你的密码" v-model="password">
            <p>忘记密码?</p>
            <img src="../assets/img/line.png">
          </div>
       </div>
       <div class="check-login" @click="CheckLogin">
          登入
       </div>
       <div class="error-message" v-show="errorshow">
          {{errorMessage}}
       </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      title: '',
      logoUrl: '',
      password:'',
      memberNum:'',
      errorshow: false,
      errorMessage:'账号密码错误'
    }
  },
  mounted() {
    this.$store.commit('SET_SCHOOL',{logoUrl:require('../assets/img/logo.png'),title:'佛山市高明区育安职业培训学校'});
    this.title = this.$store.state.schoolName;
    this.logoUrl = this.$store.state.schoolLogo;
  },
  methods : {
        CheckLogin(){
          // this.errorshow = true;
          this.$router.push({path:'/subject'})
          console.log(this.memberNum,this.password);
        }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
   .login{
    width: 100%;
    height: 100%;
    background-image: url('../assets/img/login_backg.jpg');
    background-position: center center;
    background-size:  cover;
    background-repeat: no-repeat;
    overflow: hidden;
    color: white;
     img{
        display: block;
        margin: 0 auto;
        margin-top: 128px;
        width: 150px;
        height: 150px;
    }
      p{
        display: block;
        width: 100%;
        font-size: 30px; /*px*/
        text-align: center;
        margin-top: 27px;
        color: white;
      }
      .login-box{
        width: 613px;
        margin: 0 auto;
        margin-top: 218px;
        .member-num , .password{
          overflow: hidden;
          span{
            display: block;
            float: left;
            width: 50px;
            height: 50px;
            background-image: url('../assets/img/login_member.png');
            background-position: center center;
            background-size: 100% 100%;
            margin-top: 11px;
          }
          input{
            margin-left: 25px;
            background-color: transparent;
            border: 0px;
            font-size: 28px;
            color: white;
            line-height: 40px;
            margin-top: 17px;
            outline: none;
          }
          img{
            margin-top: 11px;
            display: block;
            width: 100%;
            height: 2px;
          }
          width: 100%;
          height: 72px;
        }
        .password{
            margin-top: 50px;
           .password-logo{
            background-image: url('../assets/img/login_password.png');
           }
           p{
            width: 120px;
            display: block;
            float:right;
            margin-top: 20px;
            font-size: 24px;
            color: white;
           }
        }
      }
      .check-login{
        width: 400px;
        height: 88px;
        line-height: 88px;
        font-size: 30px; /*px*/
        background-color: #3261A5;
        margin: 0 auto;
        margin-top: 56px;
        text-align: center;
        border-radius: 44px;
      }
      .error-message{
        width: 500px;
        height: 100px;
        background-color: rgb(140,167,221);
        position: absolute;
        top: calc(50% - 50px);
        left: calc(50% - 250px);
        line-height: 100px;
        text-align: center;
        font-size: 30px; /*px*/
        border-radius: 20px;
      }
   }
</style>
