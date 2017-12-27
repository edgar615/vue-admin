<template>
  <div class="card mb-3">
    <header class="card-header">
      <p class="card-header-title">
        <b-taglist>
          <b-tag type="is-primary" size="is-small">警情：{{tableDataSimple.length}}</b-tag>
          <b-tag type="is-success" size="is-small" v-show="sockState">通信正常 </b-tag>
          <b-tag type="is-danger" size="is-small" v-show="!sockState">通信故障</b-tag>
          <b-tag type="is-info" size="is-small" v-show="alarmLoading"><span>警情加载中</span><b-icon icon="spinner"></b-icon> </b-tag>
        </b-taglist>
      </p>
      <p class="card-header-icon buttons">
        <button class="button is-info is-small is-pulled-right" @click="handleColor">
        <span class="icon">
          <i class="fa fa-bars"></i>
        </span>
          <span>颜色设置</span>
        </button>
        <button class="button is-info is-small" @click="handleSplit">
        <span class="icon">
          <i class="fa fa-columns"></i>
        </span>
          <span>警情分栏</span>
        </button>
      </p>
    </header>
    <div class="card-content">
      <b-tabs type="is-toggle" size="is-small" @change="filterAlarm" style="margin-bottom: 20px;">
        <b-tab-item label="全部警情"></b-tab-item>
        <b-tab-item label="一级警情"></b-tab-item>
        <b-tab-item label="布撤防"></b-tab-item>
        <b-tab-item label="逾时未设"></b-tab-item>
        <b-tab-item label="重点单位"></b-tab-item>
      </b-tabs>

      <b-table
        narrowed
        bordered
        mobile-cards

        :loading="alarmLoading"

        :data="showAlarms.length == 0 ? [] : showAlarms"

        :opened-detailed="defaultOpenedDetails"
        detailed
        detail-key="id"
      >
        <!--:row-class="(row, index) => row.level % 5 === 1 ? 'bg-danger' : ''"-->
        <template slot-scope="props" slot="header">
          <b-tooltip :active="!!props.column.meta" :label="props.column.meta" dashed>
            {{ props.column.label }}
            </b-tooltip>
        </template>
        <template slot="empty">
          <EmptyTable></EmptyTable>
        </template>
        <template slot-scope="props">
          <b-table-column label="级别" width="150">
            <b-taglist>
              <b-tag :type="levelClass(props.row.level )">{{ props.row.level }}级</b-tag>
              <b-tag v-show="props.row.state  == 1"> <b-icon icon="envelope"></b-icon></b-tag>
              <b-tag v-show="props.row.important" type="is-danger"> <b-icon icon="star"></b-icon></b-tag>
            </b-taglist>
          </b-table-column>

          <b-table-column label="报警时间">
            {{ props.row.date }}
          </b-table-column>

          <b-table-column label="编号">
            {{ props.row.alarmUserCode }}
          </b-table-column>

          <b-table-column label="单位名称">
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
            {{ props.row.controlUser }}
          </b-table-column>

          <b-table-column label="操作">
            <button class="button is-info is-small" @click="handleAlarm" title="处理">
              <b-icon icon="check-square-o"></b-icon>
            </button>
          </b-table-column>
        </template>

        <template slot="detail" slot-scope="props">
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img src="http://via.placeholder.com/128x128">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong  style="color: #fff; float: left">{{ props.row.alarmUserCode }} {{ props.row.alarmUserName }}</strong>
                  <small style="float: left; margin-left: 10px;">{{props.row.alarmType}}</small>
                  <small style="float: right;">{{ props.row.date }}</small>
                  <br>
                  <span class="is-size-7	">报警详情</span>
                </p>
              </div>
            </div>
          </article>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
  //websocket，没有这部分需要可以删除
  import EventBus from '@/sock/vertx-eventbus'
  import AlarmHandleMain from '@/views/alarmclient/alarm-handle-main'
  import AlarmColorMain from '@/views/alarmclient/alarm-color-main'
  import AlarmSplitMain from '@/views/alarmclient/alarm-split-main'
  import EmptyTable from '@/components/EmptyTable.vue';
  export default {
    components: {
      AlarmHandleMain,AlarmColorMain,AlarmSplitMain,EmptyTable
    },
    data() {
      return {
        sockState: false,
        alarmLoading: false,
        tableDataSimple : [],
        showAlarms:[],
        defaultOpenedDetails: [1]
      }
    },
    methods: {
      rnd(start, end){
        return Math.floor(Math.random() * (end - start) + start);
      },
      levelClass(level) {
          if (level == 5) {
              return 'is-danger';
          }
        if (level == 4) {
          return 'is-warning';
        }
        if (level == 3) {
          return 'is-success';
        }
        if (level == 2) {
          return 'is-info';
        }
        if (level == 1) {
          return 'is-light';
        }
      },
      addRndAlarm() {
        const tableDataSimple = [
          { 'id' : 1, 'level': 1, 'alarmUserCode': '00000001', 'alarmUserName': '创星汇', 'date':
            new Date().toLocaleString(),'alarmCate': '设备报警', 'alarmType': '火警',  'fullname': '李毅', 'tel': '17027431478', 'controlUser': '张星'},
          { 'id' : 2, 'level': 2, 'alarmUserCode': '00000001', 'alarmUserName': '创星汇', 'date':
            new Date().toLocaleString(), 'alarmCate': '设备报警' , 'alarmType': '火警',  'fullname': '李毅', 'tel': '13867543678', 'controlUser': '张星'},
          {  'id' : 3, 'level': 3, 'alarmUserCode': '00000003', 'alarmUserName': '软件园', 'date':
            new Date().toLocaleString(), 'alarmCate': '设备报警' , 'alarmType': '火警',  'fullname': '张家华', 'tel': '15521484296', 'controlUser': '闵亮'},
          {  'id' : 4, 'level': 4, 'alarmUserCode': '00000004', 'alarmUserName': '武大园', 'date':
            new Date().toLocaleString(), 'alarmCate': '设备报警', 'alarmType': '火警',  'fullname': '王小二', 'tel': '13427193456' , 'controlUser': '张君雅'},
          {  'id' : 5, 'level': 5, 'alarmUserCode': '00000002', 'alarmUserName': '金融港', 'date':
            new Date().toLocaleString(), 'alarmCate': '设备报警' , 'alarmType': '火警',  'fullname': '刘亮', 'tel': '18621483212', 'controlUser': '江小白'},
          {  'id' : 6, 'level': 6, 'alarmUserCode': '00000001', 'alarmUserName': '创星汇', 'date':
            new Date().toLocaleString(),'alarmCate': '设备报警', 'alarmType': '火警',  'fullname': '李毅', 'tel': '13867543678', 'controlUser': '张星'},
          {  'id' : 7, 'level': 7, 'alarmUserCode': '00000001', 'alarmUserName': '创星汇', 'date':
            new Date().toLocaleString(), 'alarmCate': '设备报警' , 'alarmType': '火警',  'fullname': '李毅', 'tel': '13867543678', 'controlUser': '张星'},
          {  'id' : 8, 'level': 8, 'alarmUserCode': '00000003', 'alarmUserName': '软件园', 'date':
            new Date().toLocaleString(), 'alarmCate': '设备报警' , 'alarmType': '火警',  'fullname': '张家华', 'tel': '15521484296', 'controlUser': '闵亮'},
          {  'id' : 9, 'level': 9, 'alarmUserCode': '00000004', 'alarmUserName': '武大园', 'date':
            new Date().toLocaleString(),'alarmCate': '设备报警', 'alarmType': '火警',  'fullname': '王小二', 'tel': '13421483456' , 'controlUser': '张君雅'},
          {  'id' : 10, 'level': 10, 'alarmUserCode': '00000002', 'alarmUserName': '金融港', 'date':
            new Date().toLocaleString(), 'alarmCate': '设备报警' , 'alarmType': '火警',  'fullname': '刘亮', 'tel': '18621483212', 'controlUser': '江小白'}
        ]
        const vm = this;
        tableDataSimple.forEach(function(item, index, input) {
          item.level = vm.rnd(1, 6);
        })
        tableDataSimple[2].state = 1//新警情
        tableDataSimple[5].state = 1
        tableDataSimple[5].important = true;
        tableDataSimple[8].important = true;
       this.tableDataSimple = tableDataSimple;
        this.showAlarms = this.tableDataSimple;
      },
      addAlarm() {
          const  alarm = this.tableDataSimple[this.rnd(0, 9)];
        alarm.id = this.tableDataSimple.length + 1;
        this.tableDataSimple.push(alarm);
      },
      filterAlarm(index) {
          const  vm = this;
        if (index == 0) {
          vm.showAlarms = vm.tableDataSimple;
        } else if (index == 1) {
          vm.showAlarms = [];
          vm.tableDataSimple.forEach(function(item, index, input) {
                if (item.level == 1) {
                  vm.showAlarms.push(item);
                }
            })
        } else if (index == 2) {
          vm.showAlarms = [];
        } else if (index == 3) {
          vm.showAlarms = [];
        } else if (index == 4) {
          vm.showAlarms = [];
          vm.tableDataSimple.forEach(function(item, index, input) {
            if (item.alarmUserCode == '00000003') {
              vm.showAlarms.push(item);
            }
          })
        }
      },
      handleAlarm() {
        this.$modal.open({
          parent: this,
          component: AlarmHandleMain,
          hasModalCard: true,
          width : 960
        })
      },
      handleColor() {
        this.$modal.open({
          parent: this,
          component: AlarmColorMain,
          hasModalCard: true,
          width : 960
        })
      },
      handleSplit() {
        this.$modal.open({
          parent: this,
          component: AlarmSplitMain,
          hasModalCard: true,
          width : 960
        })
      }
    },
    created() {
      const vm = this;
      vm.alarmLoading = true;
      setTimeout(function() {
        vm.addRndAlarm()
        vm.alarmLoading = false;
      }, 1000)

      const eb = new EventBus("http://localhost:9090/eventbus", {
        vertxbus_ping_interval : 1000
      });
      eb.onopen = function () {
        vm.sockState = true;
        vm.$toast.open({
          duration: 1500,
          position: 'is-bottom',
          message: '警情推送服务连接成功',
          type: 'is-success'
        })
        eb.registerHandler("news-feed", function (err, msg) {
          vm.addAlarm();
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

<style scoped>
  .b-tabs {
    margin-bottom: 0px;
    padding-bottom: 0px;
    height: 35px;
  }
</style>
