<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->

    <div class="wrap-box">
      <div class="message-box">
        <div class="top-portion">

        <div class="Input-box">
          <b class="Input-title first-title">订单编号：</b>
          <b-input v-model="name" class="input-custom" ></b-input>
        </div>

        <div class="Input-box">
          <b class="Input-title first-title">时间：</b>
          <b-datepicker
            class="time-custom"
            placeholder="开始日期"
            icon="calendar-today right-icon"
            @input="starDate"
            :max-date="maxDate">
          </b-datepicker>
          ~<b-datepicker
          class="time-custom"
          placeholder="结束日期"
          icon="calendar-today"
          @input="endDate"
          :min-date="minDate">
        </b-datepicker>
        </div>

        <div class="Input-box">
          <b class="Input-title">收支类型：</b>
          <b-select placeholder="类型" v-model="filters.type"  class="input-custom"  id="long-select">
            <option  class="input-custom" v-for="option in dictList(this, 'paymentType')"
              :value="option.dictValue"
              :key="option.dictValue">{{ option.dictText }}</option>
          </b-select>
        </div>

        </div>
        <!--按钮部分-->
        <div class="bottom-btn">
          <button class="search-btn">
            搜索
          </button>
          <button class="empty-btn">
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

            <b-table-column field="name" label="供应商" centered>
              {{ 自己 }}
            </b-table-column>

            <b-table-column field="transactionNumber" label="订单编号" centered>
              {{ props.row.transactionNumber }}
            </b-table-column>

            <b-table-column field="type" label="订单类型"  centered >
              {{ dictText(this, "paymentType",props.row.type) }}
            </b-table-column>

            <b-table-column field="transactionOn" label="订单生成时间"  centered >
               {{ props.row.transactionOn }}
            </b-table-column>

            <b-table-column field="operator" label="操作人员" centered>
              <!--<span class="tag" :class="internalClass(props.row.internal)">{{ dictText(this, "internal",props.row.internal) }}</span>-->
              {{ props.row.operator }}
            </b-table-column>

            <b-table-column   field="paymentType"  label="收支类型" centered>
              {{ dictText(this, "paymentType",props.row.paymentType) }}
            </b-table-column>
            <b-table-column field="amount" label="金额"  centered >
              {{ props.row.amount }}
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

<script>
  import { getFundrecord  } from '@/api/supply/promotion.js';
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
        temp:0
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
        this.pageModel(this, getFundrecord, params);
    },
    //  设置开始，结束时间最大最小范围
      starDate(date){
        this.minDate = date;
      },
      endDate(date){
        this.maxDate = date;
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
