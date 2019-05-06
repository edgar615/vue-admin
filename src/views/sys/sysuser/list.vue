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
              <b-input v-model="filters.username" placeholder="用户名"></b-input>
              <b-field>
                <b-radio-button v-model="filters.state"
                                native-value="1"
                                type="is-success">
                  <b-icon icon="lock-open-outline"></b-icon>
                  <span>活动</span>
                </b-radio-button>
                <b-radio-button v-model="filters.state"
                                native-value="2"
                                type="is-dark" class="is-dark-blue-lighter">
                  <b-icon icon="lock-outline"></b-icon>
                  <span>锁定</span>
                </b-radio-button>
                <b-radio-button v-model="filters.state"
                                native-value="">
                  全部
                </b-radio-button>
              </b-field>
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
          pagination-size="is-small"

        >

          <template slot-scope="props">

            <b-table-column field="username" label="用户名">
              {{ props.row.username }}
            </b-table-column>

            <b-table-column field="fullname" label="姓名">
              {{ props.row.fullname }}
            </b-table-column>

            <b-table-column field="state" label="状态">
              <span class="tag" :class="stateClass(props.row.state)">{{ $dictText('userState',props.row.state) }}</span>
            </b-table-column>

            <b-table-column label="操作">
              <a @click="doLock(props.row.sysUserId)" v-show="props.row.state == 1">
                锁定
              </a>
              <a @click="doUnLock(props.row.sysUserId)" v-show="props.row.state == 2">
                解锁
              </a>
              <a @click="permitModal(props.row.sysUserId)">
                授权
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
  import {page, lock, unLock} from '@/api/sys/sysuser'
  import EmptyTable from '@/components/EmptyTable.vue'
  import AddForm from '@/views/sys/sysuser/add.vue'
  import PermitForm from '@/views/sys/sysuser/permit.vue'

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
        this.$pageModelWithHistory(page, params)
      },
      /*
       * Handle page-change event
       */
      onPageChange (page) {
        if (this.pagination.page !== page) {
          this.loadAsyncData({page: page})
        }
      },
      stateClass (value) {
        if (value === undefined) {
          return 'is-black'
        }
        if (value === 1) {
          return 'is-success'
        }
        return 'is-dark'
      },
      doLock (id) {
        this.$confirmModel(lock, id, '确定要锁定该用户？',
            () => this.loadAsyncData({page: this.pagination.page}))
      },
      doUnLock (id) {
        this.$confirmModel(unLock, id, '确定要解锁该用户？',
            () => this.loadAsyncData({page: this.pagination.page}))
      },
      addModal () {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '新增用户',
          width: '30rem',
          component: AddForm,
          onClose: () => { vm.loadAsyncData() }
        })
      },
      permitModal (id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '用户授权',
          width: '30rem',
          component: PermitForm,
          props: {
            sysUserId: id
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
