<template>
  <div class="tile is-ancestor">
    <div class="tile is-vertical is-parent">
      <div class="tile is-child box" style="border-radius:0;">
        <p class="title is-size-6 has-text-primary">{{this.$store.getters.pageTitle}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'PageTitle'
  }
</script>
