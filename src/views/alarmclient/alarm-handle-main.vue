<template>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">警情处理</p>
      </header>
      <section class="modal-card-body">
        <b-tabs type="is-toggle" size="is-small"  expanded v-model="tabsIndex">
          <b-tab-item label="警情信息" icon="exclamation-circle">
            <AlarmHandle></AlarmHandle>
          </b-tab-item>
          <b-tab-item label="警情复合" icon="check-circle">
            <AlarmCheck></AlarmCheck>
          </b-tab-item>
          <b-tab-item label="历史报警" icon="list">
            <AlarmHistory></AlarmHistory>
          </b-tab-item>
          <b-tab-item label="用户信息" icon="user-circle">
            <section class="hero is-info">
              <div class="hero-body">
                <h1 class="title">
                  用户信息
                </h1>
                <h2 class="subtitle">
                  用户详情
                </h2>
              </div>
            </section>
          </b-tab-item>
        </b-tabs>
      </section>
    </div>
</template>

<script>
  import AlarmHandle from '@/views/alarmclient/partials/alarm-handle'
  import AlarmCheck from '@/views/alarmclient/partials/alarm-check'
  import AlarmHistory from '@/views/alarmclient/partials/alarm-history'
  export default {
    components: {
      AlarmHandle,AlarmCheck,AlarmHistory
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
</style>
