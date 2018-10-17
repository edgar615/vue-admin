<template>
  <section>
    <div class="card">
      <div class="card-content">
        <jcc-field label="字典文本" horizontal
                   :type="errors.has('dictText') ? 'is-danger' : ''"
                   :message="errors.first('dictText')">
          <b-input name="dictText" v-model="model.dictText"
                   v-validate="'required|max:64'"
                   data-vv-as="字典文本" class="w-25"></b-input>
        </jcc-field>

        <jcc-field label="字典值" horizontal
                   :type="errors.has('dictValue') ? 'is-danger' : ''"
                   :message="errors.first('dictValue')">
          <b-input name="dictValue" v-model="model.dictValue"
                   v-validate="'required|numeric'" data-vv-as="字典值" class="w-25"></b-input>
        </jcc-field>

        <jcc-field label="排序" horizontal
                   :type="errors.has('sorted') ? 'is-danger' : ''"
                   :message="errors.first('sorted')">
          <b-input name="sorted" expanded v-model="model.sorted"
                   v-validate="'required|numeric|min_value:0|max_value:9999'" data-vv-as="排序"
                   class="w-25">
          </b-input>
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
      back () {
        this.$router.back()
      },
      save () {
        const vm = this
        this.saveMode(vm, addItem, () => vm.$router.push({path: '/backend/dict/' + this.$route.params.id + '/items'}))
      }
    }
  }
</script>
<style>

</style>
