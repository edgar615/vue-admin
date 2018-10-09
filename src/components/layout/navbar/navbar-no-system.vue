<template>
  <nav class="navbar is-bg-navbar has-shadow">
    <div class="navbar-brand">
      <router-link class="navbar-item logo" v-show="$showLogo" to="/">
        <img class="m-auto" src="../../../assets/logo.png">
      </router-link>
      <router-link class="navbar-item brand-text" to="/">
        {{$appName}}
        </router-link>
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
          <b-icon icon="logout"></b-icon>
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
          this.$router.push({path: "/login"});
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

