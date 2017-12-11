<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">登录</h3>
          <p class="subtitle has-text-grey">OM管理平台</p>
          <div class="box">
            <figure class="avatar">
              <img src="https://placehold.it/128x128">
            </figure>
            <form>
              <div class="field">
                <div class="control">
                  <input class="input is-large" type="email" placeholder="用户名" autofocus="" v-model="username">
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input class="input is-large" type="password" placeholder="密码" v-model="password">
                </div>
              </div>
              <a class="button is-block is-info is-large" @click="login">登录</a>
            </form>
          </div>
          <p class="has-text-grey">
            <a href="../">注册</a> &nbsp;·&nbsp;
            <a href="../">忘记密码</a> &nbsp;·&nbsp;
          </p>
        </div>
      </div>
    </div>

    <b-loading :active.sync="loading"></b-loading>
  </section>
</template>

<script>
  import { login } from '@/api/login';

  export default {
    data() {
      return {
        loading: false
      }
    },
    methods: {
      /*
       * Load async data
       */
      login() {
        const vm = this
        vm.loading = true
        login(this.username, this.password).then(response => {
        console.log(response.data);
        vm.loading = false;
      }) .catch(function (error) {
        var msg = "登录失败!";
        vm.loading = false;
        if (error.response) {
          msg += "错误：" + error.response.data.code
        }
        vm.$snackbar.open({
          message: msg,
          type: 'is-warning',
          actionText: null,
          duration: 1000,
          queue: false
        })
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
    background: #F2F6FA;
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
  input {
    font-weight: 300;
  }
  p {
    font-weight: 700;
  }
  p.subtitle {
    padding-top: 1rem;
  }
</style>
