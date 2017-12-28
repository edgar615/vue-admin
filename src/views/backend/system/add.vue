<template>
    <section>
      <div class="card">
        <div class="card-content">
          <!--horizontal使用:message="errors.first('sorted')
        "显示错误提示会导致元素向左便宜，垂直布局没这个问题，可以直接使用:message显示错误提示-->
          <jcc-field label="标识符" horizontal
                     :type="errors.has('sysIdentifier') ? 'is-danger' : ''"
                     :message="errors.first('sysIdentifier')">
            <b-input name="sysIdentifier" v-model="model.sysIdentifier"
                     v-validate="'required|max:64|alpha_dash'"  data-vv-as="标识符"></b-input>
          </jcc-field>

          <jcc-field label="名称" horizontal
                     :type="errors.has('name') ? 'is-danger' : ''"
                     :message="errors.first('name')">
            <b-input name="name" v-model="model.name"
                     v-validate="'required|max:64'"  data-vv-as="名称"></b-input>
          </jcc-field>

          <jcc-field label="排序" horizontal
                     :type="errors.has('sorted') ? 'is-danger' : ''"
                     :message="errors.first('sorted')">
            <b-input name="sorted" expanded v-model="model.sorted"
                     v-validate="'required|numeric|min_value:0|max_value:9999'"  data-vv-as="排序">
            </b-input>
          </jcc-field>
          <jcc-field label="类型" horizontal
                     :type="errors.has('type') ? 'is-danger' : ''"
                     :message="errors.first('type')">
            <b-select name="type"  expanded  v-model="model.type"
                      v-validate="'required'" data-vv-as="类型">
              <option
                v-for="option in dictList('systemType')"
                :value="option.value"
                :key="option.value">
                {{ option.text }}
              </option>
            </b-select>
          </jcc-field>
          <b-field horizontal><!-- Label left empty for spacing -->
            <p class="control btn_margin">
              <button class="button is-primary" @click="save" :disabled='errors.any()'
                      :class="{'is-loading' : saving}">
                <b-icon icon="check-circle"></b-icon>
                <span>保存</span>
              </button>
              <button class="button is-primary" @click="back">
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
  import { addSystem } from '@/api/backend/system';
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
    loadAsyncData() {
      this.loading = true
      getSystem(this.$route.params.id).then(response => {
        this.model = response.data;
        this.loading = false;
      });
    },
      dictText(name, value) {
        return this.$store.getters.dictText(name, value);
      },
      dictList(name) {
        return this.$store.getters.dictList(name);
      },
      back() {
        this.$router.back();
      },
      save() {
          const vm = this
          this.$validator.validateAll().then((result) => {
              if (result) {
              vm.saving = true
              addSystem(this.model).then(response => {
                vm.saving = false;
                this.$router.push({ path: '/backend/system' })
              }).catch(err =>{
                  vm.saving = false;
              })
            }
          });
      }
    }
  }
</script>
<style>

</style>
