<template>
  <section>
    <div class="form-modal-card-body">
      <b-field label="字典编码" class="required-field"
                 :type="errors.has('dictCode') ? 'is-danger' : ''"
                 :message="errors.first('dictCode')">
        <b-input name="dictCode" v-model="model.dictCode"
                 v-validate="'required|max:64|alpha_underscore|remote:/dict/code-vertify'"
                 data-vv-as="字典编码"></b-input>
      </b-field>

      <b-field label="名称" class="required-field"
                 :type="errors.has('name') ? 'is-danger' : ''"
                 :message="errors.first('name')">
        <b-input name="name" v-model="model.name"
                 v-validate="'required|max:64'" data-vv-as="名称"></b-input>
      </b-field>

      <b-field label="默认值"  class="required-field"
                 :type="errors.has('defaultValue') ? 'is-danger' : ''"
                 :message="errors.first('defaultValue')">
        <b-input name="defaultValue" v-model="model.defaultValue"
                 v-validate="'required|max:32'" data-vv-as="默认值"></b-input>
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
  import {addDict} from '@/api/backend/dict'

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
        vm.$saveModel(addDict, resp => {
          vm.$parent.succeed('字典保存成功', resp)
        }, err => {
          vm.$parent.fail('字典保存失败', err)
        })
      }
    }
  }
</script>
<style>

</style>
