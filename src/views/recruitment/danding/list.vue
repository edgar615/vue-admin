<template>
  <section>
    <div class="card">
      <div class="card-content">
        <b-field grouped group-multiline>
          <b-label class="label">门店：</b-label>
          <b-select placeholder="门店" v-model="filters.companyId">
            <option value="0">请选择</option>
            <option value="1">派多格惠新西街南口店</option>
          </b-select>
          <b-label class="label">技能：</b-label>
          <b-select placeholder="技能" v-model="filters.position">
            <option value="0">请选择</option>
            <option value="1">美容师</option>
          </b-select>
          <b-label class="label">等级：</b-label>
          <b-select placeholder="等级" v-model="filters.level">
            <option value="0">请选择</option>
            <option value="1">首席</option>
          </b-select>
          <b-label class="label">发布状态：</b-label>
          <b-select placeholder="发布状态" v-model="filters.state">
            <option value="0">请选择</option>
            <option value="1">发布中</option>
          </b-select>
          <b-label class="label">时间：</b-label>
          <b-datepicker
            placeholder=""
            :min-date="filters.startTime"
            >
          </b-datepicker> ~
          <b-datepicker
            placeholder=""
            :max-date="filters.endTime">
          </b-datepicker>
          <p class="control ml-1">
            <button class="button is-primary" @click="sel">
              <b-icon icon="magnify"></b-icon>
              <span>搜索</span>
            </button>
          </p>
        </b-field>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-content">
        <div class="field is-grouped">
          <div class="buttons" >
            <router-link to="/recruitment/danding/add"
                         exact class="button is-primary">
              <b-icon icon="plus-circle-outline"></b-icon>
              <span>新增招聘</span>
            </router-link>

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
          :per-page="2"
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

             <b-table-column field="companyId" label="所属门店" numeric sortable centered>
               {{ props.row.companyId }}
             </b-table-column>

            <b-table-column field="position" label="招聘岗位" centered>
              {{ props.row.position }}
            </b-table-column>

            <b-table-column field="level" label="级别" centered>
              {{ props.row.level }}
            </b-table-column>

            <b-table-column field="recruitmentNum" label="招聘数量"  centered >
              {{ props.row.recruitmentNum }}
            </b-table-column>

            <b-table-column field="publishedOn" label="发布时间"  centered >
              {{ new Date(props.row.publishedOn * 1000).toLocaleString() }}
            </b-table-column>
            <b-table-column field="state" label="发布状态"  centered >
              <b-switch v-model="props.row.state==2 ? true : false"
                        @click.native="onSwitch(props.row.recruitmentId,props.row.state)" >
              </b-switch>
            </b-table-column>

            <b-table-column label="操作">
              <router-link :to="{path:  '/backend/system/' +props.row.subsystemId + '/view' }"
                           exact class="button is-info is-small" title="预览">
                <b-icon icon="information-outline"></b-icon>
              </router-link>
              <router-link :to="{path:  '/recruitment/danding/ ' +props.row.recruitmentId + '/edit' }"
                           exact class="button is-small" title="编辑">
                <b-icon icon="circle-edit-outline"></b-icon>
              </router-link>
              <button class="button is-danger is-small" @click="onDelete(props.row.recruitmentId)"
                      title="删除" :class="{'is-loading' : deleting}">
                <b-icon icon="delete-outline"></b-icon>
              </button>
              <router-link :to="{path:  '/backend/system/' +props.row.subsystemId + '/permissions' }"
                           exact class="button is-info is-small" title="推送到大屏">
                <b-icon icon="menu"></b-icon>
              </router-link>
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

  export default {
    data () {
      return {
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
