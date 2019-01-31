<template>
  <section>
    <div class="card">
      <div class="card-content">
        <jcc-field label="旧的登录密码" horizontal
                   :type="errors.has('oldPassword') ? 'is-danger' : ''"
                   :message="errors.has('oldPassword') ? errors.first('oldPassword') : '6到20个字符，只能包含字母、数字和 \` \' ~ ! @ # $ % ^ & * ( ) - = _ + ; : , . / < > ?中的特殊符号'"
        >
          <b-input name="oldPassword" expanded v-model="model.oldPassword"
                   v-validate="'required|max:20|min:6|alpha_symbol'"  data-vv-as="旧的登录密码" class="w-25"
                   type="password" password-reveal>
          </b-input>
        </jcc-field>
        <jcc-field label="新密码" horizontal
                   :type="errors.has('password') ? 'is-danger' : ''"
                   :message="errors.has('password') ? errors.first('password') : '6到20个字符，只能包含字母、数字和 \` \' ~ ! @ # $ % ^ & * ( ) - = _ + ; : , . / < > ?中的特殊符号'"
        >
          <b-input name="password" expanded v-model="model.password"
                   v-validate="'required|max:20|min:6|alpha_symbol'"  data-vv-as="密码" class="w-25"
                   type="password" password-reveal>
          </b-input>
        </jcc-field>
        <jcc-field label="再次输入新密码" horizontal
                   :type="errors.has('confirmedPassword') ? 'is-danger' : ''"
                   :message="errors.first('confirmedPassword')"
        >
          <b-input name="confirmedPassword" expanded v-model="model.confirmedPassword"
                   v-validate="'required|confirmed:password'"  data-vv-as="确认密码" class="w-25"
                   type="password" password-reveal>
          </b-input>
        </jcc-field>

        <b-field horizontal><!-- Label left empty for spacing -->
          <p class="control btn_margin">
            <button class="button is-primary" @click="save" :disabled='errors.any()'
                    :class="{'is-loading' : saving}">
              <b-icon icon="check-circle"></b-icon>
              <span>修改密码</span>
            </button>
          </p>
        </b-field>
      </div>
    </div>
  </section>
</template>
<script>
  import {changePwd} from '@/api/profile'
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
      save() {
        const vm = this
        changePwd(vm.model).then(() => {
          vm.$successToast("密码修改成功");
          vm.model = {}
        })
      }
    }
  }
</script>
<style>

</style>
