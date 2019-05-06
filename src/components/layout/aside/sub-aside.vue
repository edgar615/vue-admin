<template>
  <!-- 使用路由生成菜单 -->
  <div class="sub-menu is-size-7">
    <router-link class="menu-title"
                 v-for="level1 in level1List" :key="level1.sysPermissionId"
                 :class="activeLevel1 == level1.sysPermissionId || activeModule  == level1.sysPermissionId ? 'active' : '' "
                 :to="{path: level1.path}" v-show="level1.type == 1 && !level1.hidden">
      <b-icon :icon="level1.icon" size="is-small"></b-icon>
      <span>{{level1.name}}</span>
    </router-link>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    computed: {
      level1List () {
        const menus = this.$store.getters.menuList()
        return menus.filter(function (item, index, array) {
          return item.level === 1
        })
      },
      activeLevel1 () {
        return this.$store.getters.activeLevel1
      },
      activeLevel2 () {
        return this.$store.getters.activeLevel2
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

