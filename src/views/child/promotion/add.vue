<template>
    <section>
      <div class="card">
        <div class="card-content">
          <jcc-field label="活动名称" horizontal
                     :type="errors.has('name') ? 'is-danger' : ''"
                     :message="errors.first('name')">
            <b-input name="name" v-model="model.name"
                     v-validate="'required|max:64'"  data-vv-as="活动名称" class="w-50"></b-input>
          </jcc-field>
          <jcc-field label="活动地点" horizontal
                     :type="errors.has('address') ? 'is-danger' : ''"
                     :message="errors.first('address')">
            <b-input name="address" v-model="model.address"
                     v-validate="'required|max:128'"  data-vv-as="活动地点" class="w-75"></b-input>
          </jcc-field>
          <jcc-field label="活动时间" horizontal
                     :type="errors.has('timeDesc') ? 'is-danger' : ''"
                     :message="errors.first('timeDesc')">
            <b-input name="timeDesc" v-model="model.timeDesc"
                     v-validate="'max:64'"  data-vv-as="活动时间"></b-input>
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
        vm.saveMode(vm, "/v1/promotion",() => vm.$router.push({ path: '/child/promotion' }));
      }
    }
  }
</script>
<style>

</style>
