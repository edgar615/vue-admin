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
                    v-for="option in $dictList(this, 'type')"
                    :value="option.dictValue"
                    :key="option.dictValue">
                  {{ option.dictText }}
                </option>
              </b-select>
              <b-select placeholder="支付状态" v-model="filters.paymentState">
                <option value="">请选择</option>
                <option
                    v-for="option in $dictList(this, 'paymentResponseResult')"
                    :value="option.dictValue"
                    :key="option.dictValue">
                  {{ option.dictText }}
                </option>
              </b-select>
              <b-select placeholder="确认状态" v-model="filters.ackState">
                <option value="">请选择</option>
                <option
                    v-for="option in $dictList(this, 'paymentResponseAckState')"
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
              {{ $dictText(this, 'payType',props.row.type) }}
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

            <b-table-column field="fundChannel" label="资金渠道">
              {{ props.row.fundChannel }}
            </b-table-column>

            <b-table-column field="paymentState" label="支付结果">
              {{ $dictText(this, 'paymentResponseResult',props.row.paymentState) }}
            </b-table-column>

            <b-table-column field="payTime" label="交易时间">
              {{ $unixTimestampToDateTimeHMS(props.row.transactionTime)}}
            </b-table-column>

            <b-table-column field="ackState" label="确认状态">
              {{ $dictText(this, 'paymentResponseAckState',props.row.ackState) }}
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
  import {paymentPage} from '@/api/payment/paymentResponse'
  import EmptyTable from '@/components/EmptyTable.vue'
  import ViewForm from '@/views/pay-backend/payment-notify/view.vue'

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
      EmptyTable, ViewForm
    },
    methods: {
      /*
       * Load async data
       */
      loadAsyncData (params) {
        this.$pageModelWithHistory(this, paymentPage, params)
      },
      /*
       * Handle page-change event
       */
      onPageChange (page) {
        if (this.pagination.page !== page) {
          this.loadAsyncData({page: page})
        }
      },
      viewModal (id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '查看支付结果',
          width: '30%',
          component: ViewForm,
          props: {
            paymentResponseId: id
          },
          showClose: true,
          onClose: () => { vm.loadAsyncData() }
        })
      }
    },
    filters: {
    },
    created () {
      this.$fillParamFromHistory()
      this.loadAsyncData()
    }
  }
</script>
