<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="column is-4 is-offset-4">
          <!-- <p class="subtitle has-text-grey">登录</p>-->
          <div class="box">
            <h3 class="title is-1 has-text-centered">{{$appName}}</h3>
            <!--<figure class="avatar">
              <img src="https://placehold.it/128x128">
            </figure>-->
            <form>
              <div class="field">
                <label class="label">用户名</label>
                <div class="control" :class="{'has-icons-right': errors.has('username') }">
                  <input name="username" v-validate="'required'" class="is-medium input"
                         :class="{'is-danger': errors.has('username') }" type="text"
                         placeholder="用户名"
                         data-vv-as="用户名" v-model="username">
                  <span class="icon is-small is-right has-text-danger"
                        v-show="errors.has('username')">
                      <i class="mdi mdi-alert-circle-outline"></i>
                    </span>
                </div>
                <p v-show="errors.has('username')" class="help is-danger has-text-left">{{
                  errors.first('username')}}</p>
              </div>
              <div class="field">
                <label class="label">密码</label>
                <div class="control" :class="{'has-icons-right': errors.has('password') }">
                  <input name="password" v-validate="'required|max:16'" class="is-medium input"
                         :class="{'is-danger': errors.has('password') }" type="password"
                         placeholder="密码"
                         data-vv-as="密码" v-model="password">
                  <span class="icon is-small is-right has-text-danger"
                        v-show="errors.has('password')">
                      <i class="mdi mdi-alert-circle-outline"></i>
                    </span>
                </div>
                <p v-show="errors.has('password')" class="help is-danger has-text-left">{{
                  errors.first('password')}}</p>
              </div>
              <p class="has-text-grey">
                <router-link to="/signup"> 注册</router-link> &nbsp;·&nbsp;
                <router-link to="/signup"> 忘记密码</router-link>&nbsp;·&nbsp;
              </p>
              <a class="button is-block is-info is-medium"
                 style="font-size: 16px; height: 2.8em; line-height: 1.8em; " @click="login"
                 :disabled='errors.any()' :class="{'is-loading' : loading}">
                 <span class="icon">
                      <i class="mdi mdi-login"></i>
                 </span>&nbsp;&nbsp;
                登录
              </a>
            </form>

          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {login} from '@/api/login'

  export default {
    data () {
      return {
        loading: false
      }
    },
    methods: {
      login () {
        const vm = this
        this.$validator.validateAll().then((result) => {
          if (result) {
            vm.loading = true
            login(this.username, this.password).then(response => {
              //跳转首页
              this.$store.commit('SET_TOKEN', response.data.token)
              //刷新页面
              window.location.reload()
            }).catch(function (error) {
              vm.loading = false
            })
            return
          }
        })
      }
    }
  }
</script>

<style scoped>
  html, body {
    font-family: 'Open Sans', serif;
    font-size: 14px;
    font-weight: 300;
  }

  .hero.is-success {
    background-color: #2269c2;
    background: url("../../assets/login_bg.jpg");
    background-position: left top;
    background-repeat: no-repeat;
    background-size: 100%;
  }

  .hero .nav, .hero.is-success .nav {
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .box {
    margin-top: 1rem;
    padding: 30px 40px;
  }

  .label {
    color: #333;
  }

  .avatar {
    margin-top: -70px;
    padding-bottom: 20px;
  }

  .avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
    box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
  }

  input {
    font-weight: 300;
  }

  p {
    font-weight: 300;
    font-size: 14px;
  }

  p.subtitle {
    padding-top: 1rem;
  }

  .field:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  .hero.is-success .title {
    color: #333;
    font-size: 16px;
    margin-bottom: 30px;
  }

  .has-text-grey {
    margin-top: 20px;
    padding-bottom: 40px;
  }

  .has-text-grey a {
    font-size: 13px;
    color: #666;
    background: none;
    font-weight: normal;
  }

  .has-text-grey a:hover {
    color: #2088ec;
  }

  /* input{
     background: #f4f4f4;
     border: 1px solid #d2d2d2;
     color: #666;
     font-size: 14px;
     box-shadow: none;
   }

   .input.is-medium, .taginput .is-medium.taginput-container.is-focusable, .textarea.is-medium {
     font-size: 1.25rem;
     font-size: 14px;
     color: #666;
     padding: 0 20px;
     padding-right: 20px;
     height: 3.2em;
   }*/
</style>
