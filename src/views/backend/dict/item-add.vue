<template>
  <section>
    <div class="form-modal-card-body">
      <b-field label="字典文本" class="required-field"
                 :type="errors.has('dictText') ? 'is-danger' : ''"
                 :message="errors.first('dictText')">
        <b-input name="dictText" v-model="model.dictText"
                 v-validate="'required|max:64'"
                 data-vv-as="字典文本"></b-input>
      </b-field>

      <b-field label="字典值" class="required-field"
                 :type="errors.has('dictValue') ? 'is-danger' : ''"
                 :message="errors.first('dictValue')">
        <b-input name="dictValue" v-model="model.dictValue"
                 v-validate="'required|numeric'" data-vv-as="字典值"></b-input>
      </b-field>

      <b-field label="排序" class="required-field"
                 :type="errors.has('sorted') ? 'is-danger' : ''"
                 :message="errors.first('sorted')">
        <b-input name="sorted" expanded v-model="model.sorted"
                 v-validate="'required|numeric|min_value:0|max_value:99999'" data-vv-as="排序"
                >
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
  import {addItem} from '@/api/backend/dict'

  export default {
    data () {
      return {
        loading: false,
        saving: false,
        model: {
          dictId: this.$route.params.id
        }
      }
    },
    methods: {
      save () {
        const vm = this
        vm.$saveModel(vm, addItem, () => {
          vm.$parent.succeed({message: '字典子项保存成功'})
        }).catch(err => {
          vm.$parent.failed({message: '字典子项保存失败'})
        })
      }
    },
    created () {
    }
  }
</script>
<style>

</style>
