<template>
  <section>
    <div class="form-modal-card-body">
      <b-field label="类型"
               :type="errors.has('type') ? 'is-danger' : ''"
               :message="errors.first('type')">
        <b-select name="type" expanded v-model="model.type"
                  v-validate="'required'" data-vv-as="类型">
          <option
              v-for="option in $dictList('attributeType')"
              :value="option.dictValue"
              :key="option.dictValue">
            {{ option.dictText }}
          </option>
        </b-select>
      </b-field>
      <b-field label="名称"
               :type="errors.has('name') ? 'is-danger' : ''"
               :message="['数据库中存储值',errors.first('name')]">
        <b-input name="name" v-model="model.name"
                 v-validate="'required|max:64'" data-vv-as="名称"></b-input>
      </b-field>
      <b-field label="中文名称"
               :type="errors.has('alias') ? 'is-danger' : ''"
               :message="['界面上的显示值',errors.first('alias')]">
        <b-input name="alias" v-model="model.alias"
                 v-validate="'required|max:128'" data-vv-as="别名"></b-input>
      </b-field>
      <b-field class="field" message="能够唯一确定产品的属性，是必填项。通过类目的关键属性组合就确定唯一的产品，例如手机的品牌、型号属于关键属性">
        <b-switch v-model="model.keyAttr"
                  true-value="true"
                  false-value="false"
                  type="is-info">
          关键属性
        </b-switch>
      </b-field>
      <b-field class="field" message="组成SKU的规格属性">
        <b-switch v-model="model.specAttr"
                  true-value="true"
                  false-value="false"
                  type="is-info">
          规格属性
        </b-switch>
      </b-field>
      <b-field class="field" message="可以用作前台商品的搜索条件">
        <b-switch v-model="model.filterAttr"
                  true-value="true"
                  false-value="false"
                  type="is-info">
          筛选属性
        </b-switch>
      </b-field>
      <b-field class="field">
        <b-switch v-model="model.required"
                  true-value="true"
                  false-value="false"
                  type="is-info">
          必填项
        </b-switch>
      </b-field>
      <b-field class="field">
        <b-switch v-model="model.immutable"
                  true-value="true"
                  false-value="false"
                  type="is-info">
          不可变值
        </b-switch>
      </b-field>
      <b-field label="默认值"
               :type="errors.has('defaultValue') ? 'is-danger' : ''"
               :message="errors.first('defaultValue')">
        <b-input name="defaultValue" v-model="model.defaultValue"
                 data-vv-as="默认值"></b-input>
      </b-field>
      <b-field label="最小值" v-show="model.type == 1"
               :type="errors.has('minValue') ? 'is-danger' : ''"
               :message="errors.first('minValue')">
        <b-input name="minValue" expanded v-model="model.minValue"
                 v-validate="'numeric'" data-vv-as="最小值">
        </b-input>
      </b-field>
      <b-field label="最大值" v-show="model.type == 1"
               :type="errors.has('maxValue') ? 'is-danger' : ''"
               :message="errors.first('maxValue')">
        <b-input name="maxValue" expanded v-model="model.maxValue"
                 v-validate="'numeric'" data-vv-as="最大值">
        </b-input>
      </b-field>
      <b-field label="最小长度" v-show="model.type == 2"
               :type="errors.has('minLength') ? 'is-danger' : ''"
               :message="errors.first('minLength')">
        <b-input name="minLength" expanded v-model="model.minLength"
                 v-validate="'numeric'" data-vv-as="最小长度">
        </b-input>
      </b-field>
      <b-field label="最大长度" v-show="model.type == 2"
               :type="errors.has('maxLength') ? 'is-danger' : ''"
               :message="errors.first('maxLength')">
        <b-input name="maxLength" expanded v-model="model.maxLength"
                 v-validate="'numeric'" data-vv-as="最大长度">
        </b-input>
      </b-field>
      <b-field label="正则表达式" v-show="model.type == 2"
               :type="errors.has('regex') ? 'is-danger' : ''"
               :message="errors.first('regex')">
        <b-input name="regex" v-model="model.regex"
                 data-vv-as="正则表达式"></b-input>
      </b-field>
      <b-field label="可能的值" v-show="model.type == 1 || model.type == 2"
               :type="errors.has('possibleValues') ? 'is-danger' : ''"
               :message="['多个值用,分隔',errors.first('possibleValues')]">
        <b-input name="possibleValues" v-model="model.possibleValues"
                 data-vv-as="可能的值"></b-input>
      </b-field>
      <b-field label="选项列表" v-show="model.type == 5 || model.type == 6">
        <button class="button" @click="addOption">新增选项</button>
      </b-field>
      <b-table v-show="model.type == 5 || model.type == 6"
          striped
          hoverable
          narrowed
          mobile-cards
          :data="(model.options && model.options.length == 0) ? [] : model.options"
      >

        <template slot-scope="props">

          <b-table-column field="value" label="选项值">
            <b-field class="required-field"
                     :type="errors.has('option_value' + props.index) ? 'is-danger' : ''"
                     :message="errors.first('option_value' + props.index)">
              <b-input v-model.trim="props.row.value" type="text"
                       :name="'option_value' + props.index" v-validate="'required'" data-vv-as="选项值"></b-input>
            </b-field>
          </b-table-column>
          <b-table-column field="text" label="选项文本">
            <b-field class="required-field"
                       :type="errors.has('option_text' + props.index) ? 'is-danger' : ''"
                       :message="errors.first('option_text' + props.index)">
              <b-input v-model.trim="props.row.text" type="text"
                       :name="'option_text' + props.index" v-validate="'required'" data-vv-as="选项文本"></b-input>
            </b-field>
          </b-table-column>

          <b-table-column label="操作">
            <a @click="deleteOptions(props.index)">
              删除
            </a>
          </b-table-column>
        </template>
      </b-table>
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
        }
      }
    },
    methods: {
      addOption() {
        if (this.model.options) {
          this.model.options.push({})
        } else {
          this.model.options = [{}]
        }
      },
      deleteOptions(index) {
        if (this.model.options) {
          this.model.options.splice(index, 1)
        }
      },
      save() {
        const vm = this
        vm.$saveModel(addAttr, resp => {
          vm.$parent.succeed('属性保存成功', resp)
        }, err => {
          vm.$parent.fail('属性保存失败', err)
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
