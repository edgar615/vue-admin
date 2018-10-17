<template>
  <section>
    {{model}}
    <div class="card mt-3">
      <div class="card-content">
        <div class="columns">
          <div class="column is-one-fifths">
            <b-label>采购订单编号:{{model.orderNo}}</b-label>
          </div>
          <div class="column is-one-fifths">
            <b-label>下单门店:{{model.buyerName}}</b-label>
          </div>
          <div class="column is-one-fifths">
            <b-label >供应商:{{model.sellerName}}</b-label>
          </div>
          <div class="column ">

          </div>
        </div>
        <div class="field is-grouped">
          <b-label>商品列表</b-label>
        </div>
        <b-table
          bordered
          striped
          hoverable
          narrowed
          mobile-cards

          :data="(model.commodityOrderItemVoList && model.commodityOrderItemVoList.length == 0) ? [] : model.commodityOrderItemVoList"
          :loading="loading"
          backend-sorting
          :default-sort-direction="defaultSortOrder"
          :default-sort="[sortField, sortOrder]"

        >
           <template slot-scope="props">

            <b-table-column width="200px" field="commodityName" label="商品名称" centered>
              {{ props.row.commodityName }}
            </b-table-column>

            <b-table-column field="" label="规格" centered>

            </b-table-column>

            <b-table-column field="quantity" label="数量"  centered >
              {{ props.row.quantity }}
            </b-table-column>

            <b-table-column  width="200px" field="price" label="单价"  centered >
              {{ props.row.price }}
            </b-table-column>
            <b-table-column width="200px" field="amount" label="总价"  centered >
              {{ props.row.quantity * props.row.price }}
            </b-table-column>
            <b-table-column field="" label="已入库数量"  centered >
              {{ props.row.quantity }}
            </b-table-column>
                <b-table-column field="requantity" label="退货数量"  centered >
                  <b-input  v-model="props.row.requantity" :value="0" @blur="checkNum(props.row)">{{ props.row.quantity }}</b-input>
               </b-table-column>
          </template>
        </b-table>
        <b-field grouped group-multiline>
          <b-lable>退货原因:</b-lable>
        </b-field>
           <vue-html5-editor :content="content"  @change="updateData"  :height="250" :z-index="1000" :auto-height="true" :show-module-name="true" :language="zh-cn" ></vue-html5-editor>
        <div class="buttons" style="margin-top:10px;">

          <span class="button is-danger" @click="addRetrunOrder">
                  <b-icon ></b-icon>
                  <span>确认退货</span>
          </span>

          <button  @click="back" class="button is-primary">
            <span>取消</span>
          </button>
        </div>


      </div>
    </div>




  </section>
</template>
<script>
  import {getpurChaseOrder} from '@/api/franchiser/purchaseorder'
  import {addReturnOrder} from '@/api/franchiser/returnorder'
  import request from '@/utils/request'
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
      },
      //判断入库数量
      checkNum(row){
        let vm=this;
        if(row.returnquantity>row.quantity){
          vm.$layer.msg("退货数量大于商品数量")
        }
      },
      //获得文本编辑器的文本内容
      updateData(data){
        let vm =this;
        vm.content=data;
      },
      //新增退货单

      addRetrunOrder(){
         let vm=this;
         alert(vm.content);
         console.log(vm.model);
         vm.model.returnOrderItemVoList=[]
         vm.model.returnOrderActivityVoList=[]
        let  commodityOrderItemVoList=vm.model.commodityOrderItemVoList

      /*    for()*/
         for(let i in commodityOrderItemVoList){
           let  commodityOrderItem=commodityOrderItemVoList[i]
           if(commodityOrderItem.requantity){//存在退货
             vm.model.returnOrderItemVoList.push(commodityOrderItem);
           }

         }
         let  returnOrderActivityVo={}
         returnOrderActivityVo.activityContent=vm.content
         returnOrderActivityVo.amount=vm.model.amount
         returnOrderActivityVo.operator=""
         returnOrderActivityVo.operatorId=""
         returnOrderActivityVo.orderNo=""
         returnOrderActivityVo.returnOrderActivityId=""
         vm.model.returnOrderActivityVoList.push(returnOrderActivityVo)

        this.saveMode(vm, addReturnOrder, () => vm.$router.push({path: '/franchiser/returnorder'}))
      }



    },
    created () {
      this.getModel(this, getpurChaseOrder, this.$route.params.id)

    }
  }
</script>
<style>

</style>
