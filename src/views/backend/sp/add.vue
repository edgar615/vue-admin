<template>
    <section>
      <div class="card">
        <div class="card-content">
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

          <jcc-field label="用户名" horizontal
                     :type="errors.has('username') ? 'is-danger' : ''"
                     :message="errors.first('username')">
            <b-input name="username" expanded v-model="model.username"
                     v-validate="'required|max:60|min:3|email|remote:/v1/sysuser/username-vertify'"  data-vv-as="用户名" class="w-25">
            </b-input>
          </jcc-field>
         <!--
         message可以直接使用数组，也可以实现的复杂一些
         :message="['6到20个字符，只能包含字母、数字和 \` \' ~ ! @ # $ % ^ & * ( ) - = _ + ; : , . / < > ?中的特殊符号', errors.first('password')]"-->
          <jcc-field label="密码" horizontal
                     :type="errors.has('password') ? 'is-danger' : ''"
                     :message="errors.has('password') ? errors.first('password') : '6到20个字符，只能包含字母、数字和 \` \' ~ ! @ # $ % ^ & * ( ) - = _ + ; : , . / < > ?中的特殊符号'"
                     >
            <b-input name="password" expanded v-model="model.password"
                     v-validate="'required|max:20|min:6|alpha_symbol'"  data-vv-as="密码" class="w-25"
                     type="password" password-reveal>
            </b-input>
          </jcc-field>
          <jcc-field label="确认密码" horizontal
                     :type="errors.has('confirmedPassword') ? 'is-danger' : ''"
                     :message="errors.first('confirmedPassword')"
          >
            <b-input name="confirmedPassword" expanded v-model="model.confirmedPassword"
                     v-validate="'required|confirmed:password'"  data-vv-as="确认密码" class="w-25"
                     type="confirmedPassword" password-reveal>
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
  import { addSp } from '@/api/backend/sp';
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
        vm.saveMode(vm, "/v1/sp",() => vm.$router.push({ path: '/backend/sp' }));
      }
    }
  }
</script>
<style>

</style>
