<template>
  <b-table
    narrowed
    bordered
    striped
    hoverable
    mobile-cards

    paginated
    per-page="5"
    :data="tableDataSimple"
  class="mt-1">
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
    </template>

  </b-table>
</template>

<script>
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
          '2016-12-15 06:00:53', 'alarmCate': '设备报警' , 'alarmType': '火警',  'fullname': '张三', 'tel': '12345678'}
      ]
      return {
        loading: false,
        tableDataSimple
      }
    }
  }
</script>

