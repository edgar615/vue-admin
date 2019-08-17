<template>
  <section>
    <div class="form-modal-card-body">
      <b-field label="用户名" class="required-field"
               :type="errors.has('username') ? 'is-danger' : ''"
               :message="errors.first('username')">
        <b-input name="username" expanded v-model="model.username"
                 v-validate="'required|max:60|min:3|alpha_underscore|remote:/user/username-vertify'"  data-vv-as="用户名">
        </b-input>
      </b-field>
      <b-field label="手机号" class="required-field"
               :type="errors.has('username') ? 'is-danger' : ''"
               :message="errors.first('username')">
        <b-input name="username" expanded v-model="model.username"
                 v-validate="'required|max:60|min:3|alpha_underscore|remote:/user/username-vertify'"  data-vv-as="用户名">
        </b-input>
      </b-field>
      <b-field label="姓名" class="required-field"
               :type="errors.has('fullname') ? 'is-danger' : ''"
               :message="errors.first('fullname')">
        <b-input name="fullname" v-model="model.fullname"
                 v-validate="'required|max:32'"  data-vv-as="姓名"></b-input>
      </b-field>
      <b-field label="密码" class="required-field"
               :type="errors.has('password') ? 'is-danger' : ''"
               :message="errors.has('password') ? errors.first('password') : '6到20个字符，只能包含字母、数字和 \` \' ~ ! @ # $ % ^ & * ( ) - = _ + ; : , . / < > ?中的特殊符号'"
      >
        <b-input name="password" expanded v-model="model.password"
                 v-validate="'required|max:20|min:6|alpha_symbol'"  data-vv-as="密码"
                 type="password" password-reveal>
        </b-input>
      </b-field>
      <b-field label="再次输入密码" class="required-field"
               :type="errors.has('confirmedPassword') ? 'is-danger' : ''"
               :message="errors.first('confirmedPassword')"
      >
        <b-input name="confirmedPassword" expanded v-model="model.confirmedPassword"
                 v-validate="'required|confirmed:password'"  data-vv-as="再次输入密码"
                 type="password" password-reveal>
        </b-input>
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
  import { save } from '@/api/user/user';

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
        vm.$saveModel(save, resp => {
          vm.$parent.succeed('用户保存成功', resp)
        }, err => {
          vm.$parent.fail('用户保存失败', err)
        })
      }
    }
  }
</script>
