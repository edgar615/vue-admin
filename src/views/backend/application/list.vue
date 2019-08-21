<template>
  <section>
    <nav class="level page-content-top">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <b-select placeholder="类型" v-model="filters.type">
            <option value="">请选择</option>
            <option
                v-for="option in $dictList('applicationType')"
                :value="option.dictValue"
                :key="option.dictValue">
              {{ option.dictText }}
            </option>
          </b-select>
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
          pagination-size="is-small"
        >

          <template slot-scope="props">

            <b-table-column field="name" label="名称">
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="type" label="类型">
              {{ $dictText('applicationType',props.row.type) }}
            </b-table-column>

            <b-table-column field="type" label="状态">
              {{ $dictText('applicationState',props.row.state) }}
            </b-table-column>

            <b-table-column field="appKey" label="appKey">
              {{ props.row.appKey }}
            </b-table-column>

            <b-table-column field="appKey" label="appSecret">
              {{ props.row.appSecret }}
            </b-table-column>

            <b-table-column label="操作">
              <a @click="editModal(props.row.applicationId)">
                修改
              </a>
              <a @click="onDelete(props.row.applicationId)">
                删除
              </a>
              <a @click="whitelist(props.row.applicationId)">
                角色白名单
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
  import {applicationPage, deleteApplication} from '@/api/backend/application'
  import AddForm from '@/views/backend/application/add.vue'
  import EditForm from '@/views/backend/application/edit.vue'
  import WhitelistForm from '@/views/backend/application/roles.vue'

  export default {
    data () {
      return {
        filters: {},
        pagination: {},
        loading: false,
        deleting: false,
        sortField: 'sorted',
        sortOrder: 'asc',
        defaultSortOrder: 'asc',
        checkedRows: []
      }
    },
    methods: {
      /*
       * Load async data
       */
      loadAsyncData (params) {
        this.$pageModelWithHistory(applicationPage, params)
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
       * Type style in relation to the value
       */
      internalClass (value) {
        if (value === undefined) {
          return 'is-black'
        }
        if (value) {
          return 'is-success'
        }
        return 'is-dark'
      },
      onDelete (id) {
        this.$deleteModel(deleteApplication, id,
          () => this.loadAsyncData({page: this.pagination.page}))
      },
      addModal () {
          const vm = this
          this.$formModal.open({
              parent: this,
              name: '新增应用',
              width: '30rem',
              component: AddForm,
              onClose: () => { vm.loadAsyncData() }
          })
      },
      editModal (id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '修改应用',
          width: '30rem',
          component: EditForm,
          props: {
            applicationId: id
          },
          onClose: () => { vm.loadAsyncData() }
        })
      },
      whitelist (id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '设置角色白名单',
          width: '40rem',
          component: WhitelistForm,
          props: {
            applicationId: id
          },
          showClose: true,
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
