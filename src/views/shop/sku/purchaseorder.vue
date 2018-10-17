<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->
    <div class="card">
      <div class="card-content">
        <b-field grouped group-multiline>
          <b class="Input-title first-title">时间</b>
          <b-datepicker
            placeholder="开始时间"
            :maxDate="maxDate"
            @input="setMinTime"
            icon="calendar-today right-icon"
            class="time-custom" v-model="startTime">
          </b-datepicker>
          <b-datepicker
            placeholder="结束时间"
            :minDate="minDate"
            @input="setMaxTime"
            icon="calendar-today"
            class="time-custom" v-model="endTime">
          </b-datepicker>

          <b-label class="label">订单编号：</b-label>
          <b-input v-model="filters.orderNo" placeholder="订单编号"></b-input>

          <p class="control ml-1">
            <button class="button is-primary" @click="loadAsyncData">
              <b-icon icon="magnify"></b-icon>
              <span>搜索</span>
            </button>
          </p>
          <p class="control ml-1">
            <button class="button is-primary" @click="onClick(pagination.records)">
              <b-icon></b-icon>
              <span>确认选择</span>
            </button>
          </p>
        </b-field>
      </div>
    </div>
    {{hello}}
    <div class="card mt-3">
      <div class="card-content">
        <!--buefy的表格组件，具体用法查阅文档-->
        <b-table
          bordered
          striped
          hoverable
          narrowed
          mobile-cards

          :data="(pagination.records && pagination.records.length == 0) ? [] : pagination.records"
          :loading="loading"
          paginated
          backend-pagination
          :total="pagination.totalRecords"
          :per-page="pagination.pageSize"
          :current-page="pagination.page"
          @page-change="onPageChange"

          backend-sorting
          :default-sort-direction="defaultSortOrder"
          :default-sort="[sortField, sortOrder]"
          @sort="onSort"
          checkable
        >

          <template slot-scope="props">

            <!-- <b-table-column field="sorted" label="排序" numeric sortable centered>
               {{ props.row.sorted }}
             </b-table-column>-->
            <!--  <b-table-column width="200px" field="no" label="序号" centered>

                {{(pagination.page-1)*pagination.pageSize+props.index}}
              </b-table-column>-->
            <b-table-column field="orderNo" label="采购订单编号" centered>
              {{ props.row.orderNo }}
            </b-table-column>

            <b-table-column field="addOn" label="销售时间" centered>
              {{ DateUtils.formatToDateTimeHMS(props.row.addOn*1000)}}
            </b-table-column>

            <b-table-column field="createUserName" label="操作人员"  centered >
              {{ props.row.createUserName }}
            </b-table-column>

          </template>
          <template slot="empty">
            <EmptyTable></EmptyTable>
          </template>
        </b-table>
      </div>
    </div>


  </section>
</template>
<style>
  .label{
    height:2rem;
    line-height: 2rem;
    color: #333333;
  }
</style>
<script>
  import {purChaseOrderPage, deletePurChaseOrder, getpurChaseOrder} from '@/api/franchiser/purchaseorder'
  import EmptyTable from '@/components/EmptyTable.vue'
  import request from '@/utils/request'
  import DateUtils from '@/utils/DateFormat'
  export default {
    props:['fn'],
    data () {
      fn: this.fn;
      return {
        filters: {
          buyerName:"",
          orderNo:"",
        },
        pagination: {},
        loading: false,
        deleting: false,
        sortField: 'sorted',
        sortOrder: 'asc',
        defaultSortOrder: 'asc',
        checkedRows: [],
        minDate:"",
        maxDate:"",
        model:{}
      }
    },
    components: {
      EmptyTable
    },
    methods: {
      /**
       *
       * 加载页面数据
       * */
      loadAsyncData (params) {
        this.pageModel(this, purChaseOrderPage, params)
      },
      /***
       * 计算最小结束时间
       * */
      setMinTime(){
        var _this=this;
        if(_this.startTime){
          let min=new Date(_this.startTime)
          this.minDate=new Date(min.getFullYear(), min.getMonth(), min.getDate() + 1)
        }
      },
      /**
       * 计算最大开始时间
       * **/
      setMaxTime(){
        var _this=this;
        if(_this.endTime){
          let max=new Date(_this.endTime)
          this.maxDate=new Date(max.getFullYear(), max.getMonth(), max.getDate() -1)
        }
      },
      /**
       *  子页面值传回父页面
       */
      onClick(dataList){
        console.log(dataList);
        var _this=this;
        _this.fn();
        _this.$parent.dataList= dataList;
      }
    },
    filters: {
      /**
       * Filter to truncate string, accepts a length parameter
       */
      /*
       truncate(value, length) {
       return value.length > length
       ? value.substr(0, length) + '...'
       : value
       }
       */
    },
    created () {
      //this.loadAsyncData()
      let _this=this;
      this.loadAsyncData()

    }
  }
</script>
