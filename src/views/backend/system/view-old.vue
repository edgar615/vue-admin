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
              <b-field
                :type="errors.has('username') ? 'is-danger' : ''"
                :message="errors.first('username')">
                <b-input type="text"
                         size="is-large"
                         placeholder="用户名"
                         data-vv-as="用户名"
                         name="username" v-validate="'required|email'" v-model="username">
                </b-input>
              </b-field>
              <b-field
                :type="errors.has('password') ? 'is-danger' : ''"
                :message="errors.first('password')">
                <b-input type="password"
                         size="is-large"
                         placeholder="密码"
                         data-vv-as="密码"
                         name="password" v-validate="'required|max:5'" v-model="password">
                </b-input>
              </b-field>

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
        return;
      }
    });


  }
  }
  }
</script>
