<template>
  <section>
    <div class="card">

        <div class="top-portion">
      <span>会员信息</span>
      <div class="card-content">

          <div class="Input-box">
            <b  class="static-field" >会员名称</b>
            <p class="control" >{{model.name}}</p>
          </div>
          <div class="Input-box">
            <b  class="static-field">手机号码</b>
            <p class="control"  >{{model.tel}}</p>
          </div>
        <div class="Input-box">
          <b  class="static-field">会员等级</b>
          <p class="control"  v-model="temp"></p>
        </div>
        <div class="Input-box">
          <b  class="static-field">会员积分</b>
          <p class="control"  >{{model.memberPoints}}</p>
        </div>
        <div class="Input-box">
          <b  class="static-field">会员生日</b>
          <p class="control"  >{{model.birthday}}</p>
        </div>
        <div class="Input-box">
          <b  class="static-field">性别</b>
          <p class="control" >{{model.gender}}</p>
        </div>

      </div>
    </div>

    </div>
    <div class="card mt-3">
      <div class="card-content">
        <div class="columns"  max="2">
          <div class="column item"  v-for="pet in model.memberPetList">
            <span style="display: block">{{pet.name}}</span>
            <span style="display: block">{{pet.gender}}</span>
            <span style="display: block">阿萨斯的</span>
          </div>


        </div>

        <!--buefy的表格组件，具体用法查阅文档-->

      </div>
    </div>
    <b-loading :active.sync="loading"></b-loading>

  </section>

</template>
<script>
  import { getInfo} from '@/api/member/memberinfo.js';
  export default {
    data() {
    return {
      loading: false,
      model: {
      },

    }
  },
  methods: {
      back() {
        this.$router.back();
      }
    },
  created () {
      this.getModel(this, getInfo, this.$route.params.id)
    }
  }
</script>
<style>
  .column .item{

    background: darkorange;
  }
</style>
