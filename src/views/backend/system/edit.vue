<template>
  <section class="columns">
    <div class="column is-half">
      <b-field label="标识符" class="static-field">
        <p class="control">
          {{model.sysIdentifier}}
        </p>
      </b-field>

      <b-field label="名称"
               :type="errors.has('name') ? 'is-danger' : ''" :message="errors.first('name')">
        <b-input name="name" v-model="model.name"
                 v-validate="'required|max:64'"  data-vv-as="名称"></b-input>
      </b-field>

      <b-field label="排序"  :class="{'has-icons-right': errors.has('sorted') }"
               :type="errors.has('sorted') ? 'is-danger' : ''" :message="errors.first('sorted')">
        <b-input name="sorted" expanded v-model="model.sorted"
                 v-validate="'required|digits|min_value:0|max_value:9999'"
                 data-vv-as="排序">
        </b-input>
      </b-field>

      <b-field  label="类型" class="static-field">
        <p class="control">
          {{ dictText("systemType",model.type) }}
        </p>
      </b-field>

      <b-field  label="内部访问" class="static-field">
        <p class="control">
        <span class="tag is-info">
          {{ dictText("internal",model.internal) }}
          </span>
        </p>
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
    <b-loading :active.sync="loading"></b-loading>
  </section>
</template>
<script>
  import { getSystem, updateSystem } from '@/api/backend/system';
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
              updateSystem(vm.$route.params.id, this.model).then(response => {
                vm.saving = false;
                this.$router.push({ path: '/backend/system' })
              })
            }
          });
      }
    },
  created () {
      this.loadAsyncData();
    }
  }
</script>
<style>

</style>
