<template>
  <section>
    <div class="form-modal-card-body">
      <b-field label="业务订单号" class="required-field"
                 :type="errors.has('orderNo') ? 'is-danger' : ''"
                 :message="errors.first('orderNo')">
        <b-input name="orderNo" v-model="model.orderNo"
                 v-validate="'required|max:64|alpha_num'"
                 data-vv-as="业务订单号"></b-input>
      </b-field>
      <b-field label="退款金额(分)" class="required-field"
                 :type="errors.has('refundAmount') ? 'is-danger' : ''"
                 :message="errors.first('refundAmount')">
        <b-input name="refundAmount" v-model="model.refundAmount"
                 v-validate="'required|max:64|numeric'"
                 data-vv-as="退款金额"></b-input>
      </b-field>

      <b-field label="退款方式" class="required-field"
                 :type="errors.has('refundType') ? 'is-danger' : ''"
                 :message="errors.first('refundType')">
        <b-field>
          <b-radio-button v-model="model.refundType"
                          native-value="1">
            <span>原路退回</span>
          </b-radio-button>

          <b-radio-button v-model="model.refundType"
                          native-value="2">
            <span>退到余额</span>
          </b-radio-button>
        </b-field>
      </b-field>

      <b-field label="退款原因" class="required-field"
                 :type="errors.has('refundReason') ? 'is-danger' : ''"
                 :message="errors.first('refundReason')">
        <b-input name="refundReason" v-model="model.refundReason"
                 v-validate="'required'"
                 data-vv-as="退款原因"></b-input>
      </b-field>
    </div>
    <div class="form-modal-card-footer">
      <button class="button is-primary" @click="save" :disabled='errors.any()'
              :class="{'is-loading' : saving}">
        <span>保存</span>
      </button>
      <button class="button" @click="$parent.cancel()">
        <span>关闭</span>
      </button>
    </div>
  </section>
</template>

<style>
</style>
<script>
  import {addRefund} from '@/api/payment/refund'

  export default {
    data () {
      return {
        model: {
          refundType: '1'
        }
      }
    },
    methods: {
      save () {
        const vm = this
        vm.$saveModel(vm, addRefund, resp => {
          vm.$parent.succeed('退款申请成功', resp)
        }, err => {
          vm.$parent.fail('退款申请失败', err)
        })
      }
    }
  }
</script>
