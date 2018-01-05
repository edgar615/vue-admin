<template>
  <nav class="navbar is-dark-blue has-shadow">
    <div class="container">
      <div class="navbar-brand">
        <!--<a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
        </a>-->
        <a class="navbar-item brand-text" href="#">
          智慧消防联网报警综合管理平台
        </a>
        <div class="navbar-burger burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navMenu" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item"  v-for="system in systems" @click="selectSystem(system.sysIdentifier)">
            {{system.name}}
          </a>
          <div class="navbar-item is-hoverable" v-if="groupSystems.length > 0">
            <a class="navbar-link">
              更多
            </a>
            <div class="navbar-dropdown is-boxed">
              <a class="navbar-item" href="#"  v-for="system in groupSystems" @click="selectSystem(system.sysIdentifier)">
                {{system.name}}
              </a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item is-hoverable">
            <a class="navbar-link">
              <span>{{user.username}}</span>
            </a>
            <div class="navbar-dropdown is-boxed">
              <a class="navbar-item" href="#" >
                个人资料
              </a>
              <a class="navbar-item" href="#" @click="logout">
                <b-icon icon="sign-out"></b-icon>
                <span>退出</span>
              </a>
            </div>
          </div>
          <a class="navbar-item" href="#" @click="logout">
            <b-icon icon="sign-out"></b-icon>
            <span>退出</span>
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
          selectSystem(sysIdentifier) {
              //刷新左边侧边栏
              this.$store.commit('ACTIVE_SYSTEM', sysIdentifier)
            //跳转到新页面
            const menus = this.$store.getters.menuList();
            if (menus.length > 0 && menus[0].path) {
              this.$router.push(menus[0].path)
            }
          }
        },
        computed: {
          //仅显示有菜单的子系统
          groupSystems() {
            var groupSystem = [];
            this.$store.getters.systemList().forEach(function(item, index, input) {
              if (index >= 5) {
                groupSystem.push(item);
              }
            });
            return groupSystem;
          },
          systems() {
            var systemArray = [];
            this.$store.getters.systemList().forEach(function(item, index, input) {
              if (index < 5) {
                systemArray.push(item);
              }
            });
            const activeSystem = this.$store.getters.activeSystem;
            if (systemArray.length > 0 && ( activeSystem == undefined || activeSystem == '')) {
              this.$store.commit('ACTIVE_SYSTEM', systemArray[0].sysIdentifier)
            }
            return systemArray;
          },
          user() {
            return this.$store.getters.user
          }
        }
    };
</script>

