<template>
  <section class="columns">
    <div class="column is-half">
      <b-field label="标识符"
               :type="errors.has('sysIdentifier') ? 'is-danger' : ''" :message="errors.first('sysIdentifier')">
        <b-input name="sysIdentifier" v-model="model.sysIdentifier"
                 v-validate="'required|max:64|alpha_dash'"  data-vv-as="标识符"></b-input>
      </b-field>

      <b-field label="名称"
               :type="errors.has('name') ? 'is-danger' : ''" :message="errors.first('name')">
        <b-input name="name" v-model="model.name"
                 v-validate="'required|max:64'"  data-vv-as="名称"></b-input>
      </b-field>

      <b-field label="排序"  :class="{'has-icons-right': errors.has('sorted') }"
               :type="errors.has('sorted') ? 'is-danger' : ''" :message="errors.first('sorted')">
        <b-input name="sorted" expanded v-model="model.sorted"
                 v-validate="'required|numeric|min_value:0|max_value:9999'"  data-vv-as="排序">
        </b-input>
      </b-field>

      <b-field label="类型" class="static-field">
        <b-select name="type"  expanded  v-model="model.type">
          <option
            v-for="option in dictList('systemType')"
            :value="option.value"
            :key="option.value">
            {{ option.text }}
          </option>
        </b-select>
      </b-field>

      <b-field>
        <p class="control">
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
