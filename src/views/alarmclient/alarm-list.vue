<template>
  <div class="card mb-3">
    <header class="card-header">
      <p class="card-header-title">
        警情列表
      </p>
    </header>
    <div class="card-content">
      <b-table
        narrowed
        :data="tableDataSimple"
        :opened-detailed="defaultOpenedDetails"
        detailed
        detail-key="level"
      >

        <template slot-scope="props">
          <b-table-column label="级别" width="50"  numeric>
            {{ props.row.level }}
          </b-table-column>

          <b-table-column label="报警时间">
            {{ new Date(props.row.date).toLocaleDateString() }}
          </b-table-column>

          <b-table-column label="用户编号">
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

          <b-table-column label="安全管理人">
            {{ props.row.fullname }} {{ props.row.tel }}
          </b-table-column>

          <b-table-column label="兼职管理员">
            {{ props.row.fullname }}
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

  export default {
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
        tableDataSimple,
        defaultOpenedDetails: [1]
      }
    },
  created() {
    const eb = new EventBus("http://localhost:9090/eventbus", {
      vertxbus_ping_interval : 1000
    });
    const vm = this;
    eb.onopen = function () {
      vm.$toast.open({
        duration: 1500,
        position: 'is-bottom',
        message: '警情推送服务连接成功',
        type: 'is-success'
      })
    };
    eb.onclose = function () {
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
