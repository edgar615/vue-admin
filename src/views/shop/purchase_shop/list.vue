<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->
    <div class="card">
      <div class="card-content">
        <b-field grouped group-multiline>
          品类：<b-input v-model="filters.sysIdentifier" placeholder="品类"></b-input>
          品牌：<b-input v-model="filters.sysIdentifier" placeholder="品牌"></b-input>
          名称：<b-input v-model="filters.sysIdentifier" placeholder="名称"></b-input>
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
            <router-link to="/backend/system/add"
                         exact class="button is-primary">
              <b-icon icon="plus-circle-outline"></b-icon>
              <span>新增自采商品</span>
            </router-link>
            <router-link to="/backend/system/add"
                         exact class="button is-primary">
              <b-icon icon="plus-circle-outline"></b-icon>
              <span>商品入库</span>
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
          checkable
        >

          <template slot-scope="props">

            <b-table-column field="sorted" label="序号" numeric sortable centered>
              {{ props.row.sorted }}
            </b-table-column>

            <b-table-column field="name" label="商品名称" centered>
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="sysIdentifier" label="规格" centered>
              {{ props.row.sysIdentifier }}
            </b-table-column>

            <b-table-column field="type" label="品类"  centered >
              {{ dictText(this, "systemType",props.row.type) }}
            </b-table-column>

            <b-table-column field="type" label="品牌"  centered >
               {{ props.row.icon }}
            </b-table-column>

            <b-table-column field="type" label="零售价"  centered >
              {{ props.row.icon }}
            </b-table-column>

            <b-table-column field="type" label="录入人"  centered >
              {{ props.row.icon }}
            </b-table-column>

            <b-table-column field="type" label="录入时间"  centered >
              {{ props.row.icon }}
            </b-table-column>

            <b-table-column field="type" label="更新人" centered>
              {{ props.row.icon }}
            </b-table-column>

            <b-table-column label="操作">
              <router-link :to="{path:  '/shop/purchase_shop/' +props.row.subsystemId + '/view' }"
                           exact class="button is-info is-small" title="查看">
                <b-icon icon="information-outline"></b-icon>
              </router-link>
              <router-link :to="{path:  '/shop/purchase_shop/' +props.row.subsystemId + '/edit' }"
                           exact class="button is-small" title="修改">
                <b-icon icon="circle-edit-outline"></b-icon>
              </router-link>
              <button class="button is-danger is-small" @click="onDelete(props.row.subsystemId)"
                      title="删除" :class="{'is-loading' : deleting}">
                <b-icon icon="delete-outline"></b-icon>
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

<script>
  import { systemPage, deleteSystem, batchDeleteSystem } from '@/api/backend/system';
  import EmptyTable from '@/components/EmptyTable.vue';
  export default {
    data() {
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
      loadAsyncData(params) {
        this.pageModel(this, systemPage, params)
    },
    /*
     * Handle page-change event
     */
    onPageChange(page) {
      if (this.pagination.page != page) {
        this.loadAsyncData({page:page});
      }
    },
    /*
     * Handle sort event
     */
    onSort(field, order) {
      this.sortField = field;
      this.sortOrder = order;
      this.loadAsyncData()
    },
    /*
     * 批量删除
     */
    onDeleteCheckedRows() {
      const vm = this;
      var checkedIds = vm.checkedRows.map(function(item) {
        return item.subsystemId;
      })
      this.batchDeleteModel(vm, batchDeleteSystem, checkedIds, () => this.loadAsyncData({page:this.pagination.page}));
    },
    /*
     * Type style in relation to the value
     */
    internalClass(value) {
      if (value == undefined) {
        return "is-black";
      }
      if (value) {
        return "is-success";
      }
      return "is-dark";
    },
      onDelete(id) {
        const vm = this;
        this.deleteModel(vm, deleteSystem, id, () => this.loadAsyncData({page:this.pagination.page}));
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
  created() {
    this.loadAsyncData();
  }
  }
</script>
