<template>
  <div>
    <!--没有使用layout中的导航栏-->
    <Navbar></Navbar>
    <!-- Main container -->
    <div class="columns is-halfheight">
      <div class="column">
        <AlarmList></AlarmList>
      </div>
    </div>
    <div class="columns is-halfheight">
      <div class="column" style="color: #2576e7; font-size: 12px;">
        <Content></Content>
      </div>
    </div>
  </div>

</template>
<script>
  import Navbar from '@/views/alarmclient/navbar.vue';
  import AlarmList from '@/views/alarmclient/alarm-list.vue';
  import Content from  '@/views/alarmclient/content.vue';
  export default {
    data() {
    return {
    };
  },
  components: {
    Navbar, AlarmList,Content
  }
  };
</script>
