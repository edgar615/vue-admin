<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->
    <div class="card">
      <div class="card-content">
        <b-field grouped group-multiline>
          <b-label class="label">门店：</b-label>
          <b-select placeholder="门店" v-model="filters.buyerName">
            <option value="">请选择</option>
            <option
              v-for="option in dictList(this, 'systemType')"
              :value="option.dictValue"
              :key="option.dictValue">
              {{ option.dictText }}
            </option>
          </b-select>
          <b-label class="label">订单编号：</b-label>
          <b-input v-model="filters.orderNo" placeholder="订单编号"></b-input>
          <b-label class="label">时间：</b-label>
          <b-datepicker
            placeholder=""
            :min-date="minDate"
            :max-date="maxDate">
          </b-datepicker> ~
          <b-datepicker
            placeholder=""
            :min-date="minDate"
            :max-date="maxDate">
          </b-datepicker>
          <b-label class="label">退货状态：</b-label>
          <b-input v-model="filters.status" placeholder="退货状态"></b-input>
          <p class="control ml-1">
            <button class="button is-primary" @click="loadAsyncData">
              <b-icon icon="magnify"></b-icon>
              <span>查询</span>
            </button>
          </p>
        </b-field>
      </div>
    </div>

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
        >

          <template slot-scope="props">

           <!-- <b-table-column field="sorted" label="排序" numeric sortable centered>
              {{ props.row.sorted }}
            </b-table-column>-->

            <b-table-column field="retunorderNo" label="退货单编号" centered>
              {{ props.row.retunorderNo }}
            </b-table-column>
            <b-table-column field="purchaseorderNo" label="采购订单编号" centered>
              {{ props.row.purchaseorderNo }}
            </b-table-column>

            <b-table-column field="createdOn" label="下单时间" centered>
              {{ props.row.createdOn }}
            </b-table-column>


            <b-table-column field="name" label="下单人员"  centered >
              {{ props.row.name }}
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
              <router-link :to="{path:  '/franchiser/returnorder/' +props.row.id +'/view'}"
                           exact class="button is-info is-small" title="订单详情">
                <b-icon icon="information-outline"></b-icon>
              </router-link>
                <button :disabled="(props.row.state==2||props.row.state==5||props.row.state==6)?  '': disabled " class="button is-primary is-small"  @click="searchLogistics(props.row)" title="取消订单">
                  <b-icon icon="magnify"></b-icon>
                </button>
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
  import returnorder from '@/api/franchiser/returnorder'
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
        checkedRows: []
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

      loadData(params){
        request.get("http://mockjs.com/api/returnOrderList").then(res => {
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
    this.loadData()
}
  }
</script>
