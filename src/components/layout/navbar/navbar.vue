<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <a class="navbar-item is--brand">
        <img class="navbar-brand-logo" src="https://bulma.io/images/bulma-logo.png">
      </a>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="burgerClick()" :class="burgerToggle ? 'is-active' : ''">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navMenu" class="navbar-menu" :class="menuToggle ? 'is-active' : ''">
      <div class="navbar-start">
        <a v-for="system in systems" class="navbar-item" :class="activeSystem == system.subsystemId ? 'is-active' : '' "
           @click="onClickSystem(system.subsystemId)">
          <b-icon :icon="system.icon" class="mr-2"></b-icon>
          {{system.name}}
        </a>
        <div class="navbar-item is-hoverable" v-if="groupSystems.length > 0">
          <a class="navbar-link">
            更多
          </a>
          <div class="navbar-dropdown is-boxed">
            <a class="navbar-item" href="#" v-for="system in groupSystems" @click="onClickSystem(system.subsystemId)">
              {{system.name}}
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <a class="navbar-item">
          <span>{{user.username}}，您好</span>
        </a>
        <router-link class="navbar-item nav-tag" to="/">
          <b-icon icon="bell" size="is-small" data-badge="8" class="badge is-badge-danger"></b-icon>
        </router-link>
        <div class="navbar-item is-hoverable ml-2">
          <a class="navbar-link">
            <span>我的空间</span>
          </a>
          <div class="navbar-dropdown is-boxed">
            <a class="navbar-item" href="#">
              <b-icon icon="account" size="is-small mr-2"></b-icon>
              个人资料
            </a>
            <router-link class="navbar-item" to="/profile/changepwd">
              <b-icon icon="lock-reset" size="is-small mr-2"></b-icon>
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
    data () {
      return {
        burgerToggle: false,
        menuToggle: false
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('Logout').then(res => {
          this.$router.push({path: '/login'})
        }).catch(err => {
          console.log(err)
        })
      },
      onClickSystem (subsystemId) {
        this.$store.commit('ACTIVE_SYSTEM', subsystemId)
        // 跳转到新页面
        const menus = this.$store.getters.menuList()
        if (menus.length > 0 && menus[0].path) {
          this.$router.push(menus[0].path)
        }
      },
      burgerClick () {
        this.burgerToggle = !this.burgerToggle
        this.menuToggle = !this.menuToggle
      }
    },
    computed: {
      navbarNum () {
        // 假设菜单占据3/5
        return (this.$store.getters.screenWidth * 3 / 5) / 96
      },
      user () {
        return this.$store.getters.user
      },
      groupSystems () {
        var groupSystem = []
        const vm = this
        this.$store.getters.systemList().forEach(function (item, index, input) {
          if (index >= vm.navbarNum) {
            groupSystem.push(item)
          }
        })
        return groupSystem
      },
      systems () {
        var systemArray = []
        const vm = this
        this.$store.getters.systemList().forEach(function (item, index, input) {
          if (index < vm.navbarNum) {
            systemArray.push(item)
          }
        })
        const activeSystem = this.$store.getters.activeSystem
        if (systemArray.length > 0 && (activeSystem === undefined || activeSystem === '')) {
          this.$store.commit('ACTIVE_SYSTEM', systemArray[0].subsystemId)
        }
        return systemArray
      },
      activeSystem () {
        var active = this.$store.getters.activeSystem
        return active
      }
    }
  }
</script>

