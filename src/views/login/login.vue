<template>
  <div class="login-bg">
    <div class="column is-offset-two-fifths is-one-fifth">
      <div class="login-card">
        <div class="has-text-centered mb-3">
          <img class="login-logo" src="https://placehold.it/128x128">
        </div>
        <div class="field">
          <div class="control has-icons-left has-icons-right"
               :class="{'has-icons-right': errors.has('username') }">
            <input name="username" v-validate="'required'" class="input is-medium"
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
            <input name="password" v-validate="'required|max:16'" class="input is-medium"
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
          <label class="checkbox has-text-grey">
            <input type="checkbox">
            记住我
          </label>
        </div>

        <button class="button is-block is-primary is-medium is-fullwidth"
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
        <p class="subtitle is-size-6 has-text-grey">使用以下账号直接登录</p>
        <div class="buttons">
          <button class="button is-medium">
              <span class="icon">
                <i class="mdi mdi-facebook"></i>
              </span>
          </button>
          <button class="button is-medium">
              <span class="icon">
                <i class="mdi mdi-twitter"></i>
              </span>
          </button>
        </div>
        <p class="mt-3 has-text-grey">
          <a href="../" class="has-text-grey">注册</a> &nbsp;·&nbsp;
          <a href="../" class="has-text-grey">忘记密码</a> &nbsp;·&nbsp;
        </p>
      </div>
    </div>
  </div>
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
