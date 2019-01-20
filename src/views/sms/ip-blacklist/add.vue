<template>
  <section>
    <div class="form-modal-card-body">
      <b-field label="Ip地址" class="required-field"
                 :type="errors.has('ipAddress') ? 'is-danger' : ''"
                 :message="errors.first('ipAddress')">
        <b-input name="ipAddress" v-model="model.ipAddress"
                 v-validate="'required|max:64'" data-vv-as="IP地址"></b-input>
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
  import {save} from '@/api/sms/ipBlacklist'

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
        vm.$saveModel(vm, save, resp => {
          vm.$parent.succeed('IP黑名单保存成功', resp)
        }, err => {
          vm.$parent.fail('IP黑名单保存失败', err)
        })
      }
    }
  }
</script>
<style>

</style>
