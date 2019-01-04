<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <div class="box">
            <p class="subtitle is-4 has-text-grey">密码登录</p><br>
              <div class="field">
                <div class="control has-icons-left has-icons-right"
                     :class="{'has-icons-right': errors.has('username') }">
                  <input name="username" v-validate="'required'" class="is-medium input"
                         :class="{'is-danger': errors.has('username') }" type="text" placeholder="用户名"
                         data-vv-as="用户名" v-model="username">
                  <span class="icon is-small is-left">
                    <i class="mdi mdi-account"></i>
                  </span>
                  <span class="icon is-small is-right has-text-danger" v-show="errors.has('username')">
                      <i class="mdi mdi-alert-circle-outline"></i>
                    </span>
                </div>
                <p v-show="errors.has('username')" class="help is-danger has-text-left">
                  {{errors.first('username')}}</p>
              </div>

              <div class="field">
                <div class="control has-icons-left has-icons-right"
                     :class="{'has-icons-right': errors.has('password') }">
                  <input name="password" v-validate="'required|max:16'" class="is-medium input"
                         :class="{'is-danger': errors.has('password') }" type="password" placeholder="密码"
                         data-vv-as="密码" v-model="password">
                  <span class="icon is-small is-left">
                    <i class="mdi mdi-lock"></i>
                  </span>
                  <span class="icon is-small is-right has-text-danger" v-show="errors.has('password')">
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
              <button class="button is-block is-info is-large is-fullwidth"
                      @click="login" :disabled='errors.any()'
                      :class="{'is-loading' : loading}">
                <span class="icon">
                      <i class="mdi mdi-login"></i>
                 </span>
                登录</button><br>
              <p class="subtitle is-5">使用以下账号直接登录</p>
              <button class="facebook-button button is-medium"><i class="fab fa-facebook-f"></i></button>
              <button class="twitter-button button is-medium"><i class="fab fa-twitter"></i></button>
              <button class="google-button button is-medium"><i class="fab fa-google-plus-g"></i></button>
          </div>
          <p class="has-text-grey">
            <a href="../">注册</a> &nbsp;·&nbsp;
            <a href="../">忘记密码</a> &nbsp;·&nbsp;
          </p>
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
  .hero {
    font-family: 'Tajawal', serif;
    font-size: 14px;
    font-weight: 300;
    overflow-y: hidden !important;
    background-image: url("../../assets/login_background.jpg") !important;
    -webkit-background-size:cover;
    -moz-background-size:cover;
    -o-background-size:cover;
    background-size:cover;
    background-position: center;
    background-repeat: no-repeat;
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
    background-color: rgba(255,255,255,0.1);
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

  .facebook-button {
    color: #fff;
    background-color: #3a589a;
    width: 50px;
  }

  .facebook-button:hover {
    border-color: #bdbdbd;
    color: #ffffff;
  }

  .twitter-button {
    color: #fff;
    background-color: #4099ff;
    width: 50px;
  }

  .twitter-button:hover {
    border-color: #bdbdbd;
    color: #ffffff;
  }

  .google-button {
    color: #fff;
    background-color: #e9544f;
    width: 50px;
  }

  .google-button:hover {
    border-color: #bdbdbd;
    color: #ffffff;
  }

  a {
    color: #fff;
  }

</style>
