<template>
    <section>
      <div class="card">
        <div class="card-content">
          <jcc-field label="医院名称" horizontal
                     :type="errors.has('name') ? 'is-danger' : ''"
                     :message="errors.first('name')">
            <b-input name="name" v-model="model.name"
                     v-validate="'required|max:64'"  data-vv-as="活动名称" class="w-50"></b-input>
          </jcc-field>
          <jcc-field label="医院简介" horizontal
                     :type="errors.has('hospitalBrief') ? 'is-danger' : ''"
                     :message="errors.first('hospitalBrief')">
            <b-input name="address" v-model="model.address"
                     v-validate="'required|max:200'"  data-vv-as="医院简介" class="w-75"></b-input>
          </jcc-field>
          <jcc-field label="图片列表" horizontal
                     :type="errors.has('pictures') ? 'is-danger' : ''"
                     :message="errors.first('pictures')">
            <b-input name="timeDesc" v-model="model.pictures"
                     v-validate="'max:64'"  data-vv-as="图片"></b-input>
          </jcc-field>
          <jcc-field label="科室简介" horizontal
                     :type="errors.has('deptBrief') ? 'is-danger' : ''"
                     :message="errors.first('deptBrief')">
            <b-input name="deptBrief" v-model="model.deptBrief"
                     v-validate="'required|max:1024'"  data-vv-as="科室简介" class="w-75"></b-input>
          </jcc-field>

          <jcc-field>
            <vue-html5-editor :content="content" :height="500"></vue-html5-editor>
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
  import JccField from "../../../components/field/Field";
  export default {
    components: {JccField}, data() {
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
        vm.saveMode(vm, "/infant/hospital",() => vm.$router.push({ path: '/child/promotion' }));
      }
    }
  }
</script>
<style>

</style>
