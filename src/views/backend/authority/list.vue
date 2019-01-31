<template>
  <section>
    <div class="card mt-3">
      <header class="card-header">
        <div class="card-header-title">
          <button class="button is-primary" @click="addModal()">
            <b-icon icon="plus-circle-outline"></b-icon>
            <span>新增</span>
          </button>
          <div class="card-header-left">
            <b-field grouped group-multiline>
              <b-input v-model="filters.permission" placeholder="权限字符串"></b-input>
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
        >

          <template slot-scope="props">

            <b-table-column field="name" label="名称">
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="permission" label="权限值">
              {{ props.row.permission }}
            </b-table-column>

            <b-table-column field="type" label="允许匿名">
              {{ $boolText(props.row.allowAnonymous) }}
            </b-table-column>


            <b-table-column field="internal" label="内部访问?">
              {{ $boolText(props.row.internal) }}
            </b-table-column>

            <b-table-column label="操作">
              <a @click="editModal(props.row.authorityScopeId)">
                修改
              </a>
              <a @click="onDelete(props.row.authorityScopeId)">
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
  import {authorityPage, deleteAuthority} from '@/api/backend/authority'
  import EmptyTable from '@/components/EmptyTable.vue'
  import AddForm from '@/views/backend/authority/add.vue'
  import EditForm from '@/views/backend/authority/edit.vue'

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
        this.$pageModelWithHistory(authorityPage, params)
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
        this.$deleteModel(deleteAuthority, id,
          () => this.loadAsyncData({page: this.pagination.page}))
      },
      addModal () {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '新增权限',
          width: '20%',
          component: AddForm,
          onClose: () => { vm.loadAsyncData() }
        })
      },
      editModal (id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '修改子权限',
          width: '20%',
          component: EditForm,
          props: {
            authorityScopeId: id
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
