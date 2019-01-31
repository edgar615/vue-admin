<template>
  <section>
    <div class="form-modal-card-body">
      <b-field label="编码" class="static-field">
        <p class="control">
          {{model.companyCode}}
        </p>
      </b-field>

      <b-field label="名称" class="required-field"
                 :type="errors.has('name') ? 'is-danger' : ''"
                 :message="errors.first('name')">
        <b-input name="name" v-model="model.name"
                 v-validate="'required|max:64'"  data-vv-as="名称"></b-input>
      </b-field>
      <b-field label="地址" class="required-field"
                 :type="errors.has('address') ? 'is-danger' : ''"
                 :message="errors.first('address')">
        <b-input name="address" v-model="model.address"
                 v-validate="'required|max:128'"  data-vv-as="地址"></b-input>
      </b-field>
      <b-field label="联系电话"
                 :type="errors.has('hotline') ? 'is-danger' : ''"
                 :message="errors.first('hotline')">
        <b-input name="hotline" v-model="model.hotline"
                 v-validate="'max:64'"  data-vv-as="联系电话"></b-input>
      </b-field>
      <b-field label="主页"
                 :type="errors.has('homepage') ? 'is-danger' : ''"
                 :message="errors.first('homepage')">
        <b-input name="homepage" v-model="model.homepage"
                 v-validate="'max:1024|url'"  data-vv-as="主页"></b-input>
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
  import { update, get } from '@/api/company';
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
      save () {
        const vm = this
        vm.$updateModel(update, this.$parent.$props.props.companyId, resp => {
          vm.$parent.succeed('公司保存成功', resp)
        }, err => {
          vm.$parent.fail('公司保存失败', err)
        })
      }
    },
    created () {
      this.$parent.startLoading()
      this.$getModel(get, this.$parent.$props.props.companyId)
      .then(respone => {
        this.$parent.closeLoading()
      }).catch(err => {
        this.$parent.closeLoading()
        this.$parent.fail('公司查询失败', err)
      })
    }
  }
</script>
<style>

</style>
