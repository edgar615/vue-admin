<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->
    <div class="card">
      <div class="card-content">
        <b-field grouped group-multiline>
          <b-input v-model="filters.permission" placeholder="权限字符串"></b-input>
          <p class="control ml-1">
            <button class="button is-primary" @click="loadAsyncData({page: 1})">
              <b-icon icon="magnify"></b-icon>
              <span>查询</span>
            </button>
          </p>
        </b-field>
      </div>
    </div>

    <div class="card mt-3">
      <header class="card-header">
        <div class="card-header-title">
          接口权限
        </div>
        <div class="mr-3 buttons is-right">
          <router-link to="/backend/authority/add"
                       exact class="button is-primary">
            <b-icon icon="plus-circle-outline"></b-icon>
            <span>新增</span>
          </router-link>
        </div>
      </header>
      <div class="card-content">
        <!--buefy的表格组件，具体用法查阅文档-->
        <b-table
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

            <b-table-column field="name" label="名称">
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="permission" label="权限值">
              {{ props.row.permission }}
            </b-table-column>

            <b-table-column field="type" label="允许匿名">
              {{ boolText(props.row.allowAnonymous) }}
            </b-table-column>


            <b-table-column field="internal" label="内部访问?">
              {{ boolText(props.row.internal) }}
            </b-table-column>

            <b-table-column label="操作">
              <router-link :to="{path:  '/backend/authority/' +props.row.authorityScopeId + '/edit' }"
                           exact class="button is-small" title="修改">
                <b-icon icon="circle-edit-outline"></b-icon>
              </router-link>
              <button class="button is-danger is-small" @click="onDelete(props.row.authorityScopeId)"
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
  import {authorityPage, deleteAuthority} from '@/api/backend/authority'
  import EmptyTable from '@/components/EmptyTable.vue'

  export default {
    data () {
      return {
        filters: {},
        pagination: {},
        loading: false,
        deleting: false
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
        this.pageModelWithHistory(this, authorityPage, params)
      },
      /*
       * Handle page-change event
       */
      onPageChange (page) {
        if (this.pagination.page !== page) {
          this.loadAsyncData({page: page})
        }
      },
      onDelete (id) {
        const vm = this
        this.deleteModel(vm, deleteAuthority, id,
          () => this.loadAsyncData({page: this.pagination.page}))
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
      this.fillParamFromHistory()
      this.loadAsyncData()
    }
  }
</script>
