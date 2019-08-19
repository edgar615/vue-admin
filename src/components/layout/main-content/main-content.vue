<template>
  <div class="main-content">
    <!--<RouterBreadcrumb></RouterBreadcrumb>-->
    <nav class="level page-title">
      <!-- Left side -->
      <div class="level-left">
        <PageTitle></PageTitle>
      </div>
    </nav>
    <router-view class="pl-3 pr-3"></router-view>
  </div>
</template>
<script>
  import Title from '@/components/layout/title/title.vue'

  export default {
    data () {
      return {}
    },
    components: {
      Title
    }
  }
</script>
