<template>
  <section>
    <div class="card">
      <header class="card-header">
        <div class="card-header-title">
          <div class="card-header-left">
            <b-field grouped group-multiline>
              <b-input v-model="filters.orderNo" placeholder="订单号"></b-input>
              <b-select placeholder="支付方式" v-model="filters.type">
                <option value="">请选择</option>
                <option
                    v-for="option in $dictList('type')"
                    :value="option.dictValue"
                    :key="option.dictValue">
                  {{ option.dictText }}
                </option>
              </b-select>
              <b-select placeholder="退款结果" v-model="filters.refundState">
                <option value="">请选择</option>
                <option
                    v-for="option in $dictList('refundResponseResult')"
                    :value="option.dictValue"
                    :key="option.dictValue">
                  {{ option.dictText }}
                </option>
              </b-select>
              <b-select placeholder="确认状态" v-model="filters.ackState">
                <option value="">请选择</option>
                <option
                    v-for="option in $dictList('refundResponseAckState')"
                    :value="option.dictValue"
                    :key="option.dictValue">
                  {{ option.dictText }}
                </option>
              </b-select>
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

            <b-table-column field="type" label="支付方式">
              {{ $dictText('payType',props.row.type) }}
            </b-table-column>

            <b-table-column field="businessNo" label="退款单号">
              {{ props.row.outRefundNo }}
            </b-table-column>

            <b-table-column field="businessNo" label="业务订单号">
              {{ props.row.outTradeNo }}
            </b-table-column>

            <b-table-column field="responseTransactionId" label="第三方流水">
              {{ props.row.responseTransactionId }}
            </b-table-column>

            <b-table-column field="amount" label="退款金额（分）">
              {{ props.row.amount }}
            </b-table-column>

            <b-table-column field="refundState" label="退款结果">
              {{ $dictText('refundResponseResult',props.row.refundState) }}
            </b-table-column>

            <b-table-column field="payTime" label="交易时间">
              {{ $unixTimestampToDateTimeHMS(props.row.transactionTime)}}
            </b-table-column>

            <b-table-column field="ackState" label="确认状态">
              {{ $dictText('refundResponseAckState',props.row.ackState) }}
            </b-table-column>

            <b-table-column field="ackTime" label="确认时间">
              {{ $unixTimestampToDateTimeHMS(props.row.ackTime)}}
            </b-table-column>

            <b-table-column field="responseTime" label="通知时间">
              {{ $unixTimestampToDateTimeHMS(props.row.responseTime)}}
            </b-table-column>

            <b-table-column label="操作">
              <a @click="viewModal(props.row.refundResponseId)">
                查看
              </a>
              <a @click="onNotify(props.row.refundResponseId)" v-if="props.row.ackState != 2">
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
  import {refundPage, confirmRefund} from '@/api/payment/refundResponse'
  import EmptyTable from '@/components/EmptyTable.vue'
  import ViewForm from '@/views/pay-backend/refund-notify/view.vue'

  export default {
    data () {
      return {
        filters: {},
        pagination: {},
        loading: false,
        deleting: false
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
        this.$pageModelWithHistory(refundPage, params)
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
        this.$confirmModel(confirmRefund, id, '确定要手动确认？',
            () => this.loadAsyncData({page: this.pagination.page}))
      },
      viewModal (id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '查看支付结果',
          width: '30%',
          component: ViewForm,
          props: {
            refundResponseId: id
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
