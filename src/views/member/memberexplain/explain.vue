<template>
    <section style="padding: 20px 20px 31px 20px;">
      <div class="card">
        <div class="card-content" style="padding: 40px;">

          <div class="add-Wrap">
            <!--<b-field label="加盟商姓名(必填)">-->
              <!--<b-input class="add-input"></b-input>-->
            <!--</b-field>-->
            <div class="area-wrap">
             <span style="color: red;" >*</span> <span>积分生成规则:每笔消费</span><input class="ainput" v-model="rule3.pointCondition"/><span>元</span>
               <span>得</span><input class="ainput" v-model="rule3.pointValue"/><span>积分</span>
            </div>

            <div class="area-wrap">
              <span style="color: red;">*</span> <span>积分使用规则:使用</span><input class="ainput" v-model="model.memberPointConfig.pointValue"/><span>积分</span>
              <span>抵扣</span><input class="ainput" v-model="model.memberPointConfig.amount"/><span>元</span>
            </div>

          <div class="area-wrap">
            <span>初次完善会员信息赠:</span><input class="ainput" v-model="rule2.pointValue"/><span>积分</span>
            </div>

            <div class="area-wrap">
              <span>签到赠送:</span><input class="ainput" v-model="rule1.pointValue"/><span>积分</span>
            </div>

            <div class="area-wrap">
              <span>评价赠送:</span><input class="ainput" v-model="rule4.pointValue"/><span>积分</span>
            </div>



            <div class="present-btn">
              <button class="submit" @click="explainUpd">
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
  import { getExplain,explainUpdate} from '@/api/member/memberinfo.js';
  export default {
    data() {
    return {
      loading: false,
      saving: false,
      url1:'',
      url2:'',
      url3:'',
      name:'',
      model: {

      },

      rule1:{
        memberPointRuleId:null,
        pointValue:0,
        type:null,
        pointCondition:null,
        state:null
      },
      rule2:{
        memberPointRuleId:null,
        pointValue:0,
        type:null,
        pointCondition:null,
        state:null
      },
      rule3:{
        memberPointRuleId:null,
        pointValue:0,
        type:null,
        pointCondition:null,
        state:null
      },
      rule4:{
        memberPointRuleId:null,
        pointValue:0,
        type:null,
        pointCondition:null,
        state:null
      },




    }
  },
  methods: {
      back() {
        this.$router.back();
      },
    getExplain() {
      this.loading = true
      return getExplain().then(response => {
        this.loading = false;
        this.model = response.data;
        for (temp in this.model.memberPointRuleReqList ) {
          switch (temp.type) {
            case 1:
              rule1 = temp
              break
            case 2:
              rule2 = temp
              break
            case 3:
              rule3 = temp
              break
            case 4:
              rule4 = temp
              break
          }
        }

      }).catch(err => {
        this.loading = false;
      })
    },
    explainUpd(){
      this.loading = true

      for (var i =0;i<this.model.memberPointRuleReqList.length;i++) {

        switch (this.model.memberPointRuleReqList.slice(i).type) {
          case 1:
            this.model.memberPointRuleReqList.slice(i).pointValue = pointValue1
            break
          case 2:
            this.model.memberPointRuleReqList.slice(i).pointValue = pointValue2
            break
          case 3:
            this.model.memberPointRuleReqList.slice(i).pointValue = pointCondition
            this.model.memberPointRuleReqList.slice(i).pointValue =  pointValue3
            break
          case 4:
            this.model.memberPointRuleReqList.slice(i).pointValue = pointValue4
            break
        }
      }
      return explainUpdate(this.model).then(response => {
        this.loading = false;
      }).catch(err => {
        this.loading = false;
    })
    },
    },
    created() {
      this.getExplain();
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
    width: 2rem;
    height: 2rem;
    display: inline-block;
    border: 1px solid #ccc;
  }
</style>
