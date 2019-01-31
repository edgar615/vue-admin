<template>
    <section>
      <div class="form-modal-card-body">
        <b-field label="类型"
                   :type="errors.has('type') ? 'is-danger' : ''"
                   :message="errors.first('type')">
          <b-select name="type"  expanded  v-model="model.type"
                    v-validate="'required'" data-vv-as="类型">
            <option
                v-for="option in $dictList('companyType')"
                :value="option.dictValue"
                :key="option.dictValue">
              {{ option.dictText }}
            </option>
          </b-select>
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

        <b-field label="管理员用户名" class="required-field"
                   :type="errors.has('username') ? 'is-danger' : ''"
                   :message="errors.first('username')">
          <b-input name="username" expanded v-model="model.username"
                   v-validate="'required|max:60|min:3|alpha_underscore|remote:/sysuser/username-vertify'"  data-vv-as="用户名">
          </b-input>
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
  import { save } from '@/api/company';
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
        vm.$saveModel(save, resp => {
          vm.$parent.succeed('子系统保存成功', resp)
        }, err => {
          vm.$parent.fail('子系统保存失败', err)
        })
      }
    }
  }
</script>
<style>

</style>
