<template>
  <nav class="breadcrumb pl-3 ml-3 mt-1 mb-2 is-size-7" aria-label="breadcrumbs">
    <ul>
      <li :class="index == breadcrumbMenu.length -1 ? 'is-active' : '' " v-for="(route, index) in breadcrumbMenu" v-if="route.path != '/'" :key="route.path" >
        <router-link :to="{path: route.path}"><b-icon size="is-small" :icon="route.meta.icon"></b-icon><span>{{ route.meta.name }} </span></router-link>
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
       computed: {
         breadcrumbMenu() {
           return this.$route.matched
        }
      },
    };
</script>
