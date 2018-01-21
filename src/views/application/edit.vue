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

        <jcc-meta-input :model="model" :meta="meta" v-for="meta in metadatas" :key="meta.metadataId"
                        :horizontal="true" ></jcc-meta-input>
        <b-field horizontal><!-- Label left empty for spacing -->
          <p class="control btn_margin">
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
  import {getMeta} from "@/api/backend/system";
  import {getApp} from '@/api/application'
  export default {
    data() {
        return {
          loading:false,
          model: {},
          metadatas : []
        }
      },
    mounted() {
      // this.$validator.attach({ name: 'test', rules: {required:true}, alias:'测试'})
    },
      methods: {
        back() {
          this.$router.back();
        },
          loadApplication() {
            const vm = this;
            vm.loading = true;
            getApp(vm.$route.params.id).then(appResp=> {
              vm.model = appResp.data;
              getMeta(appResp.data.sysIdentifier).then(metaResp => {
                vm.metadatas = metaResp.data;
                vm.loading = false;
              })
            })
          },
        },
      created() {
      this.loadApplication()
    }
  }
</script>
<style>

</style>
