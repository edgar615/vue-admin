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
            <b class="Input-title">服务员</b>
            <b-select placeholder="" v-model="filters.salespersonUserId"  class="input-custom" id="long-select">
              <option value="">请选择</option>
              <option   class="input-custom"
                        v-for="option in salespersonList" :value="option.staffId" >
                {{ option.name}}
              </option>
            </b-select>
          </div>
          <div class="Input-box">
              <b class="Input-title">创建人</b>
              <b-select placeholder="" v-model="filters.createUserId"  class="input-custom" id="long-select">
                <option value="">请选择</option>
                <option   class="input-custom"
                          v-for="option in createList" :value="option.staffId">
                  {{ option.name}}
                </option>
              </b-select>
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
          <div class="Input-box">
            <b class="Input-title">订单状态</b>
            <b-select placeholder="" v-model="filters.state"  class="input-custom" id="long-select">
              <option value="">请选择</option>
              <option value="1">已完成</option>
              <option value="2">未完成</option>
            </b-select>
          </div>
          <!-- <dynamic-select :selectList="selectList" :pid="pid"  :selectTitle="selectTitle"  :firstTitle="firstTitle"  :secordTitle="secordTitle" :thirdTitle="thirdTitle" ></dynamic-select>-->
        </div>
        <div class="bottom-portion">

          <div class="Input-box">
             <b class="Input-title first-title">订单金额</b>
              <b-input class="input-custom half" v-model="filters.startMoney"></b-input>
              <b-input class="input-custom half" v-model="filters.endMoney"></b-input>
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

              <b-table-column field="orderNo" label="订单编号" centered>
                {{ props.row.orderNo }}
              </b-table-column>
              <b-table-column field="amount" label="单据总金额"  centered >
                {{ props.row.amount/100 }}
              </b-table-column>
              <b-table-column field="amount" label="实收金额"  centered >
                {{ props.row.amount/100}}
              </b-table-column>
              <b-table-column field="salespersonUserName" label="服务员"  centered >
                {{ props.row.salespersonUserName}}
              </b-table-column>
              <b-table-column field="createUserName" label="创建人"  centered >
                {{ props.row.createUserName}}
              </b-table-column>

              <b-table-column field="addOn" label="" centered>
                {{ DateUtils.formatToDateTimeHMS(props.row.addOn*1000)}}
              </b-table-column>
              <b-table-column field="type" label="订单状态"  centered >
                <b-label v-if=" props.row.state==1">已完成</b-label>
                <b-label v-if=" props.row.state==2">未完成</b-label>
              </b-table-column>
              <b-table-column label="操作">
                <router-link :to="{path:  '/franchiser/purchaseorder/' +props.row.purchaseOrderId +'/view'}"
                             exact >
                  查看
                </router-link>

                <router-link :to="{path:  '/shop/sku/' +props.row.id}"
                             exact >
                  补收
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
  .half{
    width: 45%!important;
    float: left;
    margin-right: 5%;
  }
  .half:last-child{
    width: 50%!important;
    margin: 0;
  }
</style>
<script>
  import {getStaffData,salerOrderPage} from '@/api/shop/saleorder'
  import EmptyTable from '@/components/EmptyTable.vue'
  import request from '@/utils/request'
  import DateUtils from '@/utils/DateFormat'

  export default {
    data () {
      return {
        filters: {
          buyerName:"",
          orderNo:"",
          shopId:"1",
        },
        salespersonList:[],
        createList:[],

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
      /**
       *
       * 加载页面数据
       * */
      loadAsyncData (params) {
         let  vm=this
          this.pageModel(this, salerOrderPage, params)
          getStaffData(params).then(response => {
            vm.salespersonList=response.data.records
            vm.createList=response.data.records
            console.log(response)
          }).catch(err => {
            vm.loading = false
          })


      },
      onPageChange (page) {
        if (this.pagination.page !== page) {
          this.loadAsyncData({page: page})
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
      },
      //取消订单
      onCancel(id){
        var vm=this;
        this.updateModel(vm, cancelOrder, id, () => this.loadAsyncData({page: this.pagination.page}))
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
      this.loadAsyncData()//加载列表信息
    }
  }
</script>
