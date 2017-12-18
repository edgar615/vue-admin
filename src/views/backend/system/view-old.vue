<template>
  <section>

    <div class="columns">
      <div class="column is-half">
        <b-field horizontal label="系统标识符" class="static-field">
          <p class="control">
            {{model.sysIdentifier}}
          </p>
        </b-field>
      </div>
    </div>

    <div class="columns">
      <div class="column is-half">
        <b-field horizontal label="名称">
          <b-input name="name" expanded v-model="model.name"></b-input>
        </b-field>
      </div>
    </div>

    <div class="columns">
      <div class="column is-4">
        <b-field horizontal label="排序" class="static-field">
          <b-input name="sort" expanded v-model="model.sorted"></b-input>
        </b-field>
      </div>
    </div>

    <div class="columns">
      <div class="column is-half">
        <b-field horizontal label="类型" class="static-field">
          <b-input name="type" expanded  v-model="model.type"></b-input>
        </b-field>
      </div>
    </div>

    <b-field horizontal><!-- Label left empty for spacing -->
      <p class="control">
        <button class="button" @click="back">
          <b-icon icon="undo"></b-icon>
          <span>返回</span>
        </button>
      </p>
    </b-field>

  </section>
</template>
<script>
  import { getSystem } from '@/api/backend/system';
  export default {
    data() {
    return {
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
