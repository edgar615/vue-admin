<template>
  <section>
    <div class="form-modal-card-body">
      <b-field label="标识符" class="static-field">
        <p class="control">
          {{model.sysIdentifier}}
        </p>
      </b-field>
      <b-field label="名称" class="required-field"
               :type="errors.has('name') ? 'is-danger' : ''"
               :message="errors.first('name')">
        <b-input name="name" v-model="model.name"
                 v-validate="'required|max:64'" data-vv-as="名称"></b-input>
      </b-field>

      <b-field label="图标" class="required-field"
               :type="errors.has('icon') ? 'is-danger' : ''"
               :message="errors.first('icon')">
        <b-input name="icon" v-model="model.icon"
                 v-validate="'required|max:32'" data-vv-as="图标"></b-input>
      </b-field>
      <b-field label="排序" class="required-field"
               :type="errors.has('sorted') ? 'is-danger' : ''"
               :message="errors.first('sorted')">
        <b-input name="sorted" expanded v-model="model.sorted"
                 v-validate="'required|numeric|min_value:0|max_value:9999'"
                 data-vv-as="排序">
        </b-input>
      </b-field>

      <b-field label="类型" class="static-field">
        <p class="control">
          {{ $dictText(this, 'systemType',model.type) }}
        </p>
      </b-field>

      <b-field label="内部访问" class="static-field">
        <p class="control">
            <span class="tag is-info">
              {{ $boolText(model.internal) }}
              </span>
        </p>
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
  import {updateSystem, getSystem} from '@/api/backend/system'

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
        vm.$updateModel(vm, updateSystem, this.$parent.$props.props.systemId, resp => {
          vm.$parent.succeed('子系统保存成功', resp)
        }, err => {
          vm.$parent.fail('子系统保存失败', err)
        })
      }
    },
    created () {
      this.$parent.startLoading()
      this.$getModel(this, getSystem, this.$parent.$props.props.systemId)
      .then(respone => {
        this.$parent.closeLoading()
      }).catch(err => {
        this.$parent.closeLoading()
        this.$parent.fail('子系统查询失败', err)
      })
    }
  }
</script>
<style>

</style>
