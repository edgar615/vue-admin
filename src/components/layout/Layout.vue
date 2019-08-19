<template>
  <div>
    <Navbar></Navbar>
    <!-- Main container -->
    <div class="is-fullheight main-container">
        <Aside></Aside>
      <div class="is-main-content is-paddingless">
        <nav class="level page-title mb-3">
          <div class="level-left">
            <PageTitle></PageTitle>
          </div>
        </nav>

        <router-view class="pl-3 pr-3"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import Navbar from '@/components/layout/navbar/navbar.vue'
  import Aside from '@/components/layout/aside/aside.vue'

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
      Navbar, Aside
    }
  }
</script>
