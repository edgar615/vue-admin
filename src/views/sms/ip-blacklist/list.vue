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
              <b-input v-model="filters.ipAddress" placeholder="ip地址"></b-input>
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

            <b-table-column field="ipAddress" label="ip地址">
              {{ props.row.ipAddress }}
            </b-table-column>

            <b-table-column label="操作">
              <a @click="onDelete(props.row.smsIpBlacklistId)">
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
  import {page, del} from '@/api/sms/ipBlacklist'
  import EmptyTable from '@/components/EmptyTable.vue'
  import AddForm from '@/views/sms/ip-blacklist/add.vue'

  export default {
    data () {
      return {
        filters: {},
        pagination: {},
        loading: false
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
        this.$pageModelWithHistory(this, page, params)
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
        this.$deleteModel(vm, del, id,
          () => this.loadAsyncData())
      },
      addModal () {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '新增IP黑名单',
          width: '20%',
          component: AddForm,
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
