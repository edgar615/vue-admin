<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li v-bind:class="activeBreadcrumb(route.path)" v-for="route in $route.matched" v-if="route.path != '/'" :key="route.path" >
        <router-link :to="{path: route.path}">{{ route.meta.name }} </router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
    export default {
        data() {
            return {
            };
        },
       methods: {
        activeBreadcrumb: function(path) {
          var curPath =  this.$route.path;
          if (path == curPath) {
            return "is-active";
          }
          return "";
        }
      },
    };
</script>
