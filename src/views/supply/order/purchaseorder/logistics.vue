<template>
  <div class="block">
    <b-radio v-model="internal"
             native-value="1">
         选择现有物流方案
    </b-radio>
    <b-radio v-model="internal"
             native-value="0">
       正常物流单号
    </b-radio>
    <div v-if="internal==1">
      <div class="lineClass">
          <b class="Title">物流方案:</b>
          <b-select placeholder="" v-model="model.shippingMethod">
            <option value="">请选择</option>
           <!-- <option   class="input-custom"
                      v-for="option in model"
                      :value="option.name"
                      :key="option.name">
              {{ option.name}}
            </option>-->
          </b-select>
      </div>
    </div>

    <!--物流单号-->
    <div v-if="internal==1">
      <div class="lineClass">
        <b class="Title" v-model="trackingNumber" >物流单号:</b>
        <b-input type="text"></b-input>
      </div>
      <div class="title-box">
        <span class="title-left">物流公司:</span>
        <span class="title-right">北京通州物流</span>
      </div>

      <div class="title-box">
        <span class="title-left">联系人:</span>
        <span class="title-right">张三</span>
      </div>

      <div class="title-box">
        <span class="title-left">联系方式:</span>
        <span class="title-right">1777777777</span>
      </div>
     <!-- <div   v-if="temp.name==model.shippingMethod" v-for="temp in model">
        <div class="title-box">
          <span class="title-left">物流公司:</span>
          <span class="title-right"></span>
        </div>

        <div class="title-box">
          <span class="title-left">联系人:</span>
          <span class="title-right">{{temp.contact}}}</span>
        </div>

        <div class="title-box">
          <span class="title-left">联系方式:</span>
          <span class="title-right">{{temp.contactNumber}}}</span>
        </div>
      </div>-->
      <div class="tishi">
        <p>没有对应的物流方案？</p>
        <p> <a href="#">创建物流方案</a></p>
      </div>

    </div>
    <div v-if="internal==0">
      <div class="lineClass">
        <b class="Title" >物流单号:</b>
        <b-input type="text" v-model="trackingNumber"></b-input>
      </div>
      <div class="lineClass">
        <b class="Title">物流公司:</b>

      </div>


    </div>
    <div class="btn-wrap">
      <button class="shipments-btn" @click="saveLogistics">发货</button>
    </div>


  </div>
</template>

<style>

</style>

<script>
  import {getShippingMethod,saveLogistic} from '@/api/supply/order/purchaseorder/purchaseorder'
  import request from '@/utils/request'
  export default {
       props:['purchaseOrderId','fn','sellerId'],
        data() {
            return {
              id:this.purchaseOrderId,
              sellerId:this.sellerId,
              model:{
                supplierId:this.id,
              },
              trackingNumber:'',
              internal:"1",


            }
        },
        methods: {
          loadAsyncData (params) {
            let vm =this
            request.get('/shippingMethod/' + vm.id).then(function(res){
               vm.model=res.data
            })
          },
          saveLogistics(){
            const vm = this
            if(vm.internal==0){//只填单号
              console.log(vm.internal)
                 vm.model.supplierId=vm.sellerId,
                 vm.model.purchaseOrderId=vm.id,
                 vm.model.trackingNumber=parseInt(vm.trackingNumber);
              }else{

            }
            this.fn()
            this.saveMode(vm,saveLogistic, () => vm.$router.push({path: '/supply/order/purchaseorder'}));
          }
        },
       created () {
        // this.loadAsyncData()
          let _this=this;
          // this.loadData()

        }
    }
</script>
<style scoped>
  .lineClass{
    height: 35px;
    line-height: 35px;
    margin: 15px 0;
  }
  .lineClass .Title{
    float: left;
    margin-right: 10px;
    width: 25%;
  }
  .lineClass .control{
    width: 70%;
    float: left;
  }

  .title-box{
    margin: 5px 0;
  }
  .title-box .title-left{
    margin-right: 10px;
    width: 25%;
    font-weight: 600;
    display: inline-block;
  }
  .title-box .title-right{
    width: 70%;
  }

  .tishi{
    text-align: center;
    margin: 10px 0;
  }

  .btn-wrap{
    margin: 10px 0;
    text-align: center;
  }
  .shipments-btn{
    width: 110px;
    height: 30px;
    line-height: 30px;
    background: #ff6600;
    text-align: center;
    color: white;
    border: none;
    outline: none;
  }
</style>
