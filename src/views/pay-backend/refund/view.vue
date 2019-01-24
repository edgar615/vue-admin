<template>
  <section>
    <div class="form-modal-card-body">
      <div class="card">
        <header class="card-header">
          <div class="card-header-title">
            退款记录
          </div>
        </header>
        <div class="card-content">
          <b-field label="业务订单号" horizontal class="static-field">
            <p class="control">
              {{ model.outTradeNo }}
            </p>
          </b-field>
          <b-field label="退款订单号" horizontal class="static-field">
            <p class="control">
              {{ model.outRefundNo }}
            </p>
          </b-field>
          <b-field label="退款金额（分）" horizontal class="static-field">
            <p class="control">
              {{ model.refundAmount }}
            </p>
          </b-field>
          <b-field label="退款方式" horizontal class="static-field">
            <p class="control">
              {{ $dictText(this, 'refundMethod', model.refundMethod) }}
            </p>
          </b-field>
          <b-field label="付款方式" horizontal class="static-field">
            <p class="control">
              {{ $dictText(this, 'payType', model.payType) }}
            </p>
          </b-field>
          <b-field label="退款原因" horizontal class="static-field">
            <p class="control">
              {{ model.refundReason }}
            </p>
          </b-field>
          <b-field label="退款状态" horizontal class="static-field">
            <p class="control">
              {{ $dictText(this, 'refundState',model.state) }}
            </p>
          </b-field>
          <b-field label="退款结果" horizontal class="static-field">
            <p class="control">
              {{ model.refundResult }}
            </p>
          </b-field>

          <b-field label="退款时间" horizontal class="static-field">
            <p class="control">
              {{ $unixTimestampToDateTimeHMS(model.refundTime)}}
            </p>
          </b-field>
          <b-field label="确认结果" horizontal class="static-field">
            <p class="control">
              {{ $dictText(this, 'paymentResponseAckState',model.ackState) }}
            </p>
          </b-field>
          <b-field label="确认时间" horizontal class="static-field">
            <p class="control">
              {{ $unixTimestampToDateTimeHMS(model.ackTime)}}
            </p>
          </b-field>
          <b-field label="支付流水" horizontal class="static-field">
            <p class="control">
              {{ model.paymentTransactionId }}
            </p>
          </b-field>
          <b-field label="退款流水" horizontal class="static-field">
            <p class="control">
              {{ model.refundTransactionId }}
            </p>
          </b-field>
        </div>
      </div>

    </div>
  </section>
</template>
<script>
  import {getRefund} from '@/api/payment/refund'

  export default {
    data () {
      return {
        loading: false,
        model: {}
      }
    },
    created () {
      this.$parent.startLoading()
      this.$getModel(this, getRefund, this.$parent.$props.props.refundId)
      .then(respone => {
        this.$parent.closeLoading()
      }).catch(err => {
        this.$parent.closeLoading()
        this.$parent.fail('退款记录查询失败', err)
      })
    }
  }
</script>
<style>

</style>
