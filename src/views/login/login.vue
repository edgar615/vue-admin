<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">OM管理平台</h3>
          <p class="subtitle has-text-grey">登录</p>
          <div class="box">
            <!--<figure class="avatar">
              <img src="https://placehold.it/128x128">
            </figure>-->
            <form>
              <div class="field">
                <div class="control" :class="{'has-icons-right': errors.has('username') }" >
                  <input name="username" v-validate="'required|alpha_dash'" class="is-large input" :class="{'is-danger': errors.has('username') }" type="text" placeholder="用户名"
                         data-vv-as="用户名" v-model="username">
                    <span class="icon is-small is-right has-text-danger" v-show="errors.has('username')">
                      <i class="fa fa-warning"></i>
                    </span>
                </div>
                <p v-show="errors.has('username')" class="help is-danger has-text-left is-size-6">{{ errors.first('username') }}</p>
              </div>
              <div class="field">
                <div class="control" :class="{'has-icons-right': errors.has('password') }" >
                  <input name="password" v-validate="'required|max:16'" class="is-large input" :class="{'is-danger': errors.has('password') }" type="password" placeholder="密码"
                         data-vv-as="密码" v-model="password">
                  <span class="icon is-small is-right has-text-danger" v-show="errors.has('password')">
                      <i class="fa fa-warning"></i>
                    </span>
                </div>
                <p v-show="errors.has('password')" class="help is-danger has-text-left is-size-6">{{ errors.first('password') }}</p>
              </div>
              <a class="button is-block is-info is-large" @click="login" :disabled='errors.any()'>登录</a>
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
              vm.loading = false;
            //跳转首页
            this.$store.commit('SET_TOKEN', response.data.token)
            dynamicRouter(response.data.token, this.$router, this.$store)
            this.$router.push({ path: '/' })
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
    background: #F2F6FA;
  }
  .hero .nav, .hero.is-success .nav {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .box {
    margin-top: 1rem;
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
