<template>
  <section>
    <div class="card mt-3">
      <header class="card-header">
        <div class="card-header-title">
          <div class="card-header-left">
            <b-field grouped group-multiline>
              <b-select name="method" v-model="filters.method" placeholder="请求方法">
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="ALL">ALL</option>
              </b-select>
              <b-input v-model="filters.url" placeholder="接口地址"></b-input>
              <p class="control ml-1">
                <button class="button is-primary" @click="loadAsyncData({page: 1})">
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

            <b-table-column field="sorted" label="请求方法">
              {{ props.row.httpMethod }}
            </b-table-column>

            <b-table-column field="httpUrl" label="接口地址">
              {{ props.row.httpUrl }}
            </b-table-column>

            <b-table-column field="permission" label="权限范围">
              {{ props.row.permission }}
            </b-table-column>


            <b-table-column label="操作">
              <a @click="editModal(props.row.sysResourceId)">
                修改
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
  import {resourcePage} from '@/api/backend/sysresource'
  import EmptyTable from '@/components/EmptyTable.vue'
  import EditForm from '@/views/backend/resource/edit.vue'

  export default {
    data () {
      return {
        filters: {},
        pagination: {},
        loading: false
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
        this.$pageModelWithHistory(this, resourcePage, params)
      },
      /*
       * Handle page-change event
       */
      onPageChange (page) {
        if (this.pagination.page !== page) {
          this.loadAsyncData({page: page})
        }
      },
      editModal (id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '修改接口权限',
          width: '20%',
          component: EditForm,
          props: {
            sysResourceId: id
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
