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
<style lang="scss" scoped>
   .is-sidebar-menu {
     padding: 2.5rem;
     background: #4a4a4a;
   }
   .columns.is-fullheight {
     min-height: calc(100vh - ( 3.25rem - .75rem ) );
     max-height: calc(100vh - ( 3.25rem - .75rem ) );
     display: flex;
     flex-direction: row;
     justify-content: stretch;
     padding-top: 1.25rem;
   }
   .columns.is-fullheight .column {
     overflow-y: auto;
   }

   .is-main-content {
     padding-left: 2.25rem;
     /*background: #dbdbdb;*/
   }

</style>
