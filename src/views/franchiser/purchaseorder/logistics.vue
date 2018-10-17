<template>
    <div>
      <b-label class="label">物流单号：{{trackingNumber}}</b-label>
      <input v-model="hello"/>
      <button class="button is-primary is-small"  @click="onClick" title="">
        查询物流
      </button>
    </div>
</template>

<style>

</style>

<script>
    export default {
      props:['trackingNumber','fn'],
        data() {
          logistics:this.trackingNumber;
          fn: this.fn
        },
        methods:{
          onClick(){
            var _this=this;
            _this.$parent.hello=_this.hello;
            _this.fn();
          }
        }
    }
</script>
