<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->
    <div class="card">
      <div class="card-content">
        <b-field grouped group-multiline>
          <b-label class="label">盘点人：</b-label>
          <b-input v-model="filters.commodityCategoryKey" placeholder="盘点人"></b-input>
          <b-label class="label">商品：</b-label>
          <b-input v-model="filters.commodityBrandKey" placeholder="商品"></b-input>
          <b-label class="label">完成状态：</b-label>
          <b-select placeholder="完成状态" v-model="filters.state">
            <option value="0">请选择</option>
            <option value="1">已完成</option>
            <option value="2">盘点中</option>
          </b-select>
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
            <router-link to="/shop/inventory/add"
                         exact class="button is-primary">
              <b-icon icon="plus-circle-outline"></b-icon>
              <span>新增盘点单</span>
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
                           title="查看">
                查看
              </router-link>
              <router-link :to="{path:  '/backend/system/' +props.row.subsystemId + '/edit' }"
                           title="生成盘点">
                生成盘点
              </router-link>
              <router-link class="button is-danger is-small" @click="onDelete(props.row.subsystemId)"
                      title="编辑">
              </router-link>
              编辑
              <router-link :to="{path:  '/backend/system/' +props.row.subsystemId + '/permissions' }"
                           title="删除">
              </router-link>
              删除
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
  import {inventoryPage} from '@/api/shop/inventory'
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
        console.log(params);
        this.pageModel(this, inventoryPage, params)
      },
      loadData(params){
        request.get("http://mockjs.com/api/posts").then(res => {
          let _this=this;
          _this.pagination = res.data.pagination;
          _this.loading = false
        });

      }
    },
    created () {
      this.loadAsyncData()
     // this.loadData()
    }
  }
</script>
