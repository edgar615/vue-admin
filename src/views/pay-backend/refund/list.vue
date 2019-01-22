<template>
  <section>
    <div class="card">
      <header class="card-header">
        <div class="card-header-title">
          <button class="button is-primary" @click="addModal()">
            <b-icon icon="plus-circle-outline"></b-icon>
            <span>新增</span>
          </button>
          <div class="card-header-left">
            <b-field grouped group-multiline>
              <b-input v-model="filters.orderNo" placeholder="订单号"></b-input>
              <b-input v-model="filters.refundNo" placeholder="退款单号"></b-input>
              <b-select placeholder="支付方式" v-model="filters.payType">
                <option value="">请选择</option>
                <option
                    v-for="option in $dictList(this, 'payType')"
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

            <b-table-column field="payType" label="支付类型">
              {{ $dictText(this, 'payType',props.row.payType) }}
            </b-table-column>

            <b-table-column field="outTradeNo" label="订单号">
              {{ props.row.outTradeNo }}
            </b-table-column>

            <b-table-column field="outRefundNo" label="退款单号">
              {{ props.row.outRefundNo }}
            </b-table-column>

            <b-table-column field="amount" label="退款金额（分）">
              {{ props.row.refundAmount }}
            </b-table-column>

            <b-table-column field="state" label="状态">
              {{ $dictText(this, 'paymentState',props.row.state) }}
            </b-table-column>

            <b-table-column field="payTime" label="申请时间">
              {{ props.row.refundTime }}
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
  import {refundPage} from '@/api/payment/refund'
  import EmptyTable from '@/components/EmptyTable.vue'
  import AddForm from '@/views/pay-backend/refund/add.vue'

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
      EmptyTable, AddForm
    },
    methods: {
      /*
       * Load async data
       */
      loadAsyncData (params) {
        this.$pageModelWithHistory(this, refundPage, params)
      },
      /*
       * Handle page-change event
       */
      onPageChange (page) {
        if (this.pagination.page !== page) {
          this.loadAsyncData({page: page})
        }
      },
      addModal () {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '申请退款',
          width: '20%',
          component: AddForm,
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
