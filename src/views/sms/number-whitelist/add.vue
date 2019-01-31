<template>
  <section>
    <div class="form-modal-card-body">
      <b-field label="手机号码" class="required-field"
                 :type="errors.has('phoneNumber') ? 'is-danger' : ''"
                 :message="errors.first('phoneNumber')">
        <b-input name="phoneNumber" v-model="model.phoneNumber"
                 v-validate="'required|max:64'" data-vv-as="手机号码"></b-input>
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
<script>
  import {save} from '@/api/sms/numberWhitelist'

  export default {
    data () {
      return {
        loading: false,
        saving: false,
        model: {}
      }
    },
    methods: {
      save () {
        const vm = this
        vm.$saveModel(save, resp => {
          vm.$parent.succeed('号码白名单保存成功', resp)
        }, err => {
          vm.$parent.fail('号码白名单保存失败', err)
        })
      }
    }
  }
</script>
<style>

</style>
