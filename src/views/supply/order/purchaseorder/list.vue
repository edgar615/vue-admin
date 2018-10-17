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
            <b class="Input-title first-title">采购时间</b>
            <b-datepicker
              placeholder="开始时间"
              :maxDate="maxDate"
              @input="setMinTime"
              icon="calendar-today right-icon"
              class="time-custom" v-model="startTime">
            </b-datepicker>
            <b-datepicker
              placeholder="结束时间"
              icon="calendar-today"
              :minDate="minDate"
              @input="setMaxTime"
              class="time-custom" v-model="endTime">
            </b-datepicker>
          </div>
          <div class="Input-box">
            <b class="Input-title">订单状态</b>
            <b-select placeholder="" v-model="filters.state"  class="input-custom" id="long-select">
              <option value="">请选择</option>
              <option value="1">等待支付</option>
              <option value="2">待发货</option>
              <option value="3">待收货</option>
              <option value="4">已完成</option>
              <option value="5">已取消</option>
            </b-select>
          </div>

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
      <div class="card mt-3  Table-custom">
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
              <!-- <b-table-column width="200px" field="no" label="序号" centered>

                 {{props.index}}
               </b-table-column>-->
              <b-table-column field="orderNo" label="订单编号" centered>
                {{ props.row.orderNo }}
              </b-table-column>

              <b-table-column field="addOn" label="下单时间" centered>
                {{ DateUtils.formatToDateTimeHMS(props.row.addOn*1000)}}
              </b-table-column>

              <b-table-column field="createUserName" label="下单人员"  centered >
                {{ props.row.createUserName }}
              </b-table-column>
              <b-table-column field="buyerName" label="采购门店"  centered >
                {{ props.row.buyerName }}
              </b-table-column>
              <b-table-column field="amount" label="金额"  centered >
                {{ props.row.amount }}
              </b-table-column>
              <b-table-column field="freight" label="运费"  centered >
                {{ props.row.freight }}
              </b-table-column>
              <b-table-column field="type" label="订单状态"  centered >
                <b-label v-if=" props.row.state==1">等待支付</b-label>
                <b-label v-if=" props.row.state==2">待发货</b-label>
                <b-label v-if=" props.row.state==3">待收货</b-label>
                <b-label v-if=" props.row.state==4">已完成</b-label>
                <b-label v-if=" props.row.state==5">已取消</b-label>

              </b-table-column>
              <b-table-column label="操作">

                <router-link v-if="props.row.state!=5" :to="{path:  '/supply/order/purchaseorder/' +props.row.purchaseOrderId +'/view'}">
                     订单详情
                </router-link>
                <a  v-if="props.row.state==5" style="opacity: 0.3;">订单详情</a>

                <a  v-if="props.row.state==2"  @click="searchLogistics(props.row)">
                  发货
                </a>
                <a  v-if="props.row.state!=2"  style="opacity: 0.3;">
                  发货
                </a>
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
  import {purChaseOrderPage} from '@/api/supply/order/purchaseorder/purchaseorder'
  import EmptyTable from '@/components/EmptyTable.vue'
  import request from '@/utils/request'
 /* import Logistics from './logistics.vue'*/
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
        this.pageModel(this, purChaseOrderPage, params)
      },
    /*
     * Handle page-change event
     */
      onPageChange (page) {
        if (this.pagination.page != page) {
          console.log(page);
         // this.loadAsyncData({page: page})this.currentPage=page
          this.currentPage=page;
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
        let id=_this.$layer.iframe({
          content: {
            content: Logistics, //传递的组件对象
            parent: this,//当前的vue对象
            data:{
              trackingNumber : row.trackingNumber,
              fn:()=>{
                _this.$layer.close(id);
              }
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
    let _this=this;
   // this.loadData()

}
  }
</script>
