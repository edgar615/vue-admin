<template>
  <section>
    <div class="card">
      <div class="card-content">
        <b-field label="系统标识符" horizontal class="static-field">
          <p class="control">
            {{model.sysIdentifier}}
          </p>
        </b-field>

        <b-field label="名称" horizontal class="static-field">
          <p class="control">
            {{model.name}}
          </p>
        </b-field>

        <b-field label="排序" horizontal class="static-field">
          <p class="control">
            {{model.sorted}}
          </p>
        </b-field>

        <b-field label="类型" horizontal class="static-field">
          <p class="control">
            {{ dictText(this, "systemType",model.type) }}
          </p>
        </b-field>

        <jcc-meta-input :horizontal="true" :model="model" :meta="meta" v-for="meta in metadatas" :key="meta.metadataId"></jcc-meta-input>
        <b-field horizontal><!-- Label left empty for spacing -->
          <p class="control btn_margin">
            <button class="button is-primary" @click="onSave">
              <b-icon icon="check"></b-icon>
              <span>创建应用</span>
            </button>
          </p>
        </b-field>
      </div>
    </div>
    <b-loading :active.sync="loading"></b-loading>
  </section>
</template>
<script>
  import {getMeta} from "@/api/backend/system";
  import {saveApp} from "@/api/application";
  export default {
    props: {
      model: Object,
      systemId: String,
      companyCode: String
    },
    data() {
        return {
          loading: false,
          metadatas : []
        }
      },
    mounted() {
      // this.$validator.attach({ name: 'test', rules: {required:true}, alias:'测试'})
    },
      methods: {
          loadMeta() {
            const vm = this;
            getMeta(this.model.sysIdentifier).then(resp => {
              vm.metadatas = resp.data;
            })
          },
        onSave() {
            const vm = this;
            vm.$validator.validateAll().then((result) => {
              if (result) {
                vm.model.companyCode = vm.companyCode
                saveApp(vm.model).then(resp => {
                  vm.saving = true
                  vm.$emit('onCreateApp', resp.data.result)
                }).catch(err =>{
                    vm.saving = false;
                  })
              }
            });

          }
        },
      watch: {
          systemId: function (newSystemId) {
            if (newSystemId != -1) {
              this.loadMeta();
            }
        }
    }
  }
</script>
<style>

</style>
