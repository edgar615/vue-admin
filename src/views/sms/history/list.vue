<template>
  <section>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="title has-text-primary">发送记录</div>
        </div>
      </div>
    </div>
    <div class="card mt-3">
      <header class="card-header">
        <div class="card-header-title">
          <div class="card-header-left">
            <b-field grouped group-multiline>
              <b-input v-model="filters.identifier" placeholder="标识符"></b-input>
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

        <!--buefy的表格组件，具体用法查阅文档-->
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

            <b-table-column field="smsContent" label="发送内容">
              {{ props.row.smsContent }}
            </b-table-column>

            <b-table-column field="state" label="发送状态">
              {{ $dictText(this, 'smsState',props.row.state) }}
            </b-table-column>

            <b-table-column field="createTime" label="记录时间">
              {{ DateUtils.unixTimestampToDateTimeHMS(props.row.createTime)}}
            </b-table-column>

            <b-table-column field="sendTime" label="发送时间">
              {{ DateUtils.unixTimestampToDateTimeHMS(props.row.sendTime)}}
            </b-table-column>

            <b-table-column field="reportTime" label="报告时间">
              {{ DateUtils.unixTimestampToDateTimeHMS(props.row.reportTime)}}
            </b-table-column>

            <b-table-column field="errCode" label="错误码">
              {{ props.row.errCode }}
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
  import {page} from '@/api/sms/history'
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
        this.$pageModelWithHistory(this, page, params)
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
