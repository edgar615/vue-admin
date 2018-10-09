<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-white">XXX综合管理平台</h3>
          <div class="box">
            <figure class="avatar">
              <img src="https://placehold.it/128x128">
            </figure>
            <form class="has-text-left">
              <div class="field">
                <label class="label">用户名</label>
                <div class="control" :class="{'has-icons-right': errors.has('username') }" >
                  <input name="username" v-validate="'required'" class="is-medium input" :class="{'is-danger': errors.has('username') }" type="text" placeholder="用户名"
                         data-vv-as="用户名" v-model="username">
                  <span class="icon is-small is-right has-text-danger" v-show="errors.has('username')">
                      <i class="mdi mdi-alert-circle-outline"></i>
                    </span>
                </div>
                <p v-show="errors.has('username')" class="help is-danger has-text-left">{{ errors.first('username')}}</p>
              </div>
              <div class="field">
                <label class="label">密码</label>
                <div class="control" :class="{'has-icons-right': errors.has('password') }" >
                  <input name="password" v-validate="'required|max:16'" class="is-medium input" :class="{'is-danger': errors.has('password') }" type="password" placeholder="密码"
                         data-vv-as="密码" v-model="password">
                  <span class="icon is-small is-right has-text-danger" v-show="errors.has('password')">
                      <i class="mdi mdi-alert-circle-outline"></i>
                    </span>
                </div>
                <p v-show="errors.has('password')" class="help is-danger has-text-left">{{ errors.first('password')}}</p>
              </div>
              <a class="button is-block is-info is-medium" style="font-size: 16px; height: 2.8em; line-height: 1.8em; "  @click="login" :disabled='errors.any()' :class="{'is-loading' : loading}">
                 <span class="icon">
                      <i class="mdi mdi-login"></i>
                 </span>&nbsp;&nbsp;
                登录
              </a>
            </form>
          </div>
          <p class="has-text-white">
            <router-link class="has-text-white" to="/signup"> 注册</router-link> &nbsp;·&nbsp;
            <router-link class="has-text-white" to="/signup"> 忘记密码</router-link>&nbsp;·&nbsp;
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { login } from '@/api/login';
  import dynamicRouter from '@/router/dynamicRouter'
  export default {
    data() {
      return {
        loading: false
      }
    },
    methods: {
      login() {
        const vm = this
        this.$validator.validateAll().then((result) => {
          if (result) {
            vm.loading = true
            login(this.username, this.password).then(response => {
            //跳转首页
            this.$store.commit('SET_TOKEN', response.data.token)
            //刷新页面
              window.location.reload();
          }).catch(function (error) {
            vm.loading = false;
          })
          return;
        }
      });
    }
   }
  }
</script>

<style scoped>
  html,body {
    font-family: 'Open Sans', serif;
    font-size: 14px;
    font-weight: 300;
  }
  .hero.is-success {
    background: url("../../assets/login_bg.jpg");
  }
  .hero .nav, .hero.is-success .nav {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .box {
    margin-top: 5rem;
  }
  .avatar {
    margin-top: -70px;
    padding-bottom: 20px;
  }
  .avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  }
</style>
