<template>
      <div class="is-child notification is-primary no-radius is-marginless pl-3">
        <p class="title is-size-6 has-text-white">{{this.$store.getters.pageTitle}}</p>
      </div>
</template>
<script>
  export default {
    name: 'PageTitle'
  }
</script>
