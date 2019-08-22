<template>
      <div class="is-child notification is-blue-grey-50 no-radius is-marginless">
        <p class="title is-size-6 has-text-primary">{{this.$store.getters.pageTitle}}</p>
      </div>
</template>
<script>
  export default {
    name: 'PageTitle'
  }
</script>
