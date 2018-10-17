<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->

    <div class="wrap-box">
      <!--头部盒子-->
      <div class="message-box">
        <!--上部分盒子-->
        <div class="top-portion">
          <div class="Input-box">
            <b class="Input-title">门店</b>
            <b-select placeholder="" v-model="filters.buyerName"  class="input-custom" id="long-select">
              <option value="">请选择</option>
              <option   class="input-custom"
                        v-for="option in dictList(this, 'systemType')"
                        :value="option.dictValue"
                        :key="option.dictValue">
                {{ option.dictText }}
              </option>
            </b-select>
          </div>
          <div class="Input-box">
            <b class="Input-title first-title">订单编号</b>
            <b-input v-model="filters.orderNo" class="input-custom"></b-input>
          </div>
          <div class="Input-box">
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
          </div>
          <!-- <dynamic-select :selectList="selectList" :pid="pid"  :selectTitle="selectTitle"  :firstTitle="firstTitle"  :secordTitle="secordTitle" :thirdTitle="thirdTitle" ></dynamic-select>-->
        </div>
        <div class="bottom-portion">
          <div class="Input-box">

            <b class="Input-title first-title">退货状态</b>
            <b-select placeholder="" v-model="filters.status"  class="input-custom" id="long-select">
              <option value="1">申请退货</option>
              <option value="2">拒绝退货</option>
              <option value="3">同意退货</option>
              <option value="4">申述中</option>
              <option value="5">已退</option>
              <option value="6">已取消</option>
              <!--<option   class="input-custom"
                        v-for="option in dictList(this, 'systemType')"
                        :value="option.dictValue"
                        :key="option.dictValue">
                {{ option.dictText }}
              </option>-->
            </b-select>



          </div>
          <!-- <dynamic-select :selectList="selectList" :pid="pid"  :selectTitle="selectTitle"  :firstTitle="firstTitle"  :secordTitle="secordTitle" :thirdTitle="thirdTitle" ></dynamic-select>-->
        </div>
        <div class="bottom-btn">
          <button class="search-btn" @click="loadAsyncData">
            搜索
          </button>
          <button class="empty-btn" @click="clearData">
            清空
          </button>
        </div>
      </div>
      <div class="card mt-3 Table-custom">
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
          >

            <template slot-scope="props">

              <!-- <b-table-column field="sorted" label="排序" numeric sortable centered>
                 {{ props.row.sorted }}
               </b-table-column>-->

              <b-table-column field="orderNo" label="退货单编号" centered>
                {{ props.row.orderNo }}
              </b-table-column>
              <b-table-column field="purchaseorderNo" label="采购订单编号" centered>
                {{ props.row.purchaseorderNo }}
              </b-table-column>

              <b-table-column field="addOn" label="下单时间" centered>
                {{ DateUtils.formatToDateTimeHMS(props.row.addOn*1000)}}
              </b-table-column>


              <b-table-column field="createUserName" label="下单人员"  centered >
                {{ props.row.createUserName }}
              </b-table-column>
              <b-table-column field="sellerName" label="供应商"  centered >
                {{ props.row.sellerName }}
              </b-table-column>


              <b-table-column field="type" label="订单状态"  centered >
                <b-label v-if=" props.row.state==1">申请退货</b-label>
                <b-label v-if=" props.row.state==2">同意退货</b-label>
                <b-label v-if=" props.row.state==3">拒绝退货</b-label>
                <b-label v-if=" props.row.state==4">申诉</b-label>
                <b-label v-if=" props.row.state==5">已退</b-label>
                <b-label v-if=" props.row.state==6">已取消</b-label>
              </b-table-column>
              <b-table-column label="操作">
                <router-link :to="{path:  '/franchiser/returnorder/' +props.row.id +'/view'}">
                  订单详情
                </router-link>
              </b-table-column>
            </template>
            <template slot="empty">
              <EmptyTable></EmptyTable>
            </template>
          </b-table>
        </div>
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
  import {returnOrderPage } from '@/api/supply/order/returnorder/returnorder'
  import EmptyTable from '@/components/EmptyTable.vue'
  import request from '@/utils/request'

  export default {
    data () {
      return {
        filters: {
        },
        pagination: {},
        loading: false,
        deleting: false,
        sortField: 'sorted',
        sortOrder: 'asc',
        defaultSortOrder: 'asc',
        checkedRows: [],
        minDate:"",
        maxDate:""
      }
    },
    components: {
      EmptyTable
    },
    methods: {
      /*
       * Load async data
       */
      loadAsyncData (params) {
        this.pageModel(this, returnOrderPage, params)
      },
      /*
       * Handle page-change event
       */
      onPageChange (page) {
        if (this.pagination.page != page) {
          // this.loadAsyncData({page: page})
          this.loadData({page: page})
        }
      },
      /*
       * Handle sort event
       */
      onSort (field, order) {
        this.sortField = field
        this.sortOrder = order
        this.loadAsyncData()
      },
      /*
       * 批量删除
       */
      onDeleteCheckedRows () {
        const vm = this
        var checkedIds = vm.checkedRows.map(function (item) {
          return item.subsystemId
        })
        this.batchDeleteModel(vm, batchDeletePurChaseOrder, checkedIds, () => this.loadAsyncData({page: this.pagination.page}))
      },
      /*
       * Type style in relation to the value
       */
      internalClass (value) {
        if (value == undefined) {
          return 'is-black'
        }
        if (value) {
          return 'is-success'
        }
        return 'is-dark'
      },
      onDelete (id) {
        const vm = this
        this.deleteModel(vm, deletePurChaseOrder, id, () => this.loadAsyncData({page: this.pagination.page}))
      },
      /**
       *查询物流
       * **/
      searchLogistics(row){
        let _this=this;
        _this.$layer.iframe({
          content: {
            content: Logistics, //传递的组件对象
            parent: this,//当前的vue对象
            data:{
              trackingNumber : row.trackingNumber,
            }
            ,//props
          },
          btn:'确定',
          type: 2,
          area:['350px','250px'],
          title:"物流查询",
        });
        console.log(_this.trackingNumber)

      },
      /***
       *清空
       * **/
      clearData(){
        let _this=this;
        _this.filters={};
        _this.startTime="";
        _this.endTime=""

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
      this.loadAsyncData()
    }
  }
</script>
