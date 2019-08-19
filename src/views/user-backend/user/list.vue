<template>
  <section>
    <nav class="level page-topbar">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <b-input v-model="filters.username" placeholder="用户名"></b-input>
        </div>
        <div class="level-item">
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

            <b-table-column field="username" label="用户名">
              {{ props.row.username }}
            </b-table-column>

            <b-table-column field="username" label="手机号">
              {{ props.row.mobile }}
            </b-table-column>

            <b-table-column field="username" label="邮箱">
              {{ props.row.mail }}
            </b-table-column>

            <b-table-column field="fullname" label="姓名">
              {{ props.row.fullname }}
            </b-table-column>

            <b-table-column field="fullname" label="昵称">
              {{ props.row.nickname }}
            </b-table-column>

            <b-table-column field="state" label="状态">
              <span class="tag" :class="stateClass(props.row.state)">{{ $dictText('userState',props.row.state) }}</span>
            </b-table-column>

            <b-table-column label="操作">
              <a @click="doLock(props.row.userId)" v-show="props.row.state == 1">
                锁定
              </a>
              <a @click="doUnLock(props.row.userId)" v-show="props.row.state == 2">
                解锁
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
  import {page, lock, unLock} from '@/api/user/user'

  export default {
    data () {
      return {
        filters: {
          state : "1"
        },
        pagination: {},
        loading: false
      }
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
      }
    },
    created () {
      this.$fillParamFromHistory()
      this.loadAsyncData()
    }
  }
</script>
