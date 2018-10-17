<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->
    <div class="card">
      <div class="card-content">
        <b-field grouped group-multiline>

          <b-label class="label">品类：</b-label>
          <b-input v-model="filters.orderNo" placeholder="品类"></b-input>

          <b-label class="label">品牌：</b-label>
          <b-input v-model="filters.orderNo" placeholder="品牌"></b-input>

          <b-label class="label">商品名称：</b-label>
          <b-input v-model="filters.orderNo" placeholder="商品名称"></b-input>

          <p class="control ml-1">
            <button class="button is-primary" @click="loadAsyncData">
              <b-icon icon="magnify"></b-icon>
              <span>搜索</span>
            </button>
          </p>
          <p class="control ml-1">
            <button class="button is-primary" @click="onClick(props.row)">
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
            <b-table-column field="orderNo" label="商品名称" centered>
              {{ props.row.orderNo }}
            </b-table-column>

            <b-table-column field="addOn" label="品类" centered>
              {{ DateUtils.formatToDateTimeHMS(props.row.addOn*1000)}}
            </b-table-column>

            <b-table-column field="createUserName" label="品牌"  centered >
              {{ props.row.createUserName }}
            </b-table-column>

            <b-table-column field="createUserName" label="规格"  centered >
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
  import {purChaseOrderPage, deletePurChaseOrder, batchDeletePurChaseOrder} from '@/api/franchiser/purchaseorder'
  import EmptyTable from '@/components/EmptyTable.vue'
  import request from '@/utils/request'
  import DateUtils from '@/utils/DateFormat'
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
        hello:"",
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
      /**
       *  子页面值传回父页面
       */
      onClick(row){
        var _this=this;
        _this.$parent.row=_this.row;
        _this.fn();
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
