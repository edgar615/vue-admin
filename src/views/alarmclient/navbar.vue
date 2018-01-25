<template>
  <nav class="navbar has-shadow">
    <div class="container">
      <div class="navbar-brand">
        <!--<a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
        </a>-->
        <a class="navbar-item brand-text" href="#">
          智慧消防运营服务平台
        </a>
        <div class="navbar-burger burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>


        <div class="navbar-end">
          <a class="navbar-item" href="#" @click="logout">
            <b-icon icon="user"></b-icon>
            <span>{{user.username}}</span>
          </a>
          <a class="navbar-item" href="#" @click="logout">
            <b-icon icon="sign-out"></b-icon>
            <span>退出</span>
          </a>
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
          }
        },
        computed: {
          user() {
            return this.$store.getters.user
          }
        }
    };
</script>

