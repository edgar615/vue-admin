<template>
    <div>
       <Navbar></Navbar>
      <!-- Main container -->
      <div class="columns is-fullheight">
        <div class="column is-1 is-sidebar-menu is-hidden-mobile bg-aside">
            <Aside></Aside>
        </div>
        <div class="column is-main-content is-paddingless">
          <MainContent></MainContent>
        </div>
      </div>
    </div>
</template>
<script>
   import Navbar from '@/components/layout/navbar/navbar2.vue';
   import Aside from '@/components/layout/aside/aside2.vue';
   import MainContent from '@/components/layout/main-content/main-content.vue';
    export default {
        data() {
            return {
            };
        },
        components: {
          Navbar, Aside,MainContent
        }
    };
</script>
