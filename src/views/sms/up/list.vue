<template>
  <section>
    <div class="card">
      <header class="card-header">
        <div class="card-header-title">
          <div class="card-header-left">
            <b-field grouped group-multiline>
              <b-input v-model="filters.phoneNumber" placeholder="手机号码"></b-input>
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

            <b-table-column field="phoneNumber" label="手机号码">
              {{ props.row.phoneNumber }}
            </b-table-column>

            <b-table-column field="smsContent" label="短信内容">
              {{ props.row.smsContent }}
            </b-table-column>

            <b-table-column field="reportTime" label="报告时间">
              {{ $unixTimestampToDateTimeHMS(props.row.sendTime)}}
            </b-table-column>

            <b-table-column field="signName" label="短信前面">
              {{ props.row.signName }}
            </b-table-column>

            <b-table-column field="destCode" label="扩展号码">
              {{ props.row.destCode }}
            </b-table-column>

            <b-table-column field="bizId" label="发送序列号">
              {{ props.row.bizId }}
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
  import {upPage} from '@/api/sms/notify'
  import EmptyTable from '@/components/EmptyTable.vue'

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
        this.$pageModelWithHistory(this, upPage, params)
      },
      /*
       * Handle page-change event
       */
      onPageChange (page) {
        if (this.pagination.page !== page) {
          this.loadAsyncData({page: page})
        }
      }
    },
    created () {
      this.$fillParamFromHistory()
      this.loadAsyncData()
    }
  }
</script>
