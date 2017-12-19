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
            {{ dictText("systemType",model.type) }}
          </p>
        </b-field>

        <b-field label="内部访问" horizontal  class="static-field">
          <p class="control">
        <span class="tag is-info">
          {{ dictText("internal",model.internal) }}
          </span>
          </p>
        </b-field>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item">
          <button class="button" @click="back">
            <b-icon icon="undo"></b-icon>
            <span>返回</span>
          </button>
            </p>
      </footer>
    </div>
    <b-loading :active.sync="loading"></b-loading>
  </section>
</template>
<script>
  import { getSystem } from '@/api/backend/system';
  export default {
    data() {
    return {
      loading: false,
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
      back() {
        this.$router.back();
      }
    },
  created () {
      this.loadAsyncData();
    }
  }
</script>
<style>

</style>
