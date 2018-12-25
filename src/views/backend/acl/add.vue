<template>
  <section>
    <div class="card">
      <div class="card-content">
        <jcc-field label="公司类型" horizontal class="required-field"
                   :type="errors.has('companyType') ? 'is-danger' : ''"
                   :message="errors.first('companyType')">
          <b-select name="companyType" expanded v-model="model.companyType"
                    v-validate="'required'" data-vv-as="公司类型" class="w-15">
            <option
              v-for="option in dictList(this, 'companyType')"
              :value="option.dictValue"
              :key="option.dictValue">
              {{ option.dictText }}
            </option>
          </b-select>
        </jcc-field>

        <jcc-field label="资源名称" horizontal class="required-field"
                   :type="errors.has('resourceName') ? 'is-danger' : ''"
                   :message="errors.first('resourceName')">
          <b-input name="resourceName" v-model="model.resourceName"
                   v-validate="'required|max:64|alpha_underscore'"
                   data-vv-as="资源名称" class="w-25"></b-input>
        </jcc-field>
        <jcc-field label="禁止访问?" class="field" horizontal message="设置为禁止访问后，对应的公司将不能访问该资源">
          <b-switch v-model="model.prohibited"
                    true-value="true"
                    false-value="false"
                    type="is-info">
            禁止
          </b-switch>
        </jcc-field>

        <jcc-field label="操作类型" horizontal class="required-field"
                   :type="errors.has('operateTypeArrayArray') ? 'is-danger' : ''"
                   :message="errors.first('operateTypeArray')">
          <b-field>
            <b-checkbox-button v-model="model.operateTypeArray"
                               native-value="1">
              读取
            </b-checkbox-button>
            <b-checkbox-button v-model="model.operateTypeArray"
                               native-value="2">
              新增
            </b-checkbox-button>
            <b-checkbox-button v-model="model.operateTypeArray"
                               native-value="4">
              修改
            </b-checkbox-button>

            <b-checkbox-button v-model="model.operateTypeArray"
                               native-value="8">
              删除
            </b-checkbox-button>
          </b-field>

        </jcc-field>

        <jcc-field label="比较字段" horizontal class="required-field" v-if="!prohibitedResource"
                   :type="errors.has('leftExpr') ? 'is-danger' : ''"
                   :message="errors.first('leftExpr')">
          <b-input name="leftExpr" v-model="model.leftExpr"
                   v-validate="'required|max:64|alpha_underscore'"
                   data-vv-as="比较字段" class="w-25"></b-input>
        </jcc-field>
        <jcc-field label="比较运算符" horizontal class="required-field"  v-if="!prohibitedResource"
                   :type="errors.has('exprType') ? 'is-danger' : ''"
                   :message="errors.first('exprType')">
          <b-select name="exprType" expanded v-model="model.exprType"
                    v-validate="'required'" data-vv-as="比较运算符" class="w-15">
            <option
              v-for="option in dictList(this, 'exprType')"
              :value="option.dictValue"
              :key="option.dictValue">
              {{ option.dictText }}
            </option>
          </b-select>
        </jcc-field>
        <jcc-field label="比较值" horizontal class="required-field" v-if="!prohibitedResource"
                   :type="errors.has('rightExprOption') ? 'is-danger' : ''"
                   :message="errors.first('rightExprOption')">
          <b-select name="rightExprOption" expanded v-model="model.rightExprOption"
                    v-validate="'required'" data-vv-as="比较值" class="w-15">
            <option value="-1">自定义</option>
            <option value="${user.userId}">本人</option>
            <option value="${user.companyId}">本公司</option>
          </b-select>
        </jcc-field>

        <jcc-field label="比较值" horizontal class="required-field" v-if="!prohibitedResource && model.rightExprOption == '-1'"
                   :type="errors.has('rightExpr') ? 'is-danger' : ''"
                   :message="errors.first('rightExpr')">
          <b-input name="rightExpr" v-model="model.rightExpr"
                   v-validate="'required|max:128'"
                   data-vv-as="比较值" class="w-25"></b-input>
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
  import {addAcl} from '@/api/backend/acl'
  import BField from 'buefy/src/components/field/Field'

  export default {
    components: {BField},
    data () {
      return {
        loading: false,
        saving: false,
        model: {
          operateTypeArray: []
        }
      }
    },
    computed: {
      prohibitedResource () {
        return this.model.prohibited && this.model.prohibited === 'true'
      }
    },
    methods: {
      back () {
        this.$router.back()
      },
      save () {
        const vm = this
        if (this.prohibitedResource) {
          delete this.model.leftExpr
          delete this.model.exprType
          delete this.model.rightExpr
        }
        let operateType = 0
        for (let i = 0; i < this.model.operateTypeArray.length; i++) {
          operateType += Number(this.model.operateTypeArray[i])
        }
        delete this.model.operateTypeArray
        this.model.operateType = operateType
        if (this.model.rightExprOption !== '-1') {
          this.model.rightExpr = this.model.rightExprOption
        }
        this.saveMode(vm, addAcl, () => vm.$router.push({path: '/backend/acl'}))
      }
    }
  }
</script>
<style>

</style>
