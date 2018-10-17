<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->
    <div class="card">
      <div class="card-content">
        <b-field grouped group-multiline>
          <b-label class="label">品类：</b-label>
          <b-input v-model="filters.commodityCategoryKey" placeholder="品类"></b-input>
          <b-label class="label">品牌：</b-label>
          <b-input v-model="filters.commodityBrandKey" placeholder="品牌"></b-input>
          <b-label class="label">名称：</b-label>
          <b-input v-model="filters.name" placeholder="名称"></b-input>
          <b-label class="label">上架状态：</b-label>
          <b-select placeholder="上架状态" v-model="filters.state">
            <option value="0">请选择</option>
            <option value="1">已上架</option>
            <option value="2">未上架</option>
          </b-select>
          <b-label class="label">预警状态：</b-label>
          <b-select placeholder="预警状态" v-model="filters.warningState">
            <option value="0">请选择</option>
            <option value="1">已开启</option>
            <option value="2">未开启</option>
          </b-select>

          <b-label class="label">时间：</b-label>
          <!--   <b class="Input-title first-title">时间</b>-->
          <b-datepicker
            placeholder="开始时间"
            :maxDate="maxDate"
            @input="setMinTime"
            icon="calendar-today right-icon"
            class="time-custom" v-model="startTime">
          </b-datepicker> ~
          <b-datepicker
            placeholder="结束时间"
            :minDate="minDate"
            @input="setMaxTime"
            icon="calendar-today"
            class="time-custom" v-model="endTime">
          </b-datepicker>

          <p class="control ml-1">
            <button class="button is-primary" @click="loadAsyncData">
              <b-icon icon="magnify"></b-icon>
              <span>查询</span>
            </button>
          </p>
          <p class="control ml-1">
            <button class="button is-primary" @click="reset">
              <b-icon icon="magnify"></b-icon>
              <span>重置</span>
            </button>
          </p>
        </b-field>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-content">
        <div class="field is-grouped">
          <div class="buttons">
            <button @click="setWarning(checkedRows)" :disabled="!checkedRows.length"
                    exact class="button is-primary">
              <b-icon icon="plus-circle-outline"></b-icon>
              <span>批量设置预警数量</span>
            </button>

            <span class="button is-danger" @click="batchEnable(checkedRows)" :disabled="!checkedRows.length"
                  :class="{'is-loading' : deleting}">
           <b-icon icon="delete-outline"></b-icon>
           <span>批量开启预警</span>
           </span>
            <span class="button is-danger" @click="batchUnWarning(checkedRows)" :disabled="!checkedRows.length"
                  :class="{'is-loading' : deleting}">
           <b-icon icon="delete-outline"></b-icon>
           <span>批量关闭预警</span>
           </span>
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

            <b-table-column field="commodityName" label="商品名称" centered>
              {{ props.row.commodityName }}
            </b-table-column>

            <b-table-column field="sysIdentifier" label="规格" centered>
              {{ props.row.createdOn }}
            </b-table-column>

            <b-table-column field="categoryName" label="品类"  centered >
              {{ props.row.categoryName }}
            </b-table-column>

            <b-table-column field="brandName" label="品牌"  centered >
              {{ props.row.brandName }}
            </b-table-column>
            <b-table-column field="price" label="现售价"  centered >
              {{ props.row.price }}
            </b-table-column>
            <b-table-column field="stockCount" label="库存数量"  centered >
              {{ props.row.stockCount }}
            </b-table-column>
            <b-table-column field="actualSales" label="总销量"  centered >
              {{ props.row.actualSales }}
            </b-table-column>
            <b-table-column field="monthSales" label="本月销量"  centered >
              {{ props.row.monthSales }}
            </b-table-column>
            <b-table-column field="waringCount" label="预警数量"  centered >
              {{ props.row.waringCount }}
            </b-table-column>
            <b-table-column field="state" label="状态"  centered >
              {{ props.row.state }}
            </b-table-column>
            <b-table-column field="warningStates" label="预警状态"  centered >
              <b-switch v-model="props.row.warningStates"
                        @click.native="onSwitch(props.row.commodityId,props.row.warningStates)" >
              </b-switch>
            </b-table-column>

          </template>
          <template slot="empty">
            <EmptyTable></EmptyTable>
          </template>
        </b-table>
      </div>
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
  import {commodityPage,enable,unWarning,batchEnableStatus,batchUnWarningStatus} from '@/api/shop/commodity/commodity'
  import EmptyTable from '@/components/EmptyTable.vue'
  import Waring from './warning.vue'
  import request from '@/utils/request'
  export default {
    data () {
      return {
        filters: {
        },
        pagination: {},
        loading: false,
        deleting: false,
        sortField: 'sorted',
        sortOrder: 'asc',
        defaultSortOrder: 'asc',
        checkedRows: [],
        minDate:"",
        maxDate:""
      }
    },
    components: {
      EmptyTable
    },
    methods: {
      /**
       * 重置
       */
      reset(){
        this.filters = {}
        this.startTime="";
        this.endTime=""
      },
      setWarning(checkedRows){
        console.log(checkedRows);
       /* var dataList = [];
        for (var i in checkedRows){
          dataList.push({commodityName:checkedRows[i].commodityName,categoryName:checkedRows[i].categoryName,brandName:checkedRows[i].brandName,price:checkedRows[i].price,
            stockCount:checkedRows[i].stockCount,actualSales:checkedRows[i].actualSales,monthSales:checkedRows[i].monthSales,
            warningStates:checkedRows[i].warningStates,waringCount:checkedRows[i].waringCount,state:checkedRows[i].state,
            commodityId:checkedRows[i].commodityId});
        }*/
        let _this=this;
        let id=_this.$layer.iframe({
          content: {
            content: Waring, //传递的组件对象
            parent: this,//当前的vue对象
            data:{
              dataList: checkedRows,
              fn:()=>{
                _this.$layer.close(id);
              }
            }
            ,//props
          },
          btn:'确定',
          type: 2,
          area:['350px','250px'],
          title:"批量设置预警数量",
        });
      },
      /*
       * Load async data
       */
      loadAsyncData (params) {
        this.pageModel(this, commodityPage, params)
      },
      /**
       * 预警状态
       */
      onSwitch(commodityId,warningStates){
        const vm = this
        if (warningStates){
          this.updateModel(vm, unWarning, commodityId , () => this.loadAsyncData({page: this.pagination.page}))
        } else {
          this.updateModel(vm, enable, commodityId , () => this.loadAsyncData({page: this.pagination.page}))

        }
      },
      /**
       *  批量开启预警
       */
      batchEnable(checkedRows){
        const vm = this
        this.updateModel(vm, batchEnableStatus, checkedRows , () => this.loadAsyncData({page: this.pagination.page}))
      },
      /**
       *
       */
      batchUnWarning(checkedRows){
        const vm = this
        this.updateModel(vm, batchUnWarningStatus, checkedRows , () => this.loadAsyncData({page: this.pagination.page}))
      },
      /*
       * Handle page-change event
       */
      onPageChange (page) {
        if (this.pagination.page != page) {
          this.loadAsyncData({page: page})
        }
      },
      /*
       * Handle sort event
       */
      onSort (field, order) {
        this.sortField = field
        this.sortOrder = order
        this.loadAsyncData()
      },
      /*
       * 批量删除
       */
      onDeleteCheckedRows () {
        const vm = this
        var checkedIds = vm.checkedRows.map(function (item) {
          return item.subsystemId
        })
        this.batchDeleteModel(vm, batchDeletePurChaseOrder, checkedIds, () => this.loadAsyncData({page: this.pagination.page}))
      },
      /*
       * Type style in relation to the value
       */
      internalClass (value) {
        if (value == undefined) {
          return 'is-black'
        }
        if (value) {
          return 'is-success'
        }
        return 'is-dark'
      },
      onDelete (id) {
        const vm = this
        this.deleteModel(vm, deletePurChaseOrder, id, () => this.loadAsyncData({page: this.pagination.page}))
      },

      loadData(params){
        request.get("http://mockjs.com/api/posts").then(res => {
          let _this=this;
          _this.pagination = res.data.pagination;
          _this.loading = false
        });

      },
      /***
       * 计算最小结束时间
       * */
      setMinTime(){
        var _this=this;
        if(_this.startTime){
          let min=new Date(_this.startTime)
          this.minDate=new Date(min.getFullYear(), min.getMonth(), min.getDate() + 1)
        }
      },
      /**
       * 计算最大开始时间
       * **/
      setMaxTime(){
        var _this=this;
        if(_this.endTime){
          let max=new Date(_this.endTime)
          this.maxDate=new Date(max.getFullYear(), max.getMonth(), max.getDate() -1)
        }
      }

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
    created () {
      this.loadAsyncData()
    }
  }
</script>
