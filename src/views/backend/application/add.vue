<template>
  <section>
    <div class="form-modal-card-body">
      <b-field label="类型" class="required-field"
               :type="errors.has('type') ? 'is-danger' : ''"
               :message="errors.first('type')">
        <b-select name="type" expanded v-model="model.type"
                  v-validate="'required'" data-vv-as="类型">
          <option
              v-for="option in $dictList('applicationType')"
              :value="option.dictValue"
              :key="option.dictValue">
            {{ option.dictText }}
          </option>
        </b-select>
      </b-field>
      <b-field label="名称" class="required-field"
               :type="errors.has('name') ? 'is-danger' : ''"
               :message="errors.first('name')">
        <b-input name="name" v-model="model.name"
                 v-validate="'required|max:64'" data-vv-as="名称"></b-input>
      </b-field>

      <b-field label="状态" class="field">
        <dict-radio-button :model="model" param-name="state" dict-code="applicationState"></dict-radio-button>
      </b-field>

      <b-field class="field">
        <b-switch v-model="model.onlyCompany"
                  true-value="true"
                  false-value="false"
                  type="is-info">
          仅限企业用户访问
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
  import {addApplication} from '@/api/backend/application'

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
        vm.$saveModel(addApplication, resp => {
          vm.$parent.succeed('应用保存成功', resp)
        }, err => {
          vm.$parent.fail('应用保存失败', err)
        })
      }
    }
  }
</script>
<style>

</style>
