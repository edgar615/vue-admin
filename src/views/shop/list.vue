<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->
    <div id="header">
     商品信息管理
    </div>

    <div class="wrap-box">
      <!--头部盒子-->
      <div class="message-box">
        <div class="Input-box">
          <b>品类：</b>
          <b-input v-model="name" class="input-custom"></b-input>
        </div>

        <div class="Input-box">
          <b>品牌：</b>
          <b-input v-model="name" class="input-custom"></b-input>
        </div>

        <div class="Input-box">
          <b>名称：</b>
          <b-input v-model="name" class="input-custom"></b-input>
        </div>

        <div class="Input-box">
          <b class="Input-title">加盟状态：</b>
          <b-select placeholder="请选择">
            <option
              :value="1"
              :key="1">
              已上架
            </option>
            <option
              :value="1"
              :key="1">
              未上架
            </option>
          </b-select>
        </div>

        <button class="button is-primary" id="search-btn">
          <span class="icon"><i class="mdi mdi-magnify mdi-24px"></i></span> <span>搜索</span>
        </button>
      </div>
      <!--头部盒子结束符-->

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

            <b-table-column field="sysIdentifier" label="供应商" centered>
              {{ props.row.sysIdentifier }}
            </b-table-column>

            <b-table-column field="type" label="品牌"  centered >
              {{ props.row.icon }}
            </b-table-column>

            <b-table-column field="type" label="品类"  centered >
              {{ dictText(this, "systemType",props.row.type) }}
            </b-table-column>

            <b-table-column field="type" label="商品编码"  centered >
              {{ props.row.icon }}
            </b-table-column>

            <b-table-column field="price" label="商品售价"  centered >
              <b-input placeholder="商品售价" v-model="props.row.price"></b-input>
            </b-table-column>

            <b-table-column field="type" label="数量"  centered >
              {{ props.row.icon }}
            </b-table-column>

            <b-table-column field="type" label="状态" centered>
              <b-switch :value="true"
                        type="is-info" @click.native="alert( props.row.price)">
              </b-switch>
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
      onDelete (id) {
        const vm = this;
        this.deleteModel(vm, deleteSystem, id, () => this.loadAsyncData({page:this.pagination.page}));
      },
      alert (price) {

        alert(price);
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
