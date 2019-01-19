<template>
  <section>
    <div class="form-modal-card-body">
      <b-field label="公司类型" class="required-field"
               :type="errors.has('companyType') ? 'is-danger' : ''"
               :message="errors.first('companyType')">
        <b-select name="companyType" expanded v-model="model.companyType"
                  v-validate="'required'" data-vv-as="公司类型">
          <option
              v-for="option in $dictList(this, 'companyType')"
              :value="option.dictValue"
              :key="option.dictValue">
            {{ option.dictText }}
          </option>
        </b-select>
      </b-field>

      <b-field label="资源名称" class="required-field"
               :type="errors.has('resourceName') ? 'is-danger' : ''"
               :message="errors.first('resourceName')">
        <b-input name="resourceName" v-model="model.resourceName"
                 v-validate="'required|max:64|alpha_underscore'"
                 data-vv-as="资源名称"></b-input>
      </b-field>
      <b-field label="禁止访问?" class="field" message="设置为禁止访问后，对应的公司将不能访问该资源">
        <b-switch v-model="model.prohibited"
                  true-value="true"
                  false-value="false"
                  type="is-info">
          禁止
        </b-switch>
      </b-field>

      <b-field label="操作类型" class="required-field"
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

      </b-field>

      <b-field label="比较字段" class="required-field" v-if="!prohibitedResource"
               :type="errors.has('leftExpr') ? 'is-danger' : ''"
               :message="errors.first('leftExpr')">
        <b-input name="leftExpr" v-model="model.leftExpr"
                 v-validate="'required|max:64|alpha_underscore'"
                 data-vv-as="比较字段"></b-input>
      </b-field>
      <b-field label="比较运算符" class="required-field"  v-if="!prohibitedResource"
               :type="errors.has('exprType') ? 'is-danger' : ''"
               :message="errors.first('exprType')">
        <b-select name="exprType" expanded v-model="model.exprType"
                  v-validate="'required'" data-vv-as="比较运算符">
          <option
              v-for="option in $dictList(this, 'exprType')"
              :value="option.dictValue"
              :key="option.dictValue">
            {{ option.dictText }}
          </option>
        </b-select>
      </b-field>
      <b-field label="比较值" class="required-field" v-if="!prohibitedResource"
               :type="errors.has('rightExprOption') ? 'is-danger' : ''"
               :message="errors.first('rightExprOption')">
        <b-select name="rightExprOption" expanded v-model="model.rightExprOption"
                  v-validate="'required'" data-vv-as="比较值">
          <option value="-1">自定义</option>
          <option value="${user.userId}">本人</option>
          <option value="${user.companyId}">本公司</option>
        </b-select>
      </b-field>

      <b-field label="比较值" class="required-field" v-if="!prohibitedResource && model.rightExprOption == '-1'"
               :type="errors.has('rightExpr') ? 'is-danger' : ''"
               :message="errors.first('rightExpr')">
        <b-input name="rightExpr" v-model="model.rightExpr"
                 v-validate="'required|max:128'"
                 data-vv-as="比较值"></b-input>
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
        vm.$saveModel(vm, addAcl, resp => {
          vm.$parent.succeed('ACL保存成功', resp)
        }, err => {
          vm.$parent.fail('ACL保存失败', err)
        })
      }
    }
  }
</script>
<style>

</style>
