<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->

    <div class="wrap-box">
      <div class="message-box">
        <div class="top-portion">

        <div class="Input-box">
          <b class="Input-title first-title">供应商名称</b>
          <b-input class="input-custom" v-model="filters.sysIdentifier" placeholder="请输入供应商名称"></b-input>
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

        <div class="Input-box">
          <b class="Input-title">促销类型</b>
          <b-select placeholder="类型" v-model="filters.type" class="input-custom" id="long-select">
            <option value="">请选择</option>
            <option
              class="input-custom"
              v-for="option in dictList(this, 'systemType')"
              :value="option.dictValue"
              :key="option.dictValue">
              {{ option.dictText }}
            </option>
          </b-select>
        </div>
        <div class="Input-box">
          <b class="Input-title">促销状态</b>
          <b-select placeholder="类型" v-model="filters.type" class="input-custom" id="long-select">
            <option value="">请选择</option>
            <option
              class="input-custom"
              v-for="option in dictList(this, 'systemType')"
              :value="option.dictValue"
              :key="option.dictValue">
              {{ option.dictText }}
            </option>
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
          @page-change="onPageChange">

          <template slot-scope="props">

            <b-table-column field="sorted" label="供应商"   centered>
              {{ props.row.sorted }}
            </b-table-column>

            <b-table-column field="name" label="促销活动名称" centered>
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="sysIdentifier" label="促销类型" centered>
              {{ props.row.sysIdentifier }}
            </b-table-column>

            <b-table-column field="type" label="促销开始时间"  centered >
              {{ dictText(this, "systemType",props.row.type) }}
            </b-table-column>

            <b-table-column field="type" label="促销结束时间"  centered >
               {{ props.row.icon }}
            </b-table-column>

            <b-table-column field="internal" label="促销品项数" centered>
              {{ props.row.sorted }}
            </b-table-column>

            <b-table-column field="internal" label="促销状态 " centered>
              <span class="tag" :class="internalClass(props.row.internal)">{{ dictText(this, "internal",props.row.internal) }}</span>
            </b-table-column>


            <b-table-column label="操作" centered>
              <router-link :to="{path:  '/backend/system/' +props.row.memberId + '/view' }"
                           exact >
                <a>查看</a>
              </router-link>
              <router-link :to="{path:  '/backend/system/' +props.row.memberId + '/view' }"
                           exact >
                <a>编辑</a>
              </router-link>
              <router-link :to="{path:  '/backend/system/' +props.row.memberId + '/view' }"
                           exact >
                <a>删除</a>
              </router-link>
            </b-table-column>
          </template>

        </b-table >
      <div class="base-box">
        <button class="add-btn">+新增满数量增商品</button>
      </div>
      <div class="base-box">
        <button class="add-btn">+新增满数量增商品</button>
      </div>
      <div class="base-box">
        <button class="add-btn">+新增满数量增商品</button>
      </div>
      <div class="base-box">
        <button class="add-btn">+新增满数量增商品</button>
      </div>
      </div>

    </div>


  </section>
</template>

<script>
  import { systemPage, deleteSystem, batchDeleteSystem } from '@/api/backend/system';
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
        test:[
          {
            l: {
                title:'超级大炸鸡',
                jiage:'$20'
              },
            r:[
              {
                title:'超级大礼包1',
                jiage:'$2',
                guige:'15cm'
              },
              {
                title:'超级大礼包2',
                jiage:'$5',
                guige:'15cm'
              }
            ]
          },
          {
            l: {
              title: '超级大炸鸡',
              jiage: '$20'
            },
            r: [
              {
                title: '超级大礼包1',
                jiage: '$2',
                guige:'15cm'
              },
              {
                title: '超级大礼包2',
                jiage: '$5',
                guige:'15cm'
              }
            ]
          },{
            l: {
              title: '超级大炸鸡',
              jiage: '$20'
            },
            r: [
              {
                title: '超级大礼包1',
                jiage: '$2',
                guige:'15cm'
              },

            ]
          },{
            l: {
              title: '超级大炸鸡',
              jiage: '$20'
            },
            r: [
              {
                title: '超级大礼包1',
                jiage: '$2',
                guige:'15cm'
              },
              {
                title: '超级大礼包2',
                jiage: '$5',
                guige:'15cm'
              }
            ]
          }
        ]
      }
    },
    components: {
      EmptyTable
    },
    methods: {
      /*
       * Load async data
       */
      loadAsyncData(params) {
        this.pageModel(this, systemPage, params)
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
