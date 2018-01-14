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

        <b-field :label="meta.alias" horizontal class="static-field" v-for="meta in metadatas" :key="meta.metadataId">
          <p class="control">
            {{model[meta.name]}}
          </p>
        </b-field>
      </div>
    </div>
    <b-loading :active.sync="loading"></b-loading>
  </section>
</template>
<script>
  import {getMeta} from "@/api/backend/system";
  import {getApp} from '@/api/application'
  export default {
    props: {
      applicationId: String
    },
    data() {
        return {
          model: {},
          metadatas : []
        }
      },
    mounted() {
      // this.$validator.attach({ name: 'test', rules: {required:true}, alias:'测试'})
    },
      methods: {
          loadApplication() {
            const vm = this;
            getApp(vm.applicationId).then(appResp=> {
              vm.model = appResp.data;
              getMeta(appResp.data.sysIdentifier).then(metaResp => {
                vm.metadatas = metaResp.data;
              })
            })
          },
        },
      watch: {
        applicationId: function (newApplicationId) {
            if (newApplicationId != -1) {
              this.loadApplication();
            }
        }
    }
  }
</script>
<style>

</style>
