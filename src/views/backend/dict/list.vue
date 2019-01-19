<template>
  <section>
    <div class="card">
      <header class="card-header">
        <div class="card-header-title">
          <button class="button is-primary" @click="addModal()">
            <b-icon icon="plus-circle-outline"></b-icon>
            <span>新增</span>
          </button>
          <div class="card-header-left">
            <b-field grouped group-multiline>
              <b-input v-model="filters.code" placeholder="字典编码"></b-input>
              <p class="control ml-1">
                <button class="button" @click="loadAsyncData({page: 1})">
                  <b-icon icon="magnify"></b-icon>
                  <span>查询</span>
                </button>
              </p>
            </b-field>
          </div>
        </div>
      </header>

      <div class="card-content">

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

            <b-table-column field="name" label="名称">
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="dictCode" label="字典编码">
              {{ props.row.dictCode }}
            </b-table-column>

            <b-table-column field="defaultValue" label="默认值">
              {{ props.row.defaultValue }}
            </b-table-column>

            <b-table-column label="操作">
              <a @click="editModal(props.row.dictId)">
                修改
              </a>
              <a @click="onDelete(props.row.dictId)">
                删除
              </a>
              <router-link :to="{path:  '/backend/dict/' +props.row.dictId + '/items' }"  exact>
                字典子项
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
  import {dictPage, deleteDict} from '@/api/backend/dict'
  import EmptyTable from '@/components/EmptyTable.vue'
  import AddForm from '@/views/backend/dict/add.vue'
  import EditForm from '@/views/backend/dict/edit.vue'

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
      EmptyTable, AddForm, EditForm
    },
    methods: {
      /*
       * Load async data
       */
      loadAsyncData (params) {
        this.$pageModelWithHistory(this, dictPage, params)
      },
      /*
       * Handle page-change event
       */
      onPageChange (page) {
        if (this.pagination.page !== page) {
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
      onDelete (id) {
        const vm = this
        this.$deleteModel(vm, deleteDict, id,
          () => this.loadAsyncData({page: this.pagination.page}))
      },
      addModal () {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '新增字典',
          width: '20%',
          component: AddForm,
          onClose: () => { vm.loadAsyncData() }
        })
      },
      editModal (id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '修改字典',
          width: '20%',
          component: EditForm,
          props: {
            dictId: id
          },
          onClose: () => { vm.loadAsyncData() }
        })
      }
    },
    created () {
      this.$fillParamFromHistory()
      this.loadAsyncData()
    }
  }
</script>
