<template>
  <section>
    <div class="card">
      <div class="card-content">
        <b-field label="支付类型" horizontal class="static-field">
          <p class="control">
            {{ $dictText('payType',model.payType) }}
          </p>
        </b-field>

        <b-field label="业务类型" horizontal class="static-field">
          <p class="control">
            {{ $dictText('orderType',model.businessType) }}
          </p>
        </b-field>

        <b-field label="订单号" horizontal class="static-field">
          <p class="control">
            {{model.businessNo}}
          </p>
        </b-field>

        <b-field label="金额（分）" horizontal class="static-field">
          <p class="control">
            {{model.amount}}
          </p>
        </b-field>

        <b-field label="状态" horizontal class="static-field">
          <p class="control">
          {{ $dictText('paymentState',model.state) }}
          </p>
        </b-field>
        <b-field label="买家" horizontal class="static-field">
          <p class="control">
            {{model.buyerName}}
          </p>
        </b-field>
        <b-field label="卖家" horizontal class="static-field">
          <p class="control">
            {{model.sellerName}}
          </p>
        </b-field>
        <b-field label="付款时间" horizontal class="static-field">
          <p class="control">
            {{model.payTime}}
          </p>
        </b-field>
        <b-field horizontal><!-- Label left empty for spacing -->
          <p class="control btn_margin">
            <button class="button is-primary" @click="back">
              <b-icon icon="undo"></b-icon>
              <span>返回</span>
            </button>
          </p>
        </b-field>
      </div>
    </div>
    <b-loading :active.sync="loading"></b-loading>
  </section>
</template>
<script>
  import {getPayment} from '@/api/payment/payment'

  export default {
    data () {
      return {
        loading: false,
        model: {}
      }
    },
    methods: {
      back () {
        this.$router.back()
      }
    },
    created () {
      this.getModel(getPayment, this.$route.params.id)
    }
  }
</script>
<style>

</style>
