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
          <b-input v-model="filters.refundNo" placeholder="退款单号"></b-input>
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

            <b-table-column field="refundMethod" label="退款方式">
              {{ $dictText('refundMethod',props.row.refundMethod) }}
            </b-table-column>
            <b-table-column field="payType" label="支付方式">
              {{ $dictText('payType',props.row.payType) }}
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
              {{ $dictText('refundState',props.row.state) }}
            </b-table-column>

            <b-table-column field="payTime" label="申请时间">
              {{ $unixTimestampToDateTimeHMS(props.row.refundTime) }}
            </b-table-column>

            <b-table-column label="操作">
              <a @click="viewModal(props.row.refundId)">
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
  import AddForm from '@/views/pay-backend/refund/add.vue'
  import ViewForm from '@/views/pay-backend/refund/view.vue'

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
      addModal () {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '申请退款',
          width: '30rem',
          component: AddForm,
          onClose: () => { vm.loadAsyncData() }
        })
      },
      viewModal (id) {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '查看退款结果',
          width: '40rem',
          component: ViewForm,
          props: {
            refundId: id
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
