<template>
  <section>
    <div class="card mt-3">
      <div class="card-content">
        <div class="columns">
          <div class="column is-one-fifths">
           <b-label>订单编号:{{model.orderNo}}</b-label>
          </div>
         <!-- <div class="column is-one-fifths">

          </div>-->
          <div class="column is-one-fifths">
            <b-label>下单门店:{{model.buyerName}}</b-label>
          </div>
          <div class="column "></div>
        </div>
        <div class="columns">
          <div class="column is-one-fifths">
            <b-label>门店地址:{{model.orderNo}}</b-label>
          </div>
          <div class="column"></div>
        </div>
        <div class="columns">
          <div class="column is-one-fifths">
            <b-label>收货人:{{model.orderNo}}</b-label>
          </div>
          <div class="column is-one-fifths">
            <b-label>收货人联系方式:{{model.buyerName}}</b-label>
          </div>
          <div class="column"></div>
        </div>
        <div class="columns">
          <div class="column is-one-fifths">
            <b-label v-if=" model.state==1">订单状态:运费待确认</b-label>
            <b-label v-if=" model.state==2">订单状态:等待支付</b-label>
            <b-label v-if=" model.state==3">订单状态:待发货</b-label>
            <b-label v-if=" model.state==4">订单状态:待收货</b-label>
            <b-label v-if=" model.state==5">订单状态:已完成</b-label>
            <b-label v-if=" model.state==6">订单状态:已取消</b-label>
          </div>
          <div class="column"></div>
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
          </template>
        </b-table>




       <div >
          <b-label>总计:</b-label>
          <div class="column is-two-fifths">
               <b-label v-if="model.payType==1">{{model.amount}}</b-label>
          </div>
          <div class="column"></div>
        </div>
        <div >

          <div class="column is-two-fifths">
            <b-label>设置运费:</b-label>
            <b-input class="input-custom"></b-input>
          </div>
          <div class="column"></div>
        </div>


        <div>
          <div class="columns">
            <div class="buttons">
        <span class="button is-danger">
              <b-icon ></b-icon>
              <span>提交</span>
        </span>
              <button  @click="back" class="button is-primary">
                <span>取消</span>
              </button>

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
