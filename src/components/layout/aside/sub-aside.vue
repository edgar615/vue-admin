<template>
  <!-- 使用路由生成菜单 -->
  <div class="sub-menu is-size-7">
    <router-link v-for="menu in currentLevel1Menu.children" v-if="!menu.hidden"
                 :to="{path: currentLevel1Menu.path + '/' + menu.path}"
                 exact :key="menu.sysPermissionId" :class="activeLevel2 == menu.sysPermissionId ? 'active' : '' ">
      {{ menu.name }}
    </router-link>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    computed: {
      activeLevel2 () {
        return this.$store.getters.activeLevel2
      },
      currentLevel1Menu () {
        // 以前直接使用 $router.options.routes显示菜单，与后端结合之后，直接通过菜单计算
        const menu = this.$store.getters.currentLevel1Menu()
        if (menu) {
          return menu
        } else {
          return {}
        }
      },
      curSystemName () {
        const curSystem = this.$store.getters.currentSystem()
        if (curSystem) {
          return curSystem.name
        }
        return ''
      },
      curRoute () {
        // 根据匹配地址判断打开的一级菜单
        return this.$route.matched.map(function (route) {
          return route.path
        })
      }
    }
  }
</script>

