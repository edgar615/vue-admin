<template>
  <div class="card mb-3">
    <header class="card-header">
      <p class="card-header-title">
        <b-taglist>
          <b-tag type="is-primary" size="is-medium">警情：{{tableDataSimple.length}}</b-tag>
          <b-tag type="is-success" size="is-medium" v-show="sockState">通信正常 </b-tag>
          <b-tag type="is-danger" size="is-medium" v-show="!sockState">通信故障</b-tag>
          <b-tag type="is-info" size="is-medium">警情加载中<b-icon icon="spinner"></b-icon> </b-tag>
        </b-taglist>
      </p>
      <p class="card-header-title">
        <a href="#" class="button is-primary">
        <span class="icon">
          <i class="fa fa-bars"></i>
        </span>
          <span>颜色设置</span>
        </a>
        <a href="#" class="button is-info">
        <span class="icon">
          <i class="fa fa-columns"></i>
        </span>
          <span>警情分栏</span>
        </a>
      </p>

    </header>
    <div class="card-content">
      <b-table
        narrowed
        paginated
        per-page="10"
        :data="tableDataSimple"
        :opened-detailed="defaultOpenedDetails"
        detailed
        detail-key="level"
        :row-class="(row, index) => row.level % 5 === 1 ? 'bg-danger' : ''"
      >
       <template slot-scope="props" slot="header">
            <b-tooltip :active="!!props.column.meta" :label="props.column.meta" dashed>
                {{ props.column.label }}
            </b-tooltip>
        </template>
        <template slot-scope="props">
          <b-table-column label="级别" width="50"  numeric>
            {{ props.row.level }}
          </b-table-column>

          <b-table-column label="报警时间">
            {{ new Date(props.row.date).toLocaleDateString() }}
          </b-table-column>

          <b-table-column label="编号">
            {{ props.row.alarmUserCode }}
          </b-table-column>

          <b-table-column label="单位名称" centered>
            {{ props.row.alarmUserName }}
          </b-table-column>

          <b-table-column label="类别">
            {{ props.row.alarmCate }}
          </b-table-column>

          <b-table-column label="类型">
            {{ props.row.alarmType }}
          </b-table-column>

          <b-table-column label="姓名" meta="安全管理人姓名">
            {{ props.row.fullname }}
          </b-table-column>

          <b-table-column label="电话" meta="安全管理人电话">
            {{ props.row.tel }}
          </b-table-column>

          <b-table-column label="管理人" meta="专兼职消防管理人姓名">
            {{ props.row.fullname }}
          </b-table-column>

          <b-table-column label="操作">
              <button class="button is-primary is-small" @click="handleAlarm">
                <b-icon icon="check-square-o"></b-icon>
                <span>处理</span>
              </button>
            </b-table-column>
        </template>

        <template slot="detail" slot-scope="props">
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img src="static/img/placeholder-128x128.png">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ props.row.alarmUserCode }} {{ props.row.alarmUserName }}</strong>
                  <small>1111</small>
                  <small>31m</small>
                  <br>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Proin ornare magna eros, eu pellentesque tortor vestibulum ut.
                  Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                </p>
              </div>
            </div>
          </article>
        </template>
      </b-table>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
      <span>
        警情菜单栏
      </span>
      </p>
      <p class="card-footer-item">
      <span>
      警情菜单栏
      </span>
      </p>
    </footer>
  </div>
</template>

<script>
  //websocket，没有这部分需要可以删除
  import EventBus from '@/sock/vertx-eventbus'
  import AlarmHandle from '@/views/alarmclient/alarm-handle'

  export default {
    components: {
      AlarmHandle
    },
    data() {
      const tableDataSimple = [
        { 'level': 1, 'alarmUserCode': '00000001', 'alarmUserName': 'Simmons', 'date':
          '2016-10-15 13:43:27','alarmCate': '设备报警', 'alarmType': '火警',  'fullname': '张三', 'tel': '12345678'},
        { 'level': 2, 'alarmUserCode': '00000001', 'alarmUserName': 'Simmons', 'date': '2016-12-15 06:00:53', 'alarmCate': '设备报警' , 'alarmType': '火警',  'fullname': '张三', 'tel': '12345678'},
        { 'level': 3, 'alarmUserCode': '00000003', 'alarmUserName': 'Gilbert', 'date':
          '2016-04-26 06:26:28', 'alarmCate': '设备报警' , 'alarmType': '火警',  'fullname': '张三', 'tel': '12345678'},
        { 'level': 4, 'alarmUserCode': '00000004', 'alarmUserName': 'Flores', 'date':
          '2016-04-10 10:28:46', 'alarmCate': '设备报警', 'alarmType': '火警',  'fullname': '张三', 'tel': '12345678' },
        { 'level': 5, 'alarmUserCode': '00000002', 'alarmUserName': 'Lee', 'date':
          '2016-12-06 14:38:38', 'alarmCate': '设备报警' , 'alarmType': '火警',  'fullname': '张三', 'tel':
          '12345678'},
        { 'level': 6, 'alarmUserCode': '00000001', 'alarmUserName': 'Simmons', 'date':
          '2016-10-15 13:43:27','alarmCate': '设备报警', 'alarmType': '火警',  'fullname': '张三', 'tel': '12345678'},
        { 'level': 7, 'alarmUserCode': '00000001', 'alarmUserName': 'Simmons', 'date':
          '2016-12-15 06:00:53', 'alarmCate': '设备报警' , 'alarmType': '火警',  'fullname': '张三', 'tel': '12345678'},
        { 'level': 8, 'alarmUserCode': '00000003', 'alarmUserName': 'Gilbert', 'date':
          '2016-04-26 06:26:28', 'alarmCate': '设备报警' , 'alarmType': '火警',  'fullname': '张三', 'tel': '12345678'},
        { 'level': 9, 'alarmUserCode': '00000004', 'alarmUserName': 'Flores', 'date':
          '2016-04-10 10:28:46', 'alarmCate': '设备报警', 'alarmType': '火警',  'fullname': '张三', 'tel': '12345678' },
        { 'level': 10, 'alarmUserCode': '00000002', 'alarmUserName': 'Lee', 'date':
          '2016-12-06 14:38:38', 'alarmCate': '设备报警' , 'alarmType': '火警',  'fullname': '张三', 'tel': '12345678'}
      ]

      return {
        sockState: false,
        tableDataSimple,
        defaultOpenedDetails: [1]
      }
    },
  methods: {
    addAlarm(alarm) {
      alarm.level = this.tableDataSimple.length + 1;
      this.tableDataSimple.push(alarm);
    },
    handleAlarm() {
      this.$modal.open({
        parent: this,
        scroll: 'clip',
        component: AlarmHandle,
        hasModalCard: true,
        width : 960
      })
    }
  },
  created() {
    const eb = new EventBus("http://localhost:9090/eventbus", {
      vertxbus_ping_interval : 1000
    });
    const vm = this;
    eb.onopen = function () {
      vm.sockState = true;
      vm.$toast.open({
        duration: 1500,
        position: 'is-bottom',
        message: '警情推送服务连接成功',
        type: 'is-success'
      })
      eb.registerHandler("news-feed", function (err, msg) {
        const alarm = { 'alarmUserCode': '00000002', 'alarmUserName': 'Lee', 'date':
          '2016-12-06 14:38:38', 'alarmCate': '设备报警' , 'alarmType': '火警',  'fullname': '张三', 'tel': '12345678'}
        vm.addAlarm(alarm);
        vm.$toast.open({
          duration: 1500,
          position: 'is-bottom',
          message: '用户报警',
          type: 'is-warning'
        })
      });
    };
    eb.onclose = function () {
      vm.sockState = false;
      vm.$toast.open({
        duration: 1500,
        position: 'is-bottom',
        message: '警情推送服务连接失败',
        type: 'is-danger'
      })
    }
    eb.onmessage = function(e) {
      console.log(e);
    }
  }
  }
</script>
