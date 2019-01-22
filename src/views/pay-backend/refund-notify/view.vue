<template>
  <section>
    <div class="form-modal-card-body">
      <div class="card">
        <header class="card-header">
          <div class="card-header-title">
            支付通知
          </div>
        </header>
        <div class="card-content">
          <b-field label="业务订单号" horizontal class="static-field">
            <p class="control">
              {{ model.outTradeNo }}
            </p>
          </b-field>
          <b-field label="金额（分）" horizontal class="static-field">
            <p class="control">
              {{ model.amount }}
            </p>
          </b-field>
          <b-field label="支付方式" horizontal class="static-field">
            <p class="control">
              {{ $dictText(this, 'payType', model.type) }}
            </p>
          </b-field>
          <b-field label="支付流水" horizontal class="static-field">
            <p class="control">
              {{ model.responseTransactionId }}
            </p>
          </b-field>
          <b-field label="支付结果" horizontal class="static-field">
            <p class="control">
              {{ $dictText(this, 'paymentResponseResult',model.paymentState) }}
            </p>
          </b-field>
          <b-field label="交易时间" horizontal class="static-field">
            <p class="control">
              {{ $unixTimestampToDateTimeHMS(model.transactionTime)}}
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
          <b-field label="通知时间" horizontal class="static-field">
            <p class="control">
              {{ $unixTimestampToDateTimeHMS(model.responseTime)}}
            </p>
          </b-field>
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
              {{ $dictText(this, 'paymentState',model.state) }}
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
          <b-field label="设备号" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.deviceInfo }}
            </p>
          </b-field>
          <b-field label="业务结果" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.resultCode }}
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
          <b-field label="用户标识" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.openid }}
            </p>
          </b-field>
          <b-field label="关注公众号?" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.isSubscribe }}
            </p>
          </b-field>
          <b-field label="交易类型" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.tradeType }}
            </p>
          </b-field>
          <b-field label="付款银行" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.bankType }}
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
          <b-field label="货币种类" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.feeType }}
            </p>
          </b-field>
          <b-field label="现金支付金额" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.cashFee }}
            </p>
          </b-field>
          <b-field label="现金支付货币类型" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.cashFeeType }}
            </p>
          </b-field>
          <b-field label="总代金券金额" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.couponFee }}
            </p>
          </b-field>
          <b-field label="代金券使用数量" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.couponCount }}
            </p>
          </b-field>
          <b-field label="微信支付订单号" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.transactionId }}
            </p>
          </b-field>
          <b-field label="商户订单号" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.outTradeNo }}
            </p>
          </b-field>
          <b-field label="商家数据包" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.attach }}
            </p>
          </b-field>
          <b-field label="支付完成时间" horizontal class="static-field">
            <p class="control">
              {{ model.responseModel.timeEnd }}
            </p>
          </b-field>

          <b-table
              :data="model.responseModel.coupons">
            <template slot-scope="props">
              <b-table-column field="couponId" label="代金券ID">
                {{ props.row.couponId }}
              </b-table-column>
              <b-table-column field="couponFee" label="代金券金额">
                {{ props.row.couponFee }}
              </b-table-column>
            </template>
          </b-table>
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
  import {getPayment} from '@/api/payment/paymentResponse'

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
      this.$getModel(this, getPayment, this.$parent.$props.props.paymentResponseId)
      .then(respone => {
        this.$parent.closeLoading()
      }).catch(err => {
        this.$parent.closeLoading()
        this.$parent.fail('支付记录查询失败', err)
      })
    }
  }
</script>
<style>

</style>
