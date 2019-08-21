<template>
  <div>
    <Navbar></Navbar>
    <!-- Main container -->
    <div class="is-fullheight main-container">
        <Aside></Aside>
      <div class="is-main-content is-paddingless" :class="showFolderAside ? 'is-main-content-folded' : ''">
        <PageTitle></PageTitle>
        <router-view></router-view>
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
      showFolderAside() {
        return this.$store.getters.showFolderAside
      },
    },
    components: {
      Navbar, Aside
    }
  }
</script>
