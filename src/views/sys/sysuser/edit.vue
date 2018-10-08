<template>
  <section>
    <div class="card">
      <div class="card-content">
          <jcc-field label="编码" horizontal class="static-field">
            <p class="control">
              {{model.companyCode}}
            </p>
          </jcc-field>

        <jcc-field label="名称" horizontal
                   :type="errors.has('name') ? 'is-danger' : ''"
                   :message="errors.first('name')">
          <b-input name="name" v-model="model.name"
                   v-validate="'required|max:64'"  data-vv-as="名称" class="w-50"></b-input>
        </jcc-field>
        <jcc-field label="地址" horizontal
                   :type="errors.has('address') ? 'is-danger' : ''"
                   :message="errors.first('address')">
          <b-input name="address" v-model="model.address"
                   v-validate="'required|max:128'"  data-vv-as="地址" class="w-75"></b-input>
        </jcc-field>
        <jcc-field label="联系电话" horizontal
                   :type="errors.has('hotline') ? 'is-danger' : ''"
                   :message="errors.first('hotline')">
          <b-input name="hotline" v-model="model.hotline"
                   v-validate="'max:64'"  data-vv-as="联系电话" class="w-25"></b-input>
        </jcc-field>
        <jcc-field label="主页" horizontal
                   :type="errors.has('homepage') ? 'is-danger' : ''"
                   :message="errors.first('homepage')">
          <b-input name="homepage" v-model="model.homepage"
                   v-validate="'max:1024|url'"  data-vv-as="主页"></b-input>
        </jcc-field>
        <b-field horizontal><!-- Label left empty for spacing -->
          <p class="control btn_margin">
            <button class="button is-primary" @click="save" :disabled='errors.any()'
                    :class="{'is-loading' : saving}">
              <b-icon pack="fa" icon="check-circle"></b-icon>
              <span>保存</span>
            </button>
            <button class="button" @click="back">
              <b-icon pack="fa" icon="undo"></b-icon>
              <span>返回</span>
            </button>
          </p>
        </b-field>
        </div>
      </div>
    <b-loading :active.sync="loading"></b-loading>
  </section>
</template>
<script>
  import { get, update } from '@/api/sys/sysuser';
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
        vm.updateModel(vm, update, vm.$route.params.id, () => vm.$router.push({ path: '/company' }))
      }
    },
  created () {
    this.getModel(this, get, this.$route.params.id)
    }
  }
</script>
<style>

</style>
