<template>
  <section>

    <div class="card mt-3">
      <div class="card-content">
        <div class="field is-grouped">
          <b-label class="label">选择采购订单入库：</b-label>
          <div class="buttons" >
            <button @click="purchaseorder()"
                         exact class="button is-primary">
              <b-icon icon="plus-circle-outline"></b-icon>
              <span>选择订单</span>
            </button>
          </div>

        </div>
        <div class="field is-grouped">
          <b-label class="label">选择商品入库：</b-label>
          <div class="buttons" >
            <button @click="goods()"
                         exact class="button is-primary">
              <b-icon icon="plus-circle-outline"></b-icon>
              <span>选择商品</span>
            </button>
          </div>
        </div>

        <!--buefy的表格组件，具体用法查阅文档-->
        <b-table
          bordered
          striped
          hoverable
          narrowed
          mobile-cards

          :data="(pagination.records && pagination.records.length == 0) ? [] : pagination.records"
          :loading="loading"
          paginated
          backend-pagination
          :total="pagination.totalRecords"
          :per-page="pagination.pageSize"
          :current-page="pagination.page"
          @page-change="onPageChange"

          backend-sorting
          :default-sort-direction="defaultSortOrder"
          :default-sort="[sortField, sortOrder]"
          @sort="onSort"

          :checked-rows.sync="checkedRows"
          checkable
        >

          <template slot-scope="props">

            <b-table-column field="sorted" label="序号" numeric sortable centered>
              {{(pagination.page-1)*pagination.pageSize+props.index}}
            </b-table-column>

            <b-table-column field="companyId" label="品牌" numeric sortable centered>
              {{ row.companyId }}
            </b-table-column>

            <b-table-column field="position" label="品类" centered>
              {{ row.position }}
            </b-table-column>

            <b-table-column field="level" label="商品名称" centered>
              {{ row.level }}
            </b-table-column>

            <b-table-column field="recruitmentNum" label="原始库存"  centered >
              {{ row.recruitmentNum }}
            </b-table-column>

            <b-table-column field="recruitmentNum" label="采购数量"  centered >
              {{ row.recruitmentNum }}
            </b-table-column>

             <b-table-column field="state" label="入库数量"  centered >
               <b-input v-model.trim="row.recruitmentNum" ></b-input>
             </b-table-column>



          </template>
          <template slot="empty">
            <EmptyTable></EmptyTable>
          </template>
        </b-table>
      </div>
    </div>

    <div class="field is-grouped">
      <button class="button is-primary" @click="save" :disabled='errors.any()'
              :class="{'is-loading' : saving}">
        <b-icon icon="check-circle"></b-icon>
        <span>提交</span>
      </button>
      <button class="button" @click="back">
        <b-icon icon="undo"></b-icon>
        <span>取消</span>
      </button>
    </div>

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
  import { recruitmentPage, deleteRecruitment, updateRecruitmentState,publishRecruitmentState} from '@/api/recruitment/recruitment';
  import EmptyTable from '@/components/EmptyTable.vue';
  import request from '@/utils/request'
  import Purchaseorder from './purchaseorder.vue'
  import Goods from './goods.vue'

  export default {
    data () {
      return {
        dataList: {
        },
        filters: {
          companyId: "",
          position: "",
          level: "",
          recruitmentNum: "",
          publishedOn: "",
          state: "",
          startTime: "",
          endTime: ""
        },
        pagination: {},
        loading: false,
        deleting: false,
        sortField: 'sorted',
        sortOrder: 'asc',
        defaultSortOrder: 'asc',
        checkedRows: []
      }
    },
    components: {
      EmptyTable
    },
    methods: {
      /**
       *  选择采购订单
       */
      purchaseorder(){
        let _this=this;
        let id=_this.$layer.iframe({
          content: {
            content: Purchaseorder, //传递的组件对象
            parent: this,//当前的vue对象
            data:{
              fn:()=>{
                _this.$layer.close(id);
              }
            }
            ,//props
          },
          btn:'确定',
          type: 2,
          area:['1024px','768px'],
          title:"选择采购订单",
        });
      },
      /**
       *
       */
      goods(){
        let _this=this;
        let id=_this.$layer.iframe({
          content: {
            content: Goods, //传递的组件对象
            parent: this,//当前的vue对象
            data:{
              fn:()=>{
                _this.$layer.close(id);
              }
            }
            ,//props
          },
          btn:'确定',
          type: 2,
          area:['1024px','768px'],
          title:"选择商品",
        });
      },

      /*
       * Load async data
       */
      loadAsyncData (params) {
        this.pageModel(this, recruitmentPage, params)
      }
      ,save(){

      },
      back() {
        this.$router.back();
      },
      sel() {
        let _this=this;
        console.log(_this.filters)
        _this.loadAsyncData({companyId:_this.filters.companyId,position: _this.filters.position,level: _this.filters.level,state: _this.filters.state,startTime:_this.filters.startTime,endTime: _this.filters.endTime})
        _this.pageModel(vm, recruitmentPage,() => vm.$router.push({ path: '/recruitment/danding' }));
      },
      onSwitch(recruitmentId,state){
        const vm = this
        if (state == 2){
          this.updateModel(vm, updateRecruitmentState, recruitmentId , () => this.loadAsyncData({page: this.pagination.page}))
        } else {
          this.updateModel(vm, publishRecruitmentState, recruitmentId , () => this.loadAsyncData({page: this.pagination.page}))
        }
      },
      onDelete (recruitmentId) {
        const vm = this
        this.deleteModel(vm, deleteRecruitment, recruitmentId , () => this.loadAsyncData({page: this.pagination.page}))
      },
      loadData(params){
        /* request.get("http://mockjs.com/api/posts").then(res => {
           let _this=this;
           _this.pagination = res.data.pagination;
           _this.loading = false
         });*/

      },
    },
    filters: {
      /**
       * Filter to truncate string, accepts a length parameter
       */
      /*
       truncate(value, length) {
       return value.length > length
       ? value.substr(0, length) + '...'
       : value
       }
       */
    },

  }
</script>
