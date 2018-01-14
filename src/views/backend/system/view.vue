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

        <b-field label="内部访问" horizontal  class="static-field">
          <p class="control">
        <span class="tag is-info">
          {{ dictText(this, "internal",model.internal) }}
          </span>
          </p>
        </b-field>
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
  export default {
    data() {
    return {
      loading: false,
      model: {
      }
    }
  },
  methods: {
      back() {
        this.$router.back();
      }
    },
  created () {
      this.getModel(this, "/v1/system", this.$route.params.id)
    }
  }
</script>
<style>

</style>
