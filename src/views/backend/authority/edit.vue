<template>
  <section>
    <div class="card">
      <div class="card-content">
        <jcc-field label="权限值" horizontal
                   :type="errors.has('permission') ? 'is-danger' : ''"
                   :message="errors.first('permission')">
          <b-input name="permission" v-model="model.permission"
                   v-validate="'required|max:64|alpha_underscore'"
                   data-vv-as="权限值" class="w-25"></b-input>
        </jcc-field>

        <jcc-field label="名称" horizontal
                   :type="errors.has('name') ? 'is-danger' : ''"
                   :message="errors.first('name')">
          <b-input name="name" v-model="model.name"
                   v-validate="'required|max:64'" data-vv-as="名称" class="w-25"></b-input>
        </jcc-field>
        <jcc-field class="field" horizontal message="内部访问的系统不对外公开，SP、SO均无法访问">
          <b-switch v-model="model.internal"
                    true-value="true"
                    false-value="false"
                    type="is-info">
            内部访问
          </b-switch>
        </jcc-field>
        <jcc-field class="field" horizontal message="匿名访问的权限不需要登录">
          <b-switch v-model="model.allowAnonymous"
                    true-value="true"
                    false-value="false"
                    type="is-info">
            匿名访问
          </b-switch>
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
  import {updateAuthority, getAuthority} from '@/api/backend/authority'

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
        vm.updateModel(vm, updateAuthority, vm.$route.params.id,
          () => vm.$router.push({path: '/backend/authority'}))
      }
    },
    created () {
      this.getModel(this, getAuthority, this.$route.params.id)
    }
  }
</script>
<style>

</style>
