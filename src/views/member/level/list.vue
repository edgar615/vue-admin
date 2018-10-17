<template>
    <section style="padding: 20px 20px 31px 20px;">
      <div class="card">
        <div class="card-content" style="padding: 40px;">

          <div class="add-Wrap" >
            <!--<b-field label="加盟商姓名(必填)">-->
              <!--<b-input class="add-input"></b-input>-->
            <!--</b-field>-->
            <div class="area-wrap" v-for="data in level">
            <span > 累计消费:</span>
            <input type="text" class="ainput" v-model="data.purchaseAmount">
            <span > 元</span>
            <span > 升级为</span>
            <span > {{data.name}} </span>
            <span >所对应折扣为</span>
            <input type="text" class="ainput" v-model="data.discountValue">
            <span >折</span>
          </div>




            <div class="present-btn bt">
              <button class="submit" @click="updatedL">
                提交
              </button>
              <button class="cancel" @click="">
                取消
              </button>
            </div>


          </div>
          <!--add-wrap结束符-->
        </div>

      </div>
      <!--外部盒子结束符-->
    </section>
</template>
<script>
  import { getLevelAll,levelUpdate} from '@/api/member/memberinfo.js';

  export default {
    data() {
    return {
      loading: false,
      level: {
      },
     prama:{
        'addMemberGradeListReqs':this.level
     }
    }
  },
  methods: {
      back() {
        this.$router.back();
      },


    getLevel() {
      this.loading = true
      return getLevelAll().then(response => {
        this.loading = false;
        this.level = response.data;

      }).catch(err => {
        this.loading = false;
      })
    },
    updatedL(){
      this.loading = true
      this.prama.addMemberGradeListReqs=this.level
      return levelUpdate(this.prama).then(response => {
        this.loading = false;
        console.log(response.data) ;

      }).catch(err => {
        this.loading = false;
      })
    },
    },


    created() {
      this.getLevel();
    }
  }
</script>
<style>
  .add-Wrap .area-wrap {
    margin: 20px 0 14px 0;
    width: 625px;
    height: 36px;
    line-height: 36px;
  }
  .ainput{
      width: 5rem;
    height: 2rem;
    display: inline-block;
    border: 1px solid #ccc!important;
  }
  .present-btn bt{
    margin-top: 5rem;

  }
</style>
