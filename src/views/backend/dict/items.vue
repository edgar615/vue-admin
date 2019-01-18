<template>
  <section>
    <div class="card">
      <header class="card-header">
        <div class="card-header-title">
          <button class="button is-primary" @click="addModal()">
            <b-icon icon="plus-circle-outline"></b-icon>
            <span>新增</span>
          </button>
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
          pagination-size="is-small"
        >

          <template slot-scope="props">

            <b-table-column field="dictText" label="文本">
              {{ props.row.dictText }}
            </b-table-column>

            <b-table-column field="dictValue" label="值">
              {{ props.row.dictValue }}
            </b-table-column>
            <b-table-column field="sorted" label="排序">
              {{ props.row.sorted }}
            </b-table-column>

            <b-table-column label="操作">
              <a @click="onDelete(props.row.dictItemId)">
                删除
              </a>
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
  import AddForm from '@/views/backend/dict/item-add.vue'

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
      EmptyTable, AddForm
    },
    methods: {
      /*
       * Load async data
       */
      loadAsyncData (params) {
        this.$pageModelWithHistory(this, itemPage, params)
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
        this.$deleteModel(vm, deleteItem, id,
          () => this.loadAsyncData({page: this.pagination.page}))
      },
      addModal () {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '新增子项',
          width: '20%',
          component: AddForm,
          onClose: () => { vm.loadAsyncData() }
        })
      }
    },
    filters: {
    },
    created () {
      this.$fillParamFromHistory()
      this.loadAsyncData()
    }
  }
</script>
