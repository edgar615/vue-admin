<template>
  <section>
    <div class="form-modal-card-body">
      <b-field label="名称"
               :type="errors.has('name') ? 'is-danger' : ''"
               :message="['属性分组名称',errors.first('name')]">
        <b-input name="name" v-model="model.name"
                 v-validate="'required|max:8'" data-vv-as="名称"></b-input>
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
  import { addAttr } from '@/api/commodity/attribute'

  export default {
    data() {
      return {
        loading: false,
        saving: false,
        model: {
          options: []
        }
      }
    },
    methods: {
      addOption() {
        this.model.options.push({})
      },
      deleteOptions(index) {
        if (this.model.options) {
          this.model.options.splice(index, 1)
        }
      },
      save() {
        const vm = this
        vm.$saveModel(addAttr, resp => {
          vm.$parent.succeed('属性分组保存成功', resp)
        }, err => {
          vm.$parent.fail('属性分组保存失败', err)
        })
      }
    },
    created() {
      this.model.commodityCategoryKey = this.$parent.$props.props.commodityCategoryKey
    }
  }
</script>
<style>

</style>
