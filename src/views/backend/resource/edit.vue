<template>
  <section>
    <div class="form-modal-card-body">
      <b-field label="请求方法" class="static-field">
        <p class="control">
          {{model.httpMethod}}
        </p>
      </b-field>
      <b-field label="请求地址" class="static-field">
        <p class="control">
          {{model.httpUrl}}
        </p>
      </b-field>

      <b-field label="权限范围" class="required-field"
               :type="errors.has('permission') ? 'is-danger' : ''"
               :message="errors.first('permission')">
        <b-input name="permission" v-model="model.permission"
                 v-validate="'required|max:64'" data-vv-as="权限范围"></b-input>
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
  import {updateResource, getResource} from '@/api/backend/sysresource'

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
        vm.$updateModel(updateResource, this.$parent.$props.props.sysResourceId, resp => {
          vm.$parent.succeed('接口权限保存成功', resp)
        }, err => {
          vm.$parent.fail('接口权限保存失败', err)
        })
      }
    },
    created () {
      this.$parent.startLoading()
      this.$getModel(getResource, this.$parent.$props.props.sysResourceId)
      .then(respone => {
        this.$parent.closeLoading()
      }).catch(err => {
        this.$parent.closeLoading()
        this.$parent.fail('接口权限查询失败', err)
      })
    }
  }
</script>
<style>

</style>
