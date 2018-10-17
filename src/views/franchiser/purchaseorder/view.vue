<template>
  <section>
    <div class="card mt-3">
      <div class="card-content">
        <div class="columns">
          <div class="column is-one-fifths">
           <b-label>订单编号:{{model.orderNo}}</b-label>
          </div>
          <div class="column is-one-fifths">
            <b-label v-if=" model.state==1">订单状态:运费待确认</b-label>
            <b-label v-if=" model.state==2">订单状态:等待支付</b-label>
            <b-label v-if=" model.state==3">订单状态:待发货</b-label>
            <b-label v-if=" model.state==4">订单状态:待收货</b-label>
            <b-label v-if=" model.state==5">订单状态:已完成</b-label>
            <b-label v-if=" model.state==6">订单状态:已取消</b-label>
          </div>
          <div class="column is-one-fifths">
            <b-label>下单门店:{{model.buyerName}}</b-label>
          </div>
          <div class="column "></div>
        </div>
        <div class="field is-grouped">
          <b-label>商品列表</b-label>
        </div>

          <div class="columns">
            <div class="column is-one-fifths">
              <b-label>供应商:{{model.sellerName}}</b-label>
            </div>
            <div class="column is-one-fifths">
              <b-label v-if="model.state==1" >运费:待确认</b-label>
              <b-label v-if="model.state!=1" >运费:{{model.freight}}</b-label>
            </div>
            <div class="column is-one-fifths">
              <b-label v-if=" model.shipmentState==1">发货状态:等待发货</b-label>
              <b-label v-if=" model.shipmentState==2">发货状态:部分发货</b-label>
              <b-label v-if=" model.shipmentState==3">发货状态:已发货</b-label>
              <b-label v-if=" model.shipmentState==4">发货状态:订单取消</b-label>
              <b-label v-if=" model.shipmentState==5">发货状态:取消发货</b-label>
            </div>
            <div class="column is-one-fifths">
              <button class="button is-primary "  @click="cancelOrder(model.orderNo)">
                取消订单
              </button>
              <button   v-if="model.state!=1" class="button is-primary"  @click="searchLogistics(props.row)">
                去支付
              </button>

            </div>
            <div class="column">

            </div>
          </div>
      <b-table
          bordered
          striped
          hoverable
          narrowed
          mobile-cards

          :data="(model.commodityOrderItemVoList&& model.commodityOrderItemVoList.length == 0) ? [] : model.commodityOrderItemVoList"
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
              0
            </b-table-column>
            <b-table-column field="quantity" label="入库数量"  centered >
              <b-input  v-model="props.row.realquantity"></b-input>
            </b-table-column>
            <b-table-column label="操作">

              <button class="button is-primary is-small"  @click="(props.row)">
                入库
              </button>
            </b-table-column>
          </template>
        </b-table>




       <div >
          <b-label>付款信息:</b-label>
          <div class="column is-two-fifths">
               <b-label v-if="model.payType==1">微信支付/支付宝支付:{{model.amount}}</b-label>
               <b-label v-if="model.payType==2">现金支付:{{model.amount}}</b-label>
               <div v-if="model.payType==2">
                 <b-label >
                   银行转账支付:{{data.amount}}
                 </b-label>
                 <div>
                   <b-label>
                     银行转账：
                   </b-label>
                   <b-label>
                     转账卡号：
                   </b-label>
                   <b-label>
                     到账时间：
                   </b-label>
                 </div>


               </div>

          </div>
          <div class="column"></div>

        </div>
        <div>
          <div class="columns">
            <div class="buttons">
        <span class="button is-danger"
        >
          <b-icon ></b-icon>
          <span>确认收货并入库</span>
        </span>
         <router-link :to="{path:  '/franchiser/returnorder/' + model.purchaseOrderId+'/add'}" exact class="button is-primary">
                <b-icon ></b-icon>
                <span>申请退/换货</span>
              </router-link>
            </div>
          </div>



        </div>

      </div>
    </div>

  </section>
</template>
<script>
  import {getpurChaseOrder} from '@/api/franchiser/purchaseorder'
  import request from '@/utils/request'
  export default {
    data() {
      return {
        loading: false,
        model: {
          orderNo:'',

        },
        loading: false,
        deleting: false,
        sortField: 'sorted',
        sortOrder: 'asc',
        defaultSortOrder: 'asc',
        checkedRows: [],
      }
    },
  methods: {
      back() {
        this.$router.back();
      },
    /***
     * 取消订单
     * */
    cancelOrder(){

       }
    },
  created () {
    this.getModel(this, getpurChaseOrder, this.$route.params.id)
    }
  }
</script>
<style>

</style>
