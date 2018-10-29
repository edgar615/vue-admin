<template>
  <section>
    <div class="card">
      <div class="card-content">
        <jcc-field label="字典编码" horizontal class="required-field"
                   :type="errors.has('dictCode') ? 'is-danger' : ''"
                   :message="errors.first('dictCode')">
          <b-input name="dictCode" v-model="model.dictCode"
                   v-validate="'required|max:64|alpha_underscore|remote:/dict/code-vertify'"
                   data-vv-as="字典编码" class="w-25"></b-input>
        </jcc-field>

        <jcc-field label="名称" horizontal class="required-field"
                   :type="errors.has('name') ? 'is-danger' : ''"
                   :message="errors.first('name')">
          <b-input name="name" v-model="model.name"
                   v-validate="'required|max:64'" data-vv-as="名称" class="w-25"></b-input>
        </jcc-field>

        <jcc-field label="默认值" horizontal  class="required-field"
                   :type="errors.has('defaultValue') ? 'is-danger' : ''"
                   :message="errors.first('defaultValue')">
          <b-input name="defaultValue" v-model="model.defaultValue"
                   v-validate="'required|max:32'" data-vv-as="默认值" class="w-25"></b-input>
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
      back () {
        this.$router.back()
      },
      save () {
        const vm = this
        this.saveMode(vm, addDict, () => vm.$router.push({path: '/backend/dict'}))
      }
    }
  }
</script>
<style>

</style>
