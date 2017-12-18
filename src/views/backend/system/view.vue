<template>
  <section class="columns">
    <div class="column is-half">
    <b-field label="系统标识符" class="static-field">
      <p class="control">
        {{model.sysIdentifier}}
      </p>
    </b-field>

    <b-field label="名称" class="static-field">
      <p class="control">
        {{model.name}}
      </p>
    </b-field>

    <b-field label="排序" class="static-field">
      <p class="control">
        {{model.sorted}}
      </p>
    </b-field>

    <b-field label="类型" class="static-field">
      <p class="control">
        {{ dictText("systemType",model.type) }}
      </p>
    </b-field>

    <b-field label="内部访问" class="static-field">
      <p class="control">
        <span class="tag is-info">
          {{ dictText("internal",model.internal) }}
          </span>
      </p>
    </b-field>

    <b-field><!-- Label left empty for spacing -->
      <p class="control">
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
