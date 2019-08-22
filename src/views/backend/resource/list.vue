<template>
  <section>
    <nav class="level page-content-top">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <b-select name="method" v-model="filters.method" placeholder="请求方法">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="ALL">ALL</option>
          </b-select>
        </div>
        <div class="level-item">
          <b-input v-model="filters.url" placeholder="接口地址"></b-input>
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
    </nav>

    <b-table
      striped
      bordered
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

        <b-table-column field="sorted" label="请求方法">
          {{ props.row.httpMethod }}
        </b-table-column>

        <b-table-column field="httpUrl" label="接口地址">
          {{ props.row.httpUrl }}
        </b-table-column>

        <b-table-column field="permission" label="权限值">
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


  </section>
</template>

<script>
  import {resourcePage} from '@/api/backend/sysresource'
  import EditForm from '@/views/backend/resource/edit.vue'

  export default {
    data () {
      return {
        filters: {},
        pagination: {},
        loading: false
      }
    },
    methods: {
      /*
       * Load async data
       */
      loadAsyncData (params) {
        this.$pageModelWithHistory(resourcePage, params)
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
          width: '30rem',
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
