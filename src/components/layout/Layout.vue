<template>
  <div>
    <Navbar></Navbar>
    <!-- Main container -->
    <div class="columns is-fullheight main-container">
      <div class="column is-1 is-sidebar-menu is-hidden-mobile bg-aside is-paddingless">
        <Aside></Aside>
        <SubAside class="side-menu"></SubAside>
      </div>
      <div class="column is-main-content is-paddingless">
        <MainContent></MainContent>
      </div>
    </div>
  </div>
</template>
<script>
  import Navbar from '@/components/layout/navbar/navbar.vue'
  import Aside from '@/components/layout/aside/aside.vue'
  import SubAside from '@/components/layout/aside/sub-aside.vue'
  import MainContent from '@/components/layout/main-content/main-content.vue'

  export default {
    data () {
      return {}
    },
    computed: {
      showLevel2Menu () {
        var showLevel2 = false
        const menu = this.$store.getters.currentLevel1Menu()
        if (menu && menu.children) {
          menu.children.forEach(function (item) {
            if (!item.hidden) {
              showLevel2 = true
            }
          })
        }
        return showLevel2
      }
    },
    components: {
      Navbar, Aside, MainContent, SubAside
    },
    mounted () {
      // 计算匹配的菜单，改用router.afterEach实现
//        if (this.$route.matched) {
//            const last = this.$route.matched[this.$route.matched.length -1];
//          this.$store.commit('ACTIVE_LEVEL2_MENU', [last.meta.subsystemId, last.meta.parentId, last.meta.menuId])
//        }
    }
  }
</script>
