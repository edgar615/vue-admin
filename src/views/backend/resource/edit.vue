<template>
  <section>
    <div class="card">
      <div class="card-content">
        <jcc-field label="请求方法" horizontal class="static-field">
          <p class="control">
            {{model.httpMethod}}
          </p>
        </jcc-field>
        <jcc-field label="请求地址" horizontal class="static-field">
          <p class="control">
            {{model.httpUrl}}
          </p>
        </jcc-field>

        <jcc-field label="权限范围" horizontal class="required-field"
                   :type="errors.has('permission') ? 'is-danger' : ''"
                   :message="errors.first('permission')">
          <b-input name="permission" v-model="model.permission"
                   v-validate="'required|max:64'" data-vv-as="权限范围" class="w-50"></b-input>
        </jcc-field>

        <b-field horizontal><!-- Label left empty for spacing -->
          <p class="control btn_margin">
            <button class="button is-primary" @click="save" :disabled='errors.any()'
                    :class="{'is-loading' : saving}">
              <b-icon icon="check-circle"></b-icon>
              <span>保存</span>
            </button>
            <button class="button" @click="back">
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
      back () {
        this.$router.back()
      },
      save () {
        const vm = this
        vm.updateModel(vm, updateResource, vm.$route.params.id,
          () => vm.$router.push({path: '/backend/resource'}))
      }
    },
    created () {
      this.getModel(this, getResource, this.$route.params.id)
    }
  }
</script>
<style>

</style>
