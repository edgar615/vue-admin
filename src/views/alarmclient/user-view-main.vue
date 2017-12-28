<template>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">单位详情</p>
      </header>
      <section class="modal-card-body">
        <div class="buttons has-addons is-centered">
          <span class="button">联网单位信息</span>
          <span class="button">建筑物</span>
          <span class="button">消防重点部位</span>
          <span class="button">消防设施</span>
          <span class="button">受理信息</span>
          <span class="button is-success">火灾信息</span>
          <span class="button">查岗信息</span>
          <span class="button">消防设施检查</span>
          <span class="button">火灾自动报警系统</span>
          <span class="button">消防给水系统</span>
          <span class="button">消防控制室</span>
          <span class="button">消防疏散通道</span>
          <span class="button">消防车道</span>
          <span class="button">扑救作业面</span>
          <span class="button">电气监测</span>
          <span class="button">历史告警</span>
        </div>
        <UserInfo></UserInfo>
      </section>
    </div>
</template>

<script>
  import UserInfo from '@/views/alarmclient/partials/user-info'
  export default {
    components: {
      UserInfo
    },
    data() {
      return {
        tabsIndex : 0,
        loading: false,
        model: {
        }
      }
    }
  }
</script>

<style scoped>
  .modal-card {
    width: 960px;
  }
  .button{
    width: 200px;
    margin-top: 0px;
    margin-bottom: 0px;
  }
</style>
