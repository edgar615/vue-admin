<template>
    <section>
      <div class="card">
        <div class="card-content">
          <jcc-field label="类型" horizontal
                     :type="errors.has('type') ? 'is-danger' : ''"
                     :message="errors.first('type')">
            <b-select name="type"  expanded  v-model="model.type"
                      v-validate="'required'" data-vv-as="类型" class="w-15">
              <option
                v-for="option in dictList(this, 'metadataType')"
                :value="option.value"
                :key="option.value">
                {{ option.text }}
              </option>
            </b-select>
          </jcc-field>
          <jcc-field label="类目" horizontal
                     :type="errors.has('category') ? 'is-danger' : ''"
                     :message="errors.first('category')">
            <b-input name="category" v-model="model.category"
                     v-validate="'required|max:64'"  data-vv-as="类目" class="w-50"></b-input>
          </jcc-field>
          <jcc-field label="亚类" horizontal
                     :type="errors.has('subcategory') ? 'is-danger' : ''"
                     :message="errors.first('subcategory')">
            <b-input name="subcategory" v-model="model.subcategory"
                     v-validate="'required|max:64'"  data-vv-as="亚类" class="w-50"></b-input>
          </jcc-field>
          <jcc-field label="名称" horizontal
                     :type="errors.has('name') ? 'is-danger' : ''"
                     :message="errors.first('name')">
            <b-input name="name" v-model="model.name"
                     v-validate="'required|max:64'"  data-vv-as="名称" class="w-50"></b-input>
          </jcc-field>
          <jcc-field label="别名" horizontal
                     :type="errors.has('alias') ? 'is-danger' : ''"
                     :message="errors.first('alias')">
            <b-input name="alias" v-model="model.alias"
                     v-validate="'required|max:128'"  data-vv-as="别名" class="w-50"></b-input>
          </jcc-field>
          <jcc-field class="field" horizontal message="必填项">
            <b-switch v-model="model.required"
                      true-value="true"
                      false-value="false"
                      type="is-info">
              必填项
            </b-switch>
          </jcc-field>
          <jcc-field class="field" horizontal message="不可变值">
            <b-switch v-model="model.immutable"
                      true-value="true"
                      false-value="false"
                      type="is-info">
              不可变值
            </b-switch>
          </jcc-field>
          <jcc-field class="field" horizontal message="唯一性">
            <b-switch v-model="model.uniqueValue"
                      true-value="true"
                      false-value="false"
                      type="is-info">
              唯一性
            </b-switch>
          </jcc-field>
          <jcc-field label="默认值" horizontal
                     :type="errors.has('defaultValue') ? 'is-danger' : ''"
                     :message="errors.first('defaultValue')">
            <b-input name="defaultValue" v-model="model.defaultValue"
                      data-vv-as="默认值" class="w-50"></b-input>
          </jcc-field>
          <jcc-field label="最小值" horizontal  v-show="model.type == 1"
                     :type="errors.has('minValue') ? 'is-danger' : ''"
                     :message="errors.first('minValue')">
            <b-input name="minValue" expanded v-model="model.minValue"
                     v-validate="'numeric'"  data-vv-as="最小值" class="w-25">
            </b-input>
          </jcc-field>
          <jcc-field label="最大值" horizontal  v-show="model.type == 1"
                     :type="errors.has('maxValue') ? 'is-danger' : ''"
                     :message="errors.first('maxValue')">
            <b-input name="maxValue" expanded v-model="model.maxValue"
                     v-validate="'numeric'"  data-vv-as="最大值" class="w-25">
            </b-input>
          </jcc-field>
          <jcc-field label="最小长度" horizontal v-show="model.type == 2"
                     :type="errors.has('minLength') ? 'is-danger' : ''"
                     :message="errors.first('minLength')">
            <b-input name="minLength" expanded v-model="model.minLength"
                     v-validate="'numeric'"  data-vv-as="最小长度" class="w-25">
            </b-input>
          </jcc-field>
          <jcc-field label="最大长度" horizontal  v-show="model.type == 2"
                     :type="errors.has('maxLength') ? 'is-danger' : ''"
                     :message="errors.first('maxLength')">
            <b-input name="maxLength" expanded v-model="model.maxLength"
                     v-validate="'numeric'"  data-vv-as="最大长度" class="w-25">
            </b-input>
          </jcc-field>
          <jcc-field label="正则表达式" horizontal
                     :type="errors.has('regex') ? 'is-danger' : ''"
                     :message="errors.first('regex')">
            <b-input name="regex" v-model="model.regex"
                     data-vv-as="正则表达式" class="w-50"></b-input>
          </jcc-field>
          <jcc-field label="可能的值" horizontal
                     :type="errors.has('possibleValues') ? 'is-danger' : ''"
                     :message="['多个值用,分隔',errors.first('possibleValues')]">
            <b-input name="possibleValues" v-model="model.possibleValues"
                     data-vv-as="可能的值" class="w-75"></b-input>
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
  import { save } from '@/api/backend/meta';
  export default {
    data() {
    return {
      loading: false,
      saving: false,
      model: {
      }
    }
  },
  methods: {
      back() {
        this.$router.back();
      },
      save() {
          const vm = this
        vm.saveMode(vm, save,() => vm.$router.push({ path: '/backend/meta' }));
      }
    }
  }
</script>
<style>

</style>
