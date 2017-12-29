<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          查询
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </span>
        </a>
      </header>
      <div class="card-content">
        <b-field grouped group-multiline>
          <b-input v-model="filters.sysIdentifier" placeholder="标识符"></b-input>
          <b-select placeholder="类型" v-model="filters.type">
            <option value="">请选择</option>
            <option
              v-for="option in dictList('systemType')"
              :value="option.value"
              :key="option.value">
              {{ option.text }}
            </option>
          </b-select>
          <b-field>
            <b-radio-button v-model="filters.internal"
                            native-value="true"
                            type="is-success" class="is-dark-blue-lighter">
              <b-icon icon="user-secret"></b-icon>
              <span>内部访问</span>
            </b-radio-button>

            <b-radio-button v-model="filters.internal"
                            native-value="false"
                            type="is-info">
              <b-icon icon="folder-open"></b-icon>
              <span>公开</span>
            </b-radio-button>

            <b-radio-button v-model="filters.internal"
                            native-value="">
              全部
            </b-radio-button>
          </b-field>
          <p class="control ml-1">
            <button class="button is-primary" @click="onQuery">
              <b-icon icon="search"></b-icon>
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
        <span class="button is-danger" @click="onDeleteCheckedRows" :disabled="!checkedRows.length"
              :class="{'is-loading' : deleting}">
          <b-icon icon="trash"></b-icon>
          <span>删除</span>
        </span>
            <router-link to="/backend/system/add"
                         exact class="button is-primary">
              <b-icon icon="plus"></b-icon>
              <span>新增</span>
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

            <b-table-column field="sorted" label="排序" numeric sortable centered>
              {{ props.row.sorted }}
            </b-table-column>

            <b-table-column field="name" label="名称" centered>
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="sysIdentifier" label="标识符" centered>
              {{ props.row.sysIdentifier }}
            </b-table-column>

            <b-table-column field="type" label="类型" numeric centered >
              {{ dictText("systemType",props.row.type) }}
            </b-table-column>

            <b-table-column field="internal" label="内部?" centered>
              <span class="tag" :class="internalClass(props.row.internal)">{{ dictText("internal",props.row.internal) }}</span>
            </b-table-column>

            <b-table-column label="操作">
              <router-link :to="{path:  '/backend/system/' +props.row.subsystemId + '/view' }"
                           exact class="button is-info is-small" title="查看">
                <b-icon icon="info-circle"></b-icon>
              </router-link>
              <router-link :to="{path:  '/backend/system/' +props.row.subsystemId + '/edit' }"
                           exact class="button is-small" title="修改">
                <b-icon icon="pencil"></b-icon>
              </router-link>
              <button class="button is-danger is-small" @click="onDelete(props.row.subsystemId)"
                      title="删除" :class="{'is-loading' : deleting}">
                <b-icon icon="trash"></b-icon>
              </button>
              <router-link :to="{path:  '/backend/system/' +props.row.subsystemId + '/menus' }"
                           exact class="button is-info is-small" title="菜单管理">
                <b-icon icon="bars"></b-icon>
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

<script>
  import { systemPage, deleteSystem,batchDeleteSystem } from '@/api/backend/system';
  import { deleteConfirm } from '@/utils/dialog';
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
        if (params == undefined) {
          params = {};
        }
        //如果表格没有拍下，不需要这些操作
        var sort = this.sortField;
        if (this.sortOrder == 'desc') {
          sort = "-" + sort;
        }
        params.sort = sort;
        params = Object.assign(this.filters, params);
        this.loading = true
        systemPage(params).then(response => {
          this.pagination = response.data;
        this.loading = false;
      });
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
      deleteConfirm(vm, () => {
        var checkedIds = vm.checkedRows.map(function(item) {
          return item.subsystemId;
        })
        vm.deleting = true;
        batchDeleteSystem(checkedIds).then(response => {
          vm.deleting = false;
          this.loadAsyncData({page:this.pagination.page});
        }).catch(err => {
          vm.deleting = false;
        });
      })
    },
    /*
     * 查询
     */
    onQuery() {
//      this.filters.page = 1;
      //Object.assign(this.filters, {page:1})filters是通过get/set方法处理，这个方法不能正常使用
      this.loadAsyncData();
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
    dictText(name, value) {
      return this.$store.getters.dictText(name, value);
    },
    dictList(name) {
      return this.$store.getters.dictList(name);
    },
      onDelete(id) {
        const vm = this;
        deleteConfirm(vm,() => {
          vm.deleting = true;
          deleteSystem(id).then(response => {
            vm.deleting = false;
            this.loadAsyncData({page:this.pagination.page});
          }).catch(err => {
            vm.deleting = false;
          });
        })
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

<style scoped>
  input{
    border:1px solid #a8a8a8;

  }

  input::-webkit-input-placeholder {
    color: #999;
  }
  input:focus::-webkit-input-placeholder {
    color: red;
  }

  /* Firefox < 19 */
  input:-moz-placeholder {
    color: #999;
  }
  input:focus:-moz-placeholder {
    color: red;
  }

  /* Firefox > 19 */
  input::-moz-placeholder {
    color: #999;
  }
  input:focus::-moz-placeholder {
    color: red;
  }

  /* Internet Explorer 10 */
  input:-ms-input-placeholder {
    color: #999;
  }
  input:focus:-ms-input-placeholder {
    color: red;
  }
</style>
