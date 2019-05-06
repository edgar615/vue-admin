<template>
  <div>
    <Navbar></Navbar>
    <!-- Main container -->
    <div class="is-fullheight main-container">
      <div class="is-sidebar-menu bg-aside is-paddingless">
        <Aside></Aside>
        <SubAside class="side-menu" v-if="showLevel1Menu"></SubAside>
      </div>
      <div class="is-main-content is-paddingless" :class="showLevel1Menu ? '' : 'is-main-content-no-submenu'">
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
      showLevel1Menu () {
        const menus = this.$store.getters.menuList()
        let showLevelNum = 0
        menus.forEach(function (item) {
          if (!item.hidden) {
            showLevelNum = showLevelNum + 1
          }
        })

        return showLevelNum > 1
      }
    },
    components: {
      Navbar, Aside, MainContent, SubAside
    }
  }
</script>
