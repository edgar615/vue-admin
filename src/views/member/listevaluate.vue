<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->

    <div class="wrap-box">
      <div class="message-box">
        <div class="top-portion">

        <div class="Input-box">
          <b class="Input-title first-title">会员名称</b>
          <b-input class="input-custom" v-model="filters.name" ></b-input>
        </div>
 
          <div class="Input-box">
            <b class="Input-title">会员等级</b>
            <b-select placeholder="类型" v-model="filters.level" class="input-custom" id="long-select">
              <option
                class="input-custom"
                v-for="option in dictList(this, 'paymentType')"
                :value="option.dictValue"
                :key="option.dictValue">
                {{ option.dictText }}
              </option>
            </b-select>
          </div>

          <div class="Input-box">
            <b class="Input-title">会员手机</b>
            <b-input class="input-custom"  v-model="filters.tel" ></b-input>
          </div>



        </div>


        <div class="bottom-portion">

          <div class="Input-box">
            <b class="Input-title first-title" >会员状态</b>
              <b-select placeholder="类型" v-model="filters.state"  class="input-custom" id="long-select">
              <option
                class="input-custom"
                v-for="option in dictList(this, 'paymentType')"
                :value="option.dictValue"
                :key="option.dictValue">
                {{ option.dictText }}
              </option>
            </b-select>
          </div>

          <div class="Input-box">
            <b class="Input-title">宠物</b>
            <b-select placeholder="类型" v-model="filters.petName"  class="input-custom" id="long-select">
              <option
                class="input-custom"
                v-for="option in dictList(this, 'paymentType')"
                :value="option.dictValue"
                :key="option.dictValue">
                {{ option.dictText }}
              </option>
            </b-select>
          </div>

          <div class="Input-box">
            <b class="Input-title">时间</b>
            <b-datepicker
              class="time-custom"
              placeholder="开始日期"
              icon="calendar-today right-icon"
              @input="starDate"
              :max-date="maxDate">
            </b-datepicker>
            <b-datepicker
              class="time-custom"
              placeholder="结束日期"
              icon="calendar-today"
              @input="endDate"
              :min-date="minDate">
            </b-datepicker>
          </div>
        </div>
        <!--按钮部分-->
        <div class="bottom-btn">
          <button class="search-btn" @click="serch">
            搜索
          </button>
          <button class="empty-btn" @click="clear">
            清空
          </button>
        </div>


      </div>

      <div class="card mt-3 Table-custom"  rules=none>


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

          :checked-rows.sync="checkedRows">

          <template slot-scope="props">

            <b-table-column field="companyId" label="序号"  centered  >
              {{props.index+1}}
            </b-table-column>

            <b-table-column field="name" label="姓名" centered>
              {{  props.row.name }}
            </b-table-column>

            <b-table-column field="tel" label="会员手机号" centered>
              {{ props.row.tel }}
            </b-table-column>

            <b-table-column field="gender" label="出生日期"  centered >
              <!--{{ dictText(this, "paymentType",props.row.type) }}-->
              {{  props.row.birthday  }}
            </b-table-column>

            <b-table-column field="registerTime" label="注册日期"  centered >
               {{ props.row.registerTime }}
            </b-table-column>

            <b-table-column field="state" label="状态" centered>
              <!--<span class="tag" :class="internalClass(props.row.internal)">{{ dictText(this, "internal",props.row.internal) }}</span>-->

                <b-switch :value="true"
                          v-model="props.row.state==1 ? true : false"
                          true-value="isOpen"
                          false-value="isOpen"
                          @input="updateMem(props.row)"
                          type="is-success">
                </b-switch>

            </b-table-column>

            <b-table-column   field="paymentType"  label="会员级别" centered>
              {{ props.row.memberPoints}}
            </b-table-column>
            <b-table-column field="amount" label="会员积分"  centered >
              {{ props.row.memberPoints}}
            </b-table-column>
            <b-table-column field="type" label="操作"  centered >

              <router-link :to="{path:  props.row.memberId + '/view' }"
                           exact >
                <a>查看</a>
              </router-link>
         <router-link :to="{path:  props.row.memberId + '/editmember' }"
                                   exact >
                        <a>编辑</a>
                      </router-link>
         <router-link :to="{path:  props.row.memberId + '/view' }"
                                   exact >
                        <a>宠物</a>
                      </router-link>



                        <a @click="deleteMem(props.row.memberId,props.row.index)">删除</a>


            </b-table-column>
          </template>
          <template slot="empty">
            <EmptyTable></EmptyTable>
          </template>
        </b-table>
        <div class="base-box">
          <router-link to="add">
          <button class="add-btn">新增会员</button>
          </router-link>
        </div>
      </div>

</div>

  </section>
</template>

<script>
  import { getMemberLsit ,deleteMember,updateInfo } from '@/api/member/memberinfo.js';
  import EmptyTable from '@/components/EmptyTable.vue';
  export default {
    data() {
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
        minDate:'',
        maxDate:'',
        temp:0,
        isOpen:true,
      }

    },
    components: {
      EmptyTable,
    },
    methods: {
      /*
       * Load async data
       */
      loadAsyncData(params) {
        this.pageModel(this, getMemberLsit, params);
    },
    //  设置开始，结束时间最大最小范围
      starDate(date){
        this.minDate = date;
        this.filters.startTime = date.getTime()/1000;
      },
      endDate(date){
        this.maxDate = date;
        this.filters.endTime = date.getTime()/1000;
      },
      serch(params){
        this.pageModel(this, getMemberLsit, params);
      },
      clear(){
        this.filters={}
      },
      deleteMem(id,index) {
        this.loading = true
        return deleteMember(id).then(response => {
          this.loading = false;
          this.model = response.data;
          this.pagination.records. splice(index, 1);
        }).catch(err => {
          this.loading = false;
        })
      },

      updateMem(member){

      if (this.isOpen){
        member.state=1
      } else {
        member.state=2
      }
        this.loading = true
   console.log(this.isOpen)
        return updateInfo(member.memberId,member).then(response => {
          this.loading = false;
        }).catch(err => {
          this.loading = false;
        })
      },

    /*
     * Handle page-change event
     */
    onPageChange(page) {
      if (this.pagination.page != page) {
        this.loadAsyncData({page:page});
      }
    },
    /*
     * Handle sort event
     */
    onSort(field, order) {
      this.sortField = field;
      this.sortOrder = order;
      this.loadAsyncData()
    },
    /*
     * 批量删除
     */
    onDeleteCheckedRows() {
      const vm = this;
      var checkedIds = vm.checkedRows.map(function(item) {
        return item.subsystemId;
      })
      this.batchDeleteModel(vm, batchDeleteSystem, checkedIds, () => this.loadAsyncData({page:this.pagination.page}));
    },
    /*
     * Type style in relation to the value
     */
    internalClass(value) {
      if (value == undefined) {
        return "is-black";
      }
      if (value) {
        return "is-success";
      }
      return "is-dark";
    },
      onDelete(id) {
        const vm = this;
        this.deleteModel(vm, deleteSystem, id, () => this.loadAsyncData({page:this.pagination.page}));
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
  created() {
    this.loadAsyncData();
  }
  }
</script>
