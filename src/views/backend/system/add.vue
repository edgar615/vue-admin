<template>
  <section>
    <div class="form-modal-card-body">
      <b-field label="标识符" class="required-field"
               :type="errors.has('sysIdentifier') ? 'is-danger' : ''"
               :message="errors.first('sysIdentifier')">
        <b-input name="sysIdentifier" v-model="model.sysIdentifier"
                 v-validate="'required|max:64|alpha_underscore|remote:/system/idetifier-vertify'"
                 data-vv-as="标识符"></b-input>
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
                 v-validate="'required|numeric|min_value:0|max_value:9999'" data-vv-as="排序"
                >
        </b-input>
      </b-field>
      <b-field label="类型" class="required-field"
               :type="errors.has('type') ? 'is-danger' : ''"
               :message="errors.first('type')">
        <b-select name="type" expanded v-model="model.type"
                  v-validate="'required'" data-vv-as="类型">
          <option
              v-for="option in $dictList('systemType')"
              :value="option.dictValue"
              :key="option.dictValue">
            {{ option.dictText }}
          </option>
        </b-select>
      </b-field>
      <b-field class="field" message="内部访问的系统不对外公开，SP、SO均无法访问">
        <b-switch v-model="model.internal"
                  true-value="true"
                  false-value="false"
                  type="is-info">
          内部访问
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
  import {addSystem} from '@/api/backend/system'

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
        vm.$saveModel(addSystem, resp => {
          vm.$parent.succeed('子系统保存成功', resp)
        }, err => {
          vm.$parent.fail('子系统保存失败', err)
        })
      }
    }
  }
</script>
<style>

</style>
