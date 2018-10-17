<template>
  <section>

    <div class="columns">
      <div class="column">
        促销基本信息
      </div>
    </div>

    <b-field grouped group-multiline>
      <b-label class="label">促销名称：</b-label>
      <b-input v-model="model.contact" ></b-input>
    </b-field>

    <b-field grouped group-multiline>
      <b-label class="label">促销时间：</b-label>
      <b-datepicker
        placeholder=""
        :min-date="minDate"
        :max-date="maxDate">
      </b-datepicker> ~
      <b-datepicker
        placeholder=""
        :min-date="minDate"
        :max-date="maxDate">
      </b-datepicker>
    </b-field>

    <b-field grouped group-multiline>
      <b-label class="label">促销类型：</b-label>
      第N件商品M价
    </b-field>

    <b-field grouped group-multiline>
      <b-label class="label">促销状态：</b-label>
      <b-select placeholder="促销状态" v-model.trim="model.companyId">
        <option value="1">启用</option>
        <option value="2">停用</option>
      </b-select>
    </b-field>

    <div class="field">
      <b-checkbox>同时享受会员优惠</b-checkbox>
    </div>


    <button class="button is-primary" @click="save" :disabled='errors.any()'
            :class="{'is-loading' : saving}">
      <b-icon icon="check-circle"></b-icon>
      <span>保存</span>
    </button>
    <button class="button" @click="back">
      <b-icon icon="undo"></b-icon>
      <span>返回</span>
    </button>

  </section>
</template>
<script>
  import { addRecruitment} from '@/api/recruitment/recruitment';

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
        this.saveMode(vm, addRecruitment,() => vm.$router.push({ path: '/shop/recruitment' }));
      }
    }
  }
</script>
<style>

</style>
