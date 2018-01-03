<template>
  <nav class="breadcrumb pl-3 mb-2" aria-label="breadcrumbs">
    <ul>
      <li :class="activeBreadcrumb(route)" v-for="(route, index) in $route.matched" v-if="route.path != '/'" :key="route.path" >
        <span class="icon is-small" v-show="index == 0"><i class="fa fa-caret-right"></i></span>
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
        activeBreadcrumb: function(route) {
          var curPath =  this.$route.path;
          if (route.regex.test(curPath)) {
            return "is-active";
          }
          return "";
        }
      },
    };
</script>
