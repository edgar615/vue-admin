<template>
  <section>

        <b-field grouped group-multiline>
          <b-label class="label">盘点时间：</b-label>
          <b-datepicker
            placeholder=""
            :min-date="minDate"
            :max-date="maxDate">
          </b-datepicker>
        </b-field>


        <div>
          <b-label >盘点人员：</b-label>
          <b-radio v-model="model.level"
                   native-value="0">
            张三
          </b-radio>
          <b-radio v-model="model.level"
                   native-value="1">
            李四
          </b-radio>
          <b-radio v-model="model.level"
                   native-value="2">
            王五
          </b-radio>
        </div>

    <div class="card mt-3">
      <div class="card-content">
        <div class="field is-grouped">
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

            <b-table-column field="companyId" label="序号" numeric sortable centered>
              {{ props.row.companyId }}
            </b-table-column>

            <b-table-column field="position" label="品牌" centered>
              {{ props.row.position }}
            </b-table-column>

            <b-table-column field="level" label="品类" centered>
              {{ props.row.level }}
            </b-table-column>

            <b-table-column field="recruitmentNum" label="商品名称"  centered >
              {{ props.row.recruitmentNum }}
            </b-table-column>

            <b-table-column field="publishedOn" label="库存数量"  centered >
              {{ props.row.publishedOn }}
            </b-table-column>
            <b-table-column field="publishedOn" label="盘点数量"  centered >
              {{ props.row.publishedOn }}
            </b-table-column>

            <b-table-column label="操作">
              <button class="button is-danger is-small" @click="onDelete(props.row.recruitmentId)"
                      title="删除" :class="{'is-loading' : deleting}">
                <b-icon icon="delete-outline"></b-icon>
              </button>
            </b-table-column>
          </template>
          <template slot="empty">
            <EmptyTable></EmptyTable>
          </template>
        </b-table>
      </div>
    </div>

    </div>
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
  import { recruitmentPage, deleteRecruitment, updateRecruitmentState,publishRecruitmentState} from '@/api/recruitment/recruitment';
  import EmptyTable from '@/components/EmptyTable.vue';
  import request from '@/utils/request'
  import Goods from '../sku/goods.vue'

  export default {
    data () {
      return {
        model: {
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
       *  选择商品
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
      internalClass (value) {
        if (value == undefined) {
          return 'is-black'
        }
        if (value) {
          return 'is-success'
        }
        return 'is-dark'
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
    created () {
      this.loadAsyncData()
    }
  }
</script>
