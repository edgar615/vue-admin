<template>
  <section>
    <nav class="level page-title">
      <!-- Left side -->
      <div class="level-left">
        <PageTitle></PageTitle>
        <div class="level-item">
          <b-input v-model="filters.orderNo" placeholder="订单号"></b-input>
        </div>
        <div class="level-item">
          <b-select placeholder="支付方式" v-model="filters.payType">
            <option value="">请选择</option>
            <option
                v-for="option in $dictList('payType')"
                :value="option.dictValue"
                :key="option.dictValue">
              {{ option.dictText }}
            </option>
          </b-select>
        </div>
        <div class="level-item">
          <b-select placeholder="确认状态" v-model="filters.ackState">
            <option value="">请选择</option>
            <option
                v-for="option in $dictList('paymentResponseAckState')"
                :value="option.dictValue"
                :key="option.dictValue">
              {{ option.dictText }}
            </option>
          </b-select>
        </div>
        <div class="level-item">
          <date-picker
              v-model="transactionTimeRange"
              range
              type="datetime"
              lang="zh"
              format="YYYY-MM-DD HH:mm:ss"
              value-type="timestamp"
              clearable
              confirm
              placeholder="交易时间"
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

            <b-table-column field="type" label="支付方式">
              {{ $dictText('payType',props.row.type) }}
            </b-table-column>

            <b-table-column field="businessNo" label="业务订单号">
              {{ props.row.outTradeNo }}
            </b-table-column>

            <b-table-column field="responseTransactionId" label="第三方流水">
              {{ props.row.responseTransactionId }}
            </b-table-column>

            <b-table-column field="amount" label="金额（分）">
              {{ props.row.amount }}
            </b-table-column>

            <b-table-column field="paymentState" label="支付结果">
              {{ $dictText('paymentResponseResult',props.row.paymentState) }}
            </b-table-column>

            <b-table-column field="payTime" label="交易时间">
              {{ $unixTimestampToDateTimeHMS(props.row.transactionTime)}}
            </b-table-column>

            <b-table-column field="ackState" label="确认状态">
              {{ $dictText('paymentResponseAckState',props.row.ackState) }}
            </b-table-column>

            <b-table-column field="ackTime" label="确认时间">
              {{ $unixTimestampToDateTimeHMS(props.row.ackTime)}}
            </b-table-column>

            <b-table-column field="responseTime" label="通知时间">
              {{ $unixTimestampToDateTimeHMS(props.row.responseTime)}}
            </b-table-column>

            <b-table-column label="操作">
              <a @click="viewModal(props.row.paymentResponseId)">
                查看
              </a>
              <a @click="onNotify(props.row.paymentResponseId)" v-if="props.row.ackState != 2">
                手动确认
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
  import {paymentPage, confirmPayment} from '@/api/payment/paymentResponse'
  import ViewForm from '@/views/pay-backend/payment-notify/view.vue'

  export default {
    data () {
      return {
        transactionTimeRange: '',
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
        if (this.transactionTimeRange && this.transactionTimeRange[0]) {
          this.filters.startTime = this.transactionTimeRange[0] / 1000
          this.filters.endTime = this.transactionTimeRange[1] / 1000
        } else {
          delete  this.filters.startTime
          delete  this.filters.endTime
        }
        this.$pageModelWithHistory(paymentPage, params)
      },
      /*
       * Handle page-change event
       */
      onPageChange (page) {
        if (this.pagination.page !== page) {
          this.loadAsyncData({page: page})
        }
      },
      onNotify (id) {
        this.$confirmModel(confirmPayment, id, '确定要手动确认？',
            () => this.loadAsyncData({page: this.pagination.page}))
      },
      viewModal (id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '查看支付结果',
          width: '40rem',
          component: ViewForm,
          props: {
            paymentResponseId: id
          },
          showClose: true,
          onClose: () => { vm.loadAsyncData() }
        })
      }
    },
    created () {
      this.$fillParamFromHistory()
      if (this.filters.startTime && this.filters.endTime) {
        this.transactionTimeRange = [this.filters.startTime * 1000, this.filters.endTime * 1000]
      }
      this.loadAsyncData()
    }
  }
</script>
