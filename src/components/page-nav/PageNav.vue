<template>
  <div>
    <ul class="page-nav page-nav-material">
      <li :key="menu.sysPermissionId" v-for="menu in currentLevel1Menu.children" v-if="!menu.hidden">
        <router-link class="page-nav-link" :class="activeLevel2 == menu.sysPermissionId ? 'active' : '' "
                     :to="{path: currentLevel1Menu.path + '/' + menu.path}">
          &nbsp;·&nbsp;{{ menu.name }}
        </router-link>
      </li>
    </ul>
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
          return {
            children: []
          }
        }
      }
    }
  }
</script>

