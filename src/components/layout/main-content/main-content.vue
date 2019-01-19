<template>
  <div class="main-content">
    <RouterBreadcrumb></RouterBreadcrumb>
    <Title class="pl-3 pr-3"></Title>
    <router-view class="pl-3 pr-3"></router-view>
  </div>
</template>
<script>
  import RouterBreadcrumb from '@/components/layout/router-breadcrumb/router-breadcrumb.vue'
  import Title from '@/components/layout/title/title.vue'

  export default {
    data () {
      return {}
    },
    components: {
      RouterBreadcrumb, Title
    }
  }
</script>
