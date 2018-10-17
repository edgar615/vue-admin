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

              <b-table-column field="addOn" label="下单时间" centered>
                {{ DateUtils.formatToDateTimeHMS(props.row.addOn*1000)}}
              </b-table-column>

              <b-table-column field="createUserName" label="下单人员"  centered >
                {{ props.row.createUserName }}
              </b-table-column>

              <b-table-column field="amount" label="金额"  centered >
                {{ props.row.amount }}
              </b-table-column>
              <b-table-column field="type" label="订单状态"  centered >
                <b-label v-if=" props.row.state==1">等待支付</b-label>
                <b-label v-if=" props.row.state==2">待发货</b-label>
                <b-label v-if=" props.row.state==3">待收货</b-label>
                <b-label v-if=" props.row.state==4">已完成</b-label>
                <b-label v-if=" props.row.state==5">已取消</b-label>

              </b-table-column>
              <b-table-column label="操作">
                <router-link :to="{path:  '/franchiser/purchaseorder/' +props.row.purchaseOrderId +'/view'}"
                             exact >
                  订单详情
                </router-link>
                <a   @click="searchLogistics(props.row)">
                  查询物流
                </a>
                <router-link :to="{path:  '/shop/sku/' +props.row.id}"
                             exact >
                  订单入库
                </router-link>

                <a  v-if="props.row.state==1 || props.row.state==2" @click="onCancel(props.row.purchaseOrderId)"
                         title="" >
                取消订单
                </a>
                <a  v-if="props.row.state!=2 && props.row.state!=1"  style="opacity: 0.3;">
                  取消订单
                </a>
                <router-link :to="{path:  '/shop/sku/' +props.row.id}"
                             exact >
                  去支付
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
  import {purChaseOrderPage,cancelOrder} from '@/api/franchiser/purchaseorder'
  import EmptyTable from '@/components/EmptyTable.vue'
  import request from '@/utils/request'
  import DateUtils from '@/utils/DateFormat'
  import Logistics from './logistics.vue'
export default {
    data () {
      return {
        filters: {
          buyerName:"",
          orderNo:"",

        },
        /* pid:'1',
       selectList:[
          {id:'11',name:"张三11",pid:'1'},
          {id:'12',name:"张三12",pid:'1'},
          {id:'13',name:"张三13",pid:'1'},
          {id:'111',name:"张三113",pid:'11'},
          {id:'112',name:"张三112",pid:'11'},
          {id:'113',name:"张三113",pid:'11'},
          {id:'121',name:"张三121",pid:'12'},
          {id:'122',name:"张三122",pid:'12'},
          {id:'123',name:"张三123",pid:'12'},
          {id:'131',name:"张三131",pid:'13'},
          {id:'132',name:"张三132",pid:'13'},
          {id:'133',name:"张三133",pid:'13'},
          {id:'1111',name:"张三1111",pid:'111'},
          {id:'1112',name:"张三1112",pid:'111'},
          {id:'1113',name:"张三1113",pid:'111'},
          {id:'1121',name:"张三1121",pid:'112'},
          {id:'1122',name:"张三1122",pid:'112'},
          {id:'1123',name:"张三1123",pid:'112'},
          {id:'1131',name:"张三1131",pid:'113'},
          {id:'1132',name:"张三1132",pid:'113'},
          {id:'1133',name:"张三1133",pid:'113'},
          {id:'1211',name:"张三1211",pid:'121'},
          {id:'1212',name:"张三1212",pid:'121'},
          {id:'1213',name:"张三1213",pid:'121'},
          {id:'1221',name:"张三1221",pid:'122'},
          {id:'1222',name:"张三1222",pid:'122'},
          {id:'1223',name:"张三1223",pid:'122'},
          {id:'1231',name:"张三1231",pid:'123'},
          {id:'1232',name:"张三1232",pid:'123'},
          {id:'1233',name:"张三1233",pid:'123'},
          {id:'1311',name:"张三1311",pid:'131'},
          {id:'1312',name:"张三1312",pid:'131'},
          {id:'1313',name:"张三1313",pid:'131'},
          {id:'1321',name:"张三1321",pid:'132'},
          {id:'1322',name:"张三1322",pid:'132'},
          {id:'1323',name:"张三1323",pid:'132'},
          {id:'1331',name:"张三1331",pid:'133'},
          {id:'1332',name:"张三1332",pid:'133'},
          {id:'1333',name:"张三1333",pid:'133'}
        ],
         selectTitle:"选择商品" ,
         firstTitle:"品类" ,
         secordTitle:"品牌",
         thirdTitle:"商品",*/
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

      loadData(params){
        request.get("http://mockjs.com/api/posts").then(res => {
          let _this=this;
          _this.pagination = res.data.pagination;
          _this.loading = false
        });

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
    //this.loadAsyncData()
    let _this=this;
    this.loadAsyncData()

}
  }
</script>
