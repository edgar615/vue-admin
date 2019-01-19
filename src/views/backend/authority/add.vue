<template>
  <section>
    <div class="form-modal-card-body">
      <b-field label="权限值" class="required-field"
               :type="errors.has('permission') ? 'is-danger' : ''"
               :message="errors.first('permission')">
        <b-input name="permission" v-model="model.permission"
                 v-validate="'required|max:64|alpha_underscore'"
                 data-vv-as="权限值"></b-input>
      </b-field>

      <b-field label="名称"  class="required-field"
               :type="errors.has('name') ? 'is-danger' : ''"
               :message="errors.first('name')">
        <b-input name="name" v-model="model.name"
                 v-validate="'required|max:64'" data-vv-as="名称"></b-input>
      </b-field>
      <b-field class="field" message="内部访问的系统不对外公开，SP、SO均无法访问">
        <b-switch v-model="model.internal"
                  true-value="true"
                  false-value="false"
                  type="is-info">
          内部访问
        </b-switch>
      </b-field>
      <b-field class="field" message="匿名访问的权限不需要登录">
        <b-switch v-model="model.allowAnonymous"
                  true-value="true"
                  false-value="false"
                  type="is-info">
          匿名访问
        </b-switch>
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
  import {addAuthority} from '@/api/backend/authority'

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
        vm.$saveModel(vm, addAuthority, resp => {
          vm.$parent.succeed('权限保存成功', resp)
        }, err => {
          vm.$parent.fail('权限保存失败', err)
        })
      }
    }
  }
</script>
<style>

</style>
