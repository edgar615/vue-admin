<template>
    <div class="container">
       <Navbar></Navbar>
      <!-- Main container -->
      <div class="columns is-fullheight">
        <div class="column is-2 is-sidebar-menu is-hidden-mobile">
            <Aside></Aside>
        </div>
        <div class="column is-main-content">
          <MainContent></MainContent>
        </div>
      </div>
    </div>
</template>
<script>
   import Navbar from '@/components/layout/navbar/navbar.vue';
   import Aside from '@/components/layout/aside/aside.vue';
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
