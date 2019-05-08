<template>
  <div class="level-item">
    <p class="subtitle is-size-4 page-title-text">
      {{this.$store.getters.pageTitle}}
    </p>
  </div>
</template>
<script>
  export default {
    name: 'PageTitle'
  }
</script>
