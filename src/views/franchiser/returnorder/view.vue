<template>
  <section>
    <div class="card mt-3">
      <div class="card-content">
        <div class="columns">
          <div class="column is-one-fifths">
            <b-label>退货编号:{{data.returnNo}}</b-label>
          </div>

          <div class="column is-one-fifths">
            <b-label>采购订单编号:{{data.orderNo}}</b-label>
          </div>
          <div class="column is-one-fifths">
            <b-label>下单门店:{{data.buyerName}}</b-label>
          </div>
          <div class="column is-one-fifths">
            <b-label >供应商:{{data.sellerName}}</b-label>
          </div>
          <div class="column is-one-fifths">
            <b-label  v-if="data.returnstate==1">供应商退货状态:申请退货</b-label>
            <b-label  v-if="data.returnstate==2">供应商退货状态:同意退货</b-label>
            <b-label  v-if="data.returnstate==3">供应商退货状态:拒绝退货</b-label>
            <b-label  v-if="data.returnstate==4">供应商退货状态:申诉中</b-label>
            <b-label  v-if="data.returnstate==5">供应商退货状态:已退</b-label>
            <b-label  v-if="data.returnstate==6">供应商退货状态:已取消</b-label>

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

          :data="(pagination.records && pagination.records.length == 0) ? [] : pagination.records"
          :loading="loading"
          backend-sorting
          :default-sort-direction="defaultSortOrder"
          :default-sort="[sortField, sortOrder]"

        >

          <template slot-scope="props">

            <b-table-column width="200px" field="orderNo" label="商品名称" centered>
              {{ props.row.name }}
            </b-table-column>

            <!--<b-table-column field="" label="规格" centered>

            </b-table-column>-->
            <b-table-column field="returnquantity" label="退货数量"  centered >
                 <b-input v-model="props.row.returnquantity"></b-input>
            </b-table-column>
            <b-table-column  width="200px" field="price" label="单价"  centered >
              {{ props.row.price }}
            </b-table-column>

            <b-table-column width="200px" field="amount" label="总价"  centered >
              {{ props.row.returnquantity * props.row.price }}
            </b-table-column>

          </template>
        </b-table>
        <b-field grouped group-multiline>
          <b-lable>退货原因</b-lable>
        </b-field>
        <div class="">
             sidoghoafjaof

        </div>
        <div class="">


        </div>


        </div>
      </div>

    <div class="card mt-3" v-if="data.returnstate==1||data.returnstate==3 ||data.returnstate==4">

      <b-field grouped group-multiline>
        <b-lable>补充退货原因： </b-lable>
        <vue-html5-editor :content="content" :height="250" :z-index="1000" :auto-height="true" :show-module-name="true" :language="zh-cn" ></vue-html5-editor>

      </b-field>
      <div class="buttons" style="margin-top:10px;">
              <span class="button is-danger">
                  <b-icon ></b-icon>
                  <span>继续沟通</span>
              </span>
        <span class="button is-danger">
                  <b-icon ></b-icon>
                  <span>确认已退</span>
              </span>
        <span class="button is-danger">
                  <b-icon ></b-icon>
                  <span>申诉</span>
              </span>


        <button  @click="back" class="button is-primary">
          <span>取消编辑</span>
        </button>
      </div>
    </div>


  </section>
</template>
<script>
  import {getpurReturnOrder} from '@/api/franchiser/returnorder'
  import request from '@/utils/request'
  export default {
    data() {
      return {
        filters: {
          quantity:0,
        },
        content:"",
        data:{},
        loading: false,
        deleting: false,
        sortField: 'sorted',
        sortOrder: 'asc',
        defaultSortOrder: 'asc',
        checkedRows: [],

        isSwitchedTwo: true,
        // 分页器
        total: 2,
        current: 1,
        perPage: 10,
        order: '',
        size: '',
        isSimple: false,
        isRounded: false,
        isSwitched:false
      }
    },
  methods: {
      back() {
        this.$router.back();
      },

    alert(){
        alert(0);
    }
    },
  created () {
      this.getModel(this, getpurReturnOrder, this.$route.params.id)
    }
  }
</script>
<style>

</style>
