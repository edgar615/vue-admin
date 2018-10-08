<template>
    <section>
      <div class="card">
        <div class="card-content">

          <jcc-field label="用户名" horizontal
                     :type="errors.has('username') ? 'is-danger' : ''"
                     :message="errors.first('username')">
            <b-input name="username" expanded v-model="model.username"
                     v-validate="'required|max:60|min:3|email|remote:/sysuser/username-vertify'"  data-vv-as="用户名" class="w-25">
            </b-input>
          </jcc-field>
          <jcc-field label="姓名" horizontal
                     :type="errors.has('fullname') ? 'is-danger' : ''"
                     :message="errors.first('fullname')">
            <b-input name="fullname" v-model="model.fullname"
                     v-validate="'required|max:32'"  data-vv-as="姓名" class="w-25"></b-input>
          </jcc-field>
          <jcc-field label="密码" horizontal
                     :type="errors.has('password') ? 'is-danger' : ''"
                     :message="errors.has('password') ? errors.first('password') : '6到20个字符，只能包含字母、数字和 \` \' ~ ! @ # $ % ^ & * ( ) - = _ + ; : , . / < > ?中的特殊符号'"
                     >
            <b-input name="password" expanded v-model="model.password"
                     v-validate="'required|max:20|min:6|alpha_symbol'"  data-vv-as="密码" class="w-25"
                     type="password" password-reveal>
            </b-input>
          </jcc-field>
          <jcc-field label="再次输入密码" horizontal
                     :type="errors.has('confirmedPassword') ? 'is-danger' : ''"
                     :message="errors.first('confirmedPassword')"
          >
            <b-input name="confirmedPassword" expanded v-model="model.confirmedPassword"
                     v-validate="'required|confirmed:password'"  data-vv-as="再次输入密码" class="w-25"
                     type="password" password-reveal>
            </b-input>
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
    </section>
</template>
<script>
  import { save } from '@/api/sys/sysuser';
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
        vm.saveMode(vm, save,() => vm.$router.push({ path: '/sys/sysuser' }));
      }
    }
  }
</script>
<style>

</style>
