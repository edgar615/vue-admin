<template>
  <section>
    <div class="form-modal-card-body">
      <b-field label="模板标识符" class="required-field"
                 :type="errors.has('smsTplIdentifier') ? 'is-danger' : ''"
                 :message="errors.first('smsTplIdentifier')">
        <b-input name="smsTplIdentifier" v-model="model.smsTplIdentifier"
                 v-validate="'required|max:64'" data-vv-as="模板标识符"></b-input>
      </b-field>
      <b-field label="短信签名" class="required-field"
                 :type="errors.has('signName') ? 'is-danger' : ''"
                 :message="errors.first('signName')">
        <b-input name="signName" v-model="model.signName"
                 v-validate="'required|max:32'" data-vv-as="短信签名"></b-input>
      </b-field>
      <b-field label="短信模板" class="required-field"
                 :type="errors.has('smsTpl') ? 'is-danger' : ''"
                 :message="errors.first('smsTpl')">
        <b-input name="smsTpl" v-model="model.smsTpl"
                 v-validate="'required|max:32'" data-vv-as="短信模板"></b-input>
      </b-field>
      <b-field label="过期时间（秒）" class="required-field"
                 :type="errors.has('expireSecond') ? 'is-danger' : ''"
                 :message="errors.first('expireSecond')">
        <b-input name="expireSecond" v-model="model.expireSecond"
                 v-validate="'required|number'" data-vv-as="过期时间"></b-input>
      </b-field>
    </div>
    <div class="form-modal-card-footer">
      <button class="button is-primary" @click="save" :disabled='errors.any()'
              :class="{'is-loading' : saving}">
        <span>保存</span>
      </button>
      <button class="button" @click="$parent.close()">
        <span>关闭</span>
      </button>
    </div>
  </section>
</template>
<script>
  import {save} from '@/api/company'

  export default {
    data () {
      return {
        loading: false,
        saving: false,
        model: {}
      }
    },
    methods: {
      back () {
        this.$router.back()
      },
      save () {
        const vm = this
        vm.saveMode(vm, save, () => vm.$router.push({path: '/company'}))
      }
    },
    created () {
    }
  }
</script>
<style>

</style>
