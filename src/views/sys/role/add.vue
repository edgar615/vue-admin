<template>
  <section>
    <div class="form-modal-card-body">
      <b-field label="名称" class="required-field"
               :type="errors.has('name') ? 'is-danger' : ''"
               :message="errors.first('name')">
        <b-input name="name" v-model="model.name"
                 v-validate="'required|max:64'" data-vv-as="名称"></b-input>
      </b-field>
      <b-field label="排序" class="required-field"
               :message="errors.first('sorted')"
               :type="errors.has('sorted') ? 'is-danger' : ''">
        <b-input name="sorted" expanded v-model="model.sorted"
                 v-validate="'required|numeric|min_value:0|max_value:9999'" data-vv-as="排序">
        </b-input>
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
  import {addRole} from '@/api/sys/role'

  export default {
    data() {
      return {
        loading: false,
        saving: false,
        model: {}
      }
    },
    methods: {
      save() {
        const vm = this
        vm.$saveModel(addRole, resp => {
          vm.$parent.succeed('角色保存成功', resp)
        }, err => {
          vm.$parent.fail('角色保存失败', err)
        })
      }
    },
    created() {
      this.model.parentId = this.$parent.$props.props.parentId
    }
  }
</script>
<style>

</style>
