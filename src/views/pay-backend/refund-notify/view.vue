<template>
  <section>
    <div class="form-modal-card-body">
      <div class="card">
        <header class="card-header">
          <div class="card-header-title">
            退款通知
          </div>
        </header>
        <div class="card-content">
          <b-field label="退款单号" horizontal class="static-field">
            <p class="control">
              {{ model.outRefundNo }}
            </p>
          </b-field>
          <b-field label="业务订单号" horizontal class="static-field">
            <p class="control">
              {{ model.outTradeNo }}
            </p>
          </b-field>
          <b-field label="申请金额（分）" horizontal class="static-field">
            <p class="control">
              {{ model.applyAmount }}
            </p>
          </b-field>
          <b-field label="退款金额（分）" horizontal class="static-field">
            <p class="control">
              {{ model.amount }}
            </p>
          </b-field>
          <b-field label="支付方式" horizontal class="static-field">
            <p class="control">
              {{ $dictText('payType', model.type) }}
            </p>
          </b-field>
          <b-field label="通知时间" horizontal class="static-field">
            <p class="control">
              {{ $unixTimestampToDateTimeHMS(model.responseTime)}}
            </p>
          </b-field>
          <b-field label="响应流水" horizontal class="static-field">
            <p class="control">
              {{ model.responseTransactionId }}
            </p>
          </b-field>
          <b-field label="响应结果" horizontal class="static-field">
            <p class="control">
              {{ $dictText('refundResponseResult',model.refundState) }}
            </p>
          </b-field>
          <b-field label="交易时间" horizontal class="static-field">
            <p class="control">
              {{ $unixTimestampToDateTimeHMS(model.transactionTime)}}
            </p>
          </b-field>
          <b-field label="确认结果" horizontal class="static-field">
            <p class="control">
              {{ $dictText('refundResponseAckState',model.ackState) }}
            </p>
          </b-field>
          <b-field label="确认时间" horizontal class="static-field">
            <p class="control">
              {{ $unixTimestampToDateTimeHMS(model.ackTime)}}
            </p>
          </b-field>
        </div>
      </div>

      <div class="card">
        <header class="card-header">
          <div class="card-header-title">
            退款记录
          </div>
        </header>
        <div class="card-content" v-if="model.refund">
          <b-field label="业务订单号" horizontal class="static-field">
            <p class="control">
              {{ model.refund.outTradeNo }}
            </p>
          </b-field>
          <b-field label="退款订单号" horizontal class="static-field">
            <p class="control">
              {{ model.refund.outRefundNo }}
            </p>
          </b-field>
          <b-field label="退款金额（分）" horizontal class="static-field">
            <p class="control">
              {{ model.refund.refundAmount }}
            </p>
          </b-field>
          <b-field label="退款方式" horizontal class="static-field">
            <p class="control">
              {{ $dictText('refundMethod', model.refund.refundMethod) }}
            </p>
          </b-field>
          <b-field label="付款方式" horizontal class="static-field">
            <p class="control">
              {{ $dictText('payType', model.refund.payType) }}
            </p>
          </b-field>
          <b-field label="退款原因" horizontal class="static-field">
            <p class="control">
              {{ model.refundReason }}
            </p>
          </b-field>
          <b-field label="退款状态" horizontal class="static-field">
            <p class="control">
              {{ $dictText('refundState',model.refund.state) }}
            </p>
          </b-field>
          <b-field label="退款结果" horizontal class="static-field">
            <p class="control">
              {{ model.refund.refundResult }}
            </p>
          </b-field>

          <b-field label="退款时间" horizontal class="static-field">
            <p class="control">
              {{ $unixTimestampToDateTimeHMS(model.refund.refundTime)}}
            </p>
          </b-field>
          <b-field label="确认结果" horizontal class="static-field">
            <p class="control">
              {{ $dictText('paymentResponseAckState',model.refund.ackState) }}
            </p>
          </b-field>
          <b-field label="确认时间" horizontal class="static-field">
            <p class="control">
              {{ $unixTimestampToDateTimeHMS(model.refund.ackTime)}}
            </p>
          </b-field>
          <b-field label="支付流水" horizontal class="static-field">
            <p class="control">
              {{ model.refund.paymentTransactionId }}
            </p>
          </b-field>
          <b-field label="退款流水" horizontal class="static-field">
            <p class="control">
              {{ model.refund.refundTransactionId }}
            </p>
          </b-field>
        </div>
        <div class="card-content" v-else>
          <div class="notification form-modal-card-notification">
            <p>未找到对应的退款记录</p>
          </div>
        </div>
      </div>

      <div class="card">
        <header class="card-header">
          <div class="card-header-title">
            支付记录
          </div>
        </header>
        <div class="card-content" v-if="model.payment">
          <b-field label="状态" horizontal class="static-field">
            <p class="control">
              {{ $dictText('paymentState',model.state) }}
            </p>
          </b-field>
          <b-field label="买家名称" horizontal class="static-field">
            <p class="control">
              {{ model.payment.buyerName }}
            </p>
          </b-field>
          <b-field label="卖家名称" horizontal class="static-field">
            <p class="control">
              {{ model.payment.sellerName }}
            </p>
          </b-field>
          <b-field label="金额（分）" horizontal class="static-field">
            <p class="control">
              {{ model.payment.amount }}
            </p>
          </b-field>
          <b-field label="退款次数" horizontal class="static-field">
            <p class="control">
              {{ model.payment.refundCount }}
            </p>
          </b-field>
          <b-field label="退款金额" horizontal class="static-field">
            <p class="control">
              {{ model.payment.refundAmount }}
            </p>
          </b-field>
        </div>
        <div class="card-content" v-else>
          <div class="notification form-modal-card-notification">
            <p>未找到对应的支付记录</p>
          </div>
        </div>
      </div>
      <div class="card" v-if="model.type == 2">
        <header class="card-header">
          <div class="card-header-title">
            微信响应
          </div>
        </header>
        <div class="card-content" v-if="model.responseModel.returnCode == 'SUCCESS'">
          <b-field label="返回状态码" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.returnCode }}
            </p>
          </b-field>
          <b-field label="返回信息" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.returnMsg }}
            </p>
          </b-field>
          <b-field label="公众账号ID" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.appid }}
            </p>
          </b-field>
          <b-field label="商户号" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.mchId }}
            </p>
          </b-field>
          <b-field label="错误代码" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.errCode }}
            </p>
          </b-field>
          <b-field label="错误描述" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.errCodeDes }}
            </p>
          </b-field>
          <b-field label="商户订单号" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.outTradeNo }}
            </p>
          </b-field>
          <b-field label="退款单号" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.outRefundNo }}
            </p>
          </b-field>

          <b-field label="微信退款流水" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.refundId }}
            </p>
          </b-field>
          <b-field label="退款状态" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.refundStatus }}
            </p>
          </b-field>
          <b-field label="订单金额" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.totalFee }}
            </p>
          </b-field>
          <b-field label="应结订单金额" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.settlementTotalFee }}
            </p>
          </b-field>
          <b-field label="申请退款金额" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.refundFee }}
            </p>
          </b-field>
          <b-field label="退款金额" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.settlementRefundFee }}
            </p>
          </b-field>
          <b-field label="应结退款金额" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.settlementTotalFee }}
            </p>
          </b-field>

          <b-field label="退款成功时间" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.successTime }}
            </p>
          </b-field>
          <b-field label="退款入账账户" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.refundRecvAccout }}
            </p>
          </b-field>
          <b-field label="退款资金来源" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.refundAccount }}
            </p>
          </b-field>

          <b-field label="退款发起来源" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.refundRequestSource }}
            </p>
          </b-field>
        </div>
        <div class="card-content" v-else>
          <b-field label="返回状态码" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.returnCode }}
            </p>
          </b-field>
          <b-field label="返回信息" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.returnMsg }}
            </p>
          </b-field>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import {getRefund} from '@/api/payment/refundResponse'

  export default {
    data () {
      return {
        loading: false,
        saving: false,
        model: {}
      }
    },
    created () {
      this.$parent.startLoading()
      this.$getModel(getRefund, this.$parent.$props.props.refundResponseId)
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
