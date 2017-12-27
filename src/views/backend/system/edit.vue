<template>
  <section>
    <div class="card">
      <div class="card-content">
          <jcc-field label="标识符" horizontal class="static-field">
            <p class="control">
              {{model.sysIdentifier}}
            </p>
          </jcc-field>

          <!--horizontal使用:message="errors.first('sorted')
         "显示错误提示会导致元素向左便宜，垂直布局没这个问题，可以直接使用:message显示错误提示-->
          <jcc-field label="名称" horizontal
                   :type="errors.has('name') ? 'is-danger' : ''">
            <b-input name="name" v-model="model.name"
                     v-validate="'required|max:64'"  data-vv-as="名称"></b-input>
            <p class="help is-danger" v-show="errors.has('name')">
              {{errors.first('name')}}
            </p>
          </jcc-field>

          <jcc-field label="排序" horizontal :class="{'has-icons-right': errors.has('sorted') }"
                   :type="errors.has('sorted') ? 'is-danger' : ''">
            <b-input name="sorted" expanded v-model="model.sorted"
                     v-validate="'required|numeric|min_value:0|max_value:9999'"
                     data-vv-as="排序">
            </b-input>
            <p class="help is-danger" v-show="errors.has('sorted')">
              {{errors.first('sorted')}}
            </p>
          </jcc-field>

          <jcc-field  label="类型" horizontal class="static-field">
            <p class="control">
              {{ dictText("systemType",model.type) }}
            </p>
          </jcc-field>

          <jcc-field  label="内部访问" horizontal class="static-field">
            <p class="control">
            <span class="tag is-info">
              {{ dictText("internal",model.internal) }}
              </span>
            </p>
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
