<template>
  <section>
    <nav class="level page-topbar">
      <!-- Left side -->
      <div class="level-left">
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
          <b-select placeholder="支付状态" v-model="filters.state">
            <option value="">请选择</option>
            <option
                v-for="option in $dictList('paymentState')"
                :value="option.dictValue"
                :key="option.dictValue">
              {{ option.dictText }}
            </option>
          </b-select>
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

            <b-table-column field="payType" label="支付类型">
              {{ $dictText('payType',props.row.payType) }}
            </b-table-column>

            <b-table-column field="businessType" label="业务类型">
              {{ $dictText('orderType',props.row.businessType) }}
            </b-table-column>

            <b-table-column field="businessNo" label="订单号">
              {{ props.row.businessNo }}
            </b-table-column>

            <b-table-column field="amount" label="金额（分）">
              {{ props.row.amount }}
            </b-table-column>

            <b-table-column field="state" label="状态">
              {{ $dictText('paymentState',props.row.state) }}
            </b-table-column>

            <b-table-column field="payTime" label="付款时间">
              {{ $unixTimestampToDateTimeHMS(props.row.payTime)}}
            </b-table-column>

            <b-table-column field="refundCount" label="冻结金额">
              {{ props.row.freezingAmount }}
            </b-table-column>

            <b-table-column field="refundAmount" label="退款金额">
              {{ props.row.refundAmount }}
            </b-table-column>

            <b-table-column label="操作">
              <a :to="{path:  '/pay-backend/payment/' +props.row.paymentId + '/view' }" exact>
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
  import {paymentPage} from '@/api/payment/payment'

  export default {
    data () {
      return {
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
        this.$pageModelWithHistory(paymentPage, params)
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
    filters: {
    },
    created () {
      this.$fillParamFromHistory()
      this.loadAsyncData()
    }
  }
</script>
