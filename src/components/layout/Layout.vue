<template>
  <div>
    <Navbar></Navbar>
    <!-- Main container -->
    <div class="is-fullheight main-container">
        <Aside></Aside>
      <div class="is-main-content is-paddingless">
        <PageTitle></PageTitle>
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
    components: {
      Navbar, Aside
    }
  }
</script>
