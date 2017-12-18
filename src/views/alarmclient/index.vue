<template>
  <div class="container">
    <!-- Main container -->
    <div class="columns" style="padding-top: 0.75rem; padding-left: 0.75rem;padding-right: 0.75rem;">
      <div class="column bg-grey">
        <Toolbar></Toolbar>
      </div>
    </div>
    <div class="columns is-halfheight">
      <div class="column bg-white">
        <Content></Content>
      </div>
    </div>
    <div class="columns is-halfheight">
      <div class="column">
        <AlarmList></AlarmList>
      </div>
    </div>
  </div>
</template>
<script>
  import Navbar from '@/components/layout/navbar/navbar.vue';
  import AlarmList from '@/views/alarmclient/alarm-list.vue';
  import Content from  '@/views/alarmclient/content.vue';
  import Toolbar from  '@/views/alarmclient/toolbar.vue';
  export default {
    data() {
    return {
    };
  },
  components: {
    Navbar, AlarmList,Content,Toolbar
  }
  };
</script>
