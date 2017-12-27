<template>
  <div class="card mb-3">
    <header class="card-header">
      <p class="card-header-title">
        <b-taglist>
          <b-tag type="is-primary" size="is-small">用户总数：1000</b-tag>
          <b-tag type="is-success" size="is-small">联网:955 </b-tag>
          <b-tag type="is-danger" size="is-small">未联网45</b-tag>
        </b-taglist>
      </p>
    </header>
    <div class="card-content">
      <b-table
        narrowed
        bordered
        mobile-cards

        :loading="userLoading"

        :data="tableDataSimple.length == 0 ? [] : tableDataSimple"
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
          <b-table-column label="级别" width="100">
            <b-taglist>
              <b-tag type="is-success" v-show="props.row.state == 1">联网</b-tag>
              <b-tag type="is-danger" v-show="props.row.state == 2">未联网</b-tag>
              <b-tag v-show="props.row.important"> <b-icon icon="star"></b-icon></b-tag>
            </b-taglist>
          </b-table-column>

          <b-table-column label="编号">
            {{ props.row.alarmUserCode }}
          </b-table-column>

          <b-table-column label="单位名称">
            {{ props.row.alarmUserName }}
          </b-table-column>

          <b-table-column label="单位类型">
            {{ props.row.type }}
          </b-table-column>

          <b-table-column label="地址">
            {{ props.row.address }}
          </b-table-column>

          <b-table-column label="消防控制室电话">
            {{ props.row.controlTel }}
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
            <button class="button is-info is-small" @click="handleUser" title="查看">
              <b-icon icon="info-circle"></b-icon>
            </button>
            <button class="button is-light is-small" @click="handleUser" title="提交维修单">
              <b-icon icon="gavel"></b-icon>
            </button>
            <button class="button is-dark is-small" @click="handleUser" title="提交巡检单">
              <b-icon icon="street-view"></b-icon>
            </button>
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
  import UserViewMain from '@/views/alarmclient/user-view-main'
  import EmptyTable from '@/components/EmptyTable.vue';
  export default {
    components: {
      UserViewMain,EmptyTable
    },
    data() {
      return {
        userLoading: false,
        tableDataSimple : []
      }
    },
    methods: {
      rnd(start, end){
        return Math.floor(Math.random() * (end - start) + start);
      },
      addRndUser() {
        const tableDataSimple = [
          { 'id' : 1, 'type': "办公园区", 'alarmUserCode': '00000001', 'alarmUserName': '创星汇', 'address':
            '洪山区茅店山东路','controlTel': '027-84659119',  'fullname': '李毅', 'tel': '17027431478', 'controlUser': '张星', 'state': 1},
          { 'id' : 2, 'type': "办公园区", 'alarmUserCode': '00000001', 'alarmUserName': '创星汇', 'address':
            '洪山区茅店山东路', 'alarmCate': '设备报警' , 'controlTel': '027-84659119',  'fullname': '李毅', 'tel': '13867543678', 'controlUser': '张星', 'state': 1},
          {  'id' : 3, 'type': "办公园区", 'alarmUserCode': '00000003', 'alarmUserName': '软件园', 'address':
            '洪山区关山大道', 'alarmCate': '设备报警' , 'controlTel': '027-84671259',  'fullname': '张家华', 'tel': '15521484296', 'controlUser': '闵亮', 'state': 1},
          {  'id' : 4, 'type': "办公园区", 'alarmUserCode': '00000004', 'alarmUserName': '武大园', 'address':
            '洪山区武大园路', 'controlTel': '027-83669268',  'fullname': '王小二', 'tel': '13427193456' , 'controlUser': '张君雅', 'state': 1},
          {  'id' : 5, 'type': "办公园区", 'alarmUserCode': '00000002', 'alarmUserName': '金融港', 'address':
            '洪山区光谷大道', 'alarmCate': '设备报警' , 'controlTel': '027-59223260',  'fullname': '刘亮', 'tel': '18621483212', 'controlUser': '江小白', 'state': 1},
          {  'id' : 6, 'type': "办公园区", 'alarmUserCode': '00000001', 'alarmUserName': '创星汇', 'address':
            '洪山区茅店山东路','controlTel': '027-84659119',  'fullname': '李毅', 'tel': '13867543678', 'controlUser': '张星', 'state': 1},
          {  'id' : 7, 'type': "办公园区", 'alarmUserCode': '00000001', 'alarmUserName': '创星汇', 'address':
            '洪山区茅店山东路', 'alarmCate': '设备报警' , 'controlTel': '027-84659119',  'fullname': '李毅', 'tel': '13867543678', 'controlUser': '张星', 'state': 1},
          {  'id' : 8, 'type': "办公园区", 'alarmUserCode': '00000003', 'alarmUserName': '软件园', 'address':
            '洪山区关山大道', 'alarmCate': '设备报警' , 'controlTel': '027-84671259',  'fullname': '张家华', 'tel': '15521484296', 'controlUser': '闵亮', 'state': 1},
          {  'id' : 9, 'type': "办公园区", 'alarmUserCode': '00000004', 'alarmUserName': '武大园', 'address':
            '洪山区武大园路','controlTel': '027-83669268',  'fullname': '王小二', 'tel': '13421483456'  , 'controlUser': '张君雅', 'state': 1},
          {  'id' : 10, 'type': "办公园区", 'alarmUserCode': '00000002', 'alarmUserName': '金融港', 'address':
            '洪山区光谷大道', 'alarmCate': '设备报警' , 'controlTel': '027-59223260',  'fullname': '刘亮', 'tel': '18621483212', 'controlUser': '江小白', 'state': 1}
        ]
        const vm = this;
        tableDataSimple[2].state = 2//未联网
        tableDataSimple[5].state = 2
        this.tableDataSimple = tableDataSimple;
      },
      addAlarm() {
        const  alarm = this.tableDataSimple[this.rnd(0, 9)];
        alarm.id = this.tableDataSimple.length + 1;
        this.tableDataSimple.push(alarm);
      },
      handleUser() {
        this.$modal.open({
          parent: this,
          component: UserViewMain,
          hasModalCard: true,
          width : 960
        })
      }
    },
    created() {
      const vm = this;
      vm.userLoading = true;
      setTimeout(function() {
        vm.addRndUser()
        vm.userLoading = false;
      }, 1000)

    }
  }
</script>
