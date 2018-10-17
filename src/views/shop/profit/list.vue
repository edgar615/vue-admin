<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->
    <div class="card">
      <div class="card-content">
        <b-field grouped group-multiline>
          <b-label class="label">创建人：</b-label>
          <b-input v-model="filters.commodityCategoryKey" placeholder="创建人"></b-input>
          <b-label class="label">商品：</b-label>
          <b-input v-model="filters.commodityBrandKey" placeholder="商品"></b-input>
          <b-label class="label">创建时间：</b-label>
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
          <b-label class="label">完成状态：</b-label>
          <b-select placeholder="完成状态" v-model="filters.state">
            <option value="0">请选择</option>
            <option value="1">已完成</option>
            <option value="2">盘点中</option>
          </b-select>

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
        <div class="field is-grouped">
          <div class="buttons">
            <router-link to="/shop/profit/add"
                         exact class="button is-primary">
              <b-icon icon="plus-circle-outline"></b-icon>
              <span>新增盈亏单</span>
            </router-link>
          </div>
        </div>

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

          :checked-rows.sync="checkedRows"
        >

          <template slot-scope="props">

             <b-table-column field="sorted" label="序号" numeric sortable centered>
             {{(pagination.page-1)*pagination.pageSize+props.index}}
           </b-table-column>

            <b-table-column field="stockInventoryId" label="盘点单号" centered>
              {{ props.row.stockInventoryId }}
            </b-table-column>

            <b-table-column field="inventoryTime" label="盘点时间" centered>
              {{ props.row.inventoryTime }}
            </b-table-column>

            <b-table-column field="inventoryUserName" label="盘点人员"  centered >
              {{ props.row.inventoryUserName }}
            </b-table-column>

            <b-table-column field="createUserName" label="创建人"  centered >
              {{ props.row.createUserName }}
            </b-table-column>
            <b-table-column field="createTime" label="创建时间"  centered >
              {{ props.row.createTime }}
            </b-table-column>
            <b-table-column field="state" label="完成状态"  centered >
              {{ props.row.state }}
            </b-table-column>

            <b-table-column label="操作">
              <router-link :to="{path:  '/backend/system/' +props.row.subsystemId + '/view' }"
                           exact class="button is-info is-small" title="查看">
                <b-icon icon="information-outline"></b-icon>
              </router-link>
              <router-link :to="{path:  '/backend/system/' +props.row.subsystemId + '/edit' }"
                           exact class="button is-small" title="生成盘点">
                <b-icon icon="circle-edit-outline"></b-icon>
              </router-link>
              <button class="button is-danger is-small" @click="onDelete(props.row.subsystemId)"
                      title="编辑" :class="{'is-loading' : deleting}">
                <b-icon icon="delete-outline"></b-icon>
              </button>
              <router-link :to="{path:  '/backend/system/' +props.row.subsystemId + '/permissions' }"
                           exact class="button is-info is-small" title="删除">
                <b-icon icon="menu"></b-icon>
              </router-link>
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
  import {inventoryPage} from '@/api/franchiser/purchaseorder'
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
        /*this.pageModel(this, inventoryPage, params)*/
      },
      /*
       * Handle page-change event
       */
      onPageChange (page) {
        if (this.pagination.page != page) {
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

      loadData(params){
        request.get("http://mockjs.com/api/posts").then(res => {
          let _this=this;
          _this.pagination = res.data.pagination;
          _this.loading = false
        });

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
     // this.loadData()
    }
  }
</script>
