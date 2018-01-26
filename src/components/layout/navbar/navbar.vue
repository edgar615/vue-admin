<template>
  <nav class="navbar is-dark-blue has-shadow">
    <div class="container">
      <div class="navbar-brand">
        <!--<a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
        </a>-->
        <a class="navbar-item brand-text" href="#">
          XXXX综合管理平台
        </a>
        <div class="navbar-burger burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navMenu" class="navbar-menu">

        <div class="navbar-end">
          <a class="navbar-item">
            <span>{{user.username}}，您好</span>
          </a>
          <div class="navbar-item is-hoverable">
            <a class="navbar-link">
              <span>我的空间</span>
            </a>
            <div class="navbar-dropdown is-boxed">
              <a class="navbar-item" href="#" >
                个人资料
              </a>
              <router-link class="navbar-item" to="/profile/changepwd" >
                修改密码
              </router-link>
            </div>
          </div>
          <a class="navbar-item" href="#" @click="logout">
            <b-icon icon="sign-out"></b-icon>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
    export default {
        data() {
            return {
            };
        },
        methods: {
          logout() {
            this.$store.dispatch('Logout').then(res => {
              this.$router.push("/login");
              }).catch(err => {
                console.log(err);
            });
          },
        },
        computed: {
          user() {
            return this.$store.getters.user
          }
        }
    };
</script>

