<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="column is-6 is-offset-3">
          <div class="widthcol">
            <div class="level">
              <figure class="avatar">
                <img src="../../assets/lock.png" alt="">
              </figure>
              <div class="logtitle">
                <h3 class="title has-text-orange">用户登录</h3>
                <p class="subtitle has-text-grey">Please enter your credentials to login.</p>
              </div>
            </div>
          </div>
          <div class="box">
            <div class="field">
              <div class="control has-icons-left has-icons-right"
                   :class="{'has-icons-right': errors.has('username') }">
                <input name="username" v-validate="'required'" class="is-large input"
                       :class="{'is-danger': errors.has('username') }" type="text" placeholder="用户名"
                       data-vv-as="用户名" v-model="username" @keydown.enter="login">
                <span class="icon is-left is-large">
                    <i class="mdi mdi-account"></i>
                  </span>
                <span class="icon is-right is-large has-text-danger"
                      v-show="errors.has('username')">
                      <i class="mdi mdi-alert-circle-outline"></i>
                    </span>
              </div>
              <p v-show="errors.has('username')" class="help is-danger has-text-left">
                {{errors.first('username')}}</p>
            </div>

            <div class="field">
              <div class="control has-icons-left has-icons-right"
                   :class="{'has-icons-right': errors.has('password') }">
                <input name="password" v-validate="'required|max:16'" class="is-large input"
                       :class="{'is-danger': errors.has('password') }" type="password"
                       placeholder="密码"
                       data-vv-as="密码" v-model="password" @keydown.enter="login">
                <span class="icon is-left is-large">
                    <i class="mdi mdi-lock"></i>
                  </span>
                <span class="icon is-right is-large has-text-danger"
                      v-show="errors.has('password')">
                      <i class="mdi mdi-alert-circle-outline"></i>
                    </span>
              </div>
              <p v-show="errors.has('password')" class="help is-danger has-text-left">
                {{errors.first('password')}}</p>
            </div>
            <div class="field has-text-left">
              <label class="checkbox">
                <input type="checkbox">
                记住我
              </label>
            </div>
            <button class="button is-block is-orange is-large is-fullwidth"
                    @click="login" :disabled='errors.any()'
                    :class="{'is-loading' : loading}">
                <span class="icon is-large">
                      <i class="mdi mdi-login"></i>
                 </span>
              登录
            </button>
            <p class="has-text-danger is-pulled-left is-size-6" v-if="errorMsg">
              登录失败，请确认是否输入正确的用户名和密码
            </p>
            <br>
            <p class="subtitle is-size-6">使用以下账号直接登录</p>
            <button class="button is-medium">
              <span class="icon is-large">
                      <i class="mdi mdi-facebook"></i>
              </span>
            </button>
            <button class="button is-medium">
              <span class="icon is-large">
                      <i class="mdi mdi-twitter"></i>
              </span>
            </button>
            <p class="mt-3">
              <a href="../" class="has-text-orange">注册</a> &nbsp;·&nbsp;
              <a href="../" class="has-text-orange">忘记密码</a> &nbsp;·&nbsp;
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {login} from '@/api/login'

  export default {
    data() {
      return {
        loading: false,
        errorMsg: undefined
      }
    },
    methods: {
      login() {
        const vm = this
        this.$validator.validateAll().then((result) => {
          vm.errorMsg = undefined
          if (result) {
            vm.loading = true
            login(this.username, this.password).then(response => {
              this.$store.commit('SET_TOKEN', response.data.token)
              window.location.reload()
            }).catch(function (error) {
              vm.loading = false
              vm.errorMsg = error.msg
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .hero {
    font-family: 'Tajawal', serif;
    font-size: 14px;
    font-weight: 300;
    overflow-y: hidden !important;
    /*background-image: url("../../assets/login_background.jpg") !important;*/
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .widthcol {
    max-width: 515px;
    margin-bottom: 40px;
  }

  .box {
    border-radius: 0px;
    box-shadow: 0px 0px 30px 0px rgba(218, 218, 218, 0.6);
    padding: 65px 50px 90px;
  }

  .box .field {
    text-align: left;
  }

  .box .control {
    padding-bottom: 6px;
  }

  a.has-text-orange{
    color:#ff8019;
  }


</style>
