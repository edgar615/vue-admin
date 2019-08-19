<template>
  <section>
    <nav class="level page-topbar">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <b-input v-model="filters.phoneNumber" placeholder="手机号码"></b-input>
        </div>
        <div class="level-item">
          <b-select placeholder="发送状态" v-model="filters.state">
            <option value="">请选择</option>
            <option
                v-for="option in $dictList('smsState')"
                :value="option.dictValue"
                :key="option.dictValue">
              {{ option.dictText }}
            </option>
          </b-select>
        </div>
        <div class="level-item">
          <date-picker
              v-model="sendTimeRange"
              range
              type="datetime"
              lang="zh"
              format="YYYY-MM-DD HH:mm:ss"
              value-type="timestamp"
              clearable
              confirm
              placeholder="发送时间"
              confirm-text="确认"
              @change="clear"
              icon="calendar-today right-icon"
          >
          </date-picker>
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

            <b-table-column field="smsSingleRecordId" label="发送序列">
              {{ props.row.smsSingleRecordId }}
            </b-table-column>

            <b-table-column field="phoneNumber" label="手机号码">
              {{ props.row.phoneNumber }}
            </b-table-column>

            <b-table-column field="ipAddress" label="调用IP">
              {{ props.row.ipAddress }}
            </b-table-column>

            <b-table-column field="smsContent" label="发送内容">
              {{ props.row.smsContent }}
            </b-table-column>

            <b-table-column field="state" label="发送状态">
              {{ $dictText('smsState',props.row.state) }}
            </b-table-column>

            <b-table-column field="createTime" label="记录时间">
              {{ $unixTimestampToDateTimeHMS(props.row.createTime)}}
            </b-table-column>

            <b-table-column field="sendTime" label="发送时间">
              {{ $unixTimestampToDateTimeHMS(props.row.sendTime)}}
            </b-table-column>

            <b-table-column field="reportTime" label="报告时间">
              {{ $unixTimestampToDateTimeHMS(props.row.reportTime)}}
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

  export default {
    data () {
      return {
        sendTimeRange: '',
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
        if (this.sendTimeRange && this.sendTimeRange[0]) {
            this.filters.startTime = this.sendTimeRange[0] / 1000
            this.filters.endTime = this.sendTimeRange[1] / 1000
        } else {
          delete  this.filters.startTime
          delete  this.filters.endTime
        }
        this.$pageModelWithHistory(page, params)
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
      if (this.filters.startTime && this.filters.endTime) {
        this.sendTimeRange = [this.filters.startTime * 1000, this.filters.endTime * 1000]
      }
      this.loadAsyncData()
    }
  }
</script>
