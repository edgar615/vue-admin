<template>
  <section>
    <nav class="level page-topbar">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <b-input v-model="filters.permission" placeholder="权限字符串"></b-input>
        </div>
        <div class="level-item">
          <p class="control ml-1">
            <button class="button" @click="loadAsyncData({page: 1})">
              <b-icon icon="magnify"></b-icon>
              <span>查询</span>
            </button>
          </p>
        </div>
      </div>

      <!-- Right side -->
      <div class="level-right">
        <div class="level-item">
          <div class="level-item">
            <button class="button is-primary" @click="addModal()">
              <b-icon icon="plus-circle-outline"></b-icon>
              <span>新增</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="card">
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
          width: '30rem',
          component: AddForm,
          onClose: () => { vm.loadAsyncData() }
        })
      },
      editModal (id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '修改子权限',
          width: '30rem',
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
