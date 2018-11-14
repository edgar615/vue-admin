<template>
  <section>
    <div class="card">
      <div class="card-content">
        <b-field grouped group-multiline>
          <b-input v-model="filters.code" placeholder="字典编码"></b-input>
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
          字典子项列表
          <div class="ml-3 buttons">
            <router-link :to="{path: '/backend/dict/' + dictId + '/item-add'}"
                         exact class="button is-primary">
              <b-icon icon="plus-circle-outline"></b-icon>
              <span>新增</span>
            </router-link>
          </div>
        </div>
      </header>
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
          pagination-size="is-small"
        >

          <template slot-scope="props">

            <b-table-column field="dictText" label="文本" centered>
              {{ props.row.dictText }}
            </b-table-column>

            <b-table-column field="dictValue" label="值" centered>
              {{ props.row.dictValue }}
            </b-table-column>
            <b-table-column field="sorted" label="排序" centered>
              {{ props.row.sorted }}
            </b-table-column>

            <b-table-column label="操作">
              <button class="button is-danger is-small" @click="onDelete(props.row.dictItemId)"
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
  import {itemPage, deleteItem} from '@/api/backend/dict'
  import EmptyTable from '@/components/EmptyTable.vue'

  export default {
    data () {
      return {
        dictId: this.$route.params.id,
        filters: {
          dictId: this.$route.params.id
        },
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
        this.pageModelWithHistory(this, itemPage, params)
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
        this.deleteModel(vm, deleteItem, id,
          () => this.loadAsyncData({page: this.pagination.page}))
      }
    },
    filters: {
    },
    created () {
      this.fillParamFromHistory()
      this.loadAsyncData()
    }
  }
</script>
