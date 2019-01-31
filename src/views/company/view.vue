<template>
  <section>
    <div class="card">
      <div class="card-content">
        <b-field label="编码" horizontal class="static-field">
          <p class="control">
            {{model.companyCode}}
          </p>
        </b-field>

        <b-field label="名称" horizontal class="static-field">
          <p class="control">
            {{model.name}}
          </p>
        </b-field>

        <b-field label="地址" horizontal class="static-field">
          <p class="control">
            {{model.address}}
          </p>
        </b-field>

        <b-field label="状态" horizontal class="static-field">
          <p class="control">
            {{ $dictText("companyState",model.state) }}
          </p>
        </b-field>

        <b-field label="联系电话" horizontal  class="static-field">
          <p class="control">
            {{model.hotline}}
          </p>
        </b-field>
        <b-field label="主页" horizontal  class="static-field">
          <p class="control">
            {{model.homepage}}
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
  import {  get } from '@/api/company';
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
      this.$getModel(get, this.$route.params.id)
    }
  }
</script>
<style>

</style>
