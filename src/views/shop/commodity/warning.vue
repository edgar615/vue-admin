<template>
  <section>
    <b-label class="label">预警数量：</b-label>
   <!-- <b-input v-model="filters.waringCount" placeholder=""></b-input>

    <button class="button is-primary" @click="onClick" :disabled='errors.any()'
            :class="{'is-loading' : saving}">
      <b-icon icon="check-circle"></b-icon>
      <span>提交</span>
    </button>
    <button class="button" @click="back">
      <b-icon icon="undo"></b-icon>
      <span>返回</span>
    </button>-->
  </section>
</template>
<style>
  .label{
    height:2rem;
    line-height: 2rem;
    color: #333333;
  }
</style>
<script>
  import { count} from '@/api/shop/commodity/commodity';
  import EmptyTable from '@/components/EmptyTable.vue';
  import request from '@/utils/request'

  export default {
    props:['fn'],
    data () {
  /*    commodityId : this.commodityId;*/
        fn: this.fn;
        filters: {
          waringCount: "";
        }
    },
    methods: {
      onClick(){
        var _this=this;
        for (var i in _this.commodityId){
          _this.commodityId.waringCount = _this.filters.waringCount;
        }
        _this.fn();
        this.updateModel(_this, count,_this.commodityId,() => _this.$router.push({ path: '/shop/commodity' }));
      }
    }
  }
</script>
