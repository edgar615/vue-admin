<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->
    <div id="header">
      满数量赠商品方案
    </div>
    <div class="wrap-box">
      <div class="message-box">

        <div class="Input-box">
          <b class="Input-title">供应商名称：</b>
          <b-input v-model="filters.sysIdentifier" placeholder="请输入供应商名称"></b-input>
        </div>
        <div class="Input-box">
          <b class="Input-title">时间：</b>
          <b-datepicker
            placeholder="开始日期"
            icon="calendar-today"
            @input="starDate"
            :max-date="maxDate">
          </b-datepicker>
          ~
          <b-datepicker
            placeholder="结束日期"
            icon="calendar-today"
            @input="endDate"
            :min-date="minDate">
          </b-datepicker>
        </div>

        <div class="Input-box">
          <b class="Input-title">促销类型：</b>
          <b-select placeholder="类型" v-model="filters.type">
            <option value="">请选择</option>
            <option
              v-for="option in dictList(this, 'systemType')"
              :value="option.dictValue"
              :key="option.dictValue">
              {{ option.dictText }}
            </option>
          </b-select>
        </div>
        <div class="Input-box">
          <b class="Input-title">促销状态：</b>
          <b-select placeholder="类型" v-model="filters.type">
            <option value="">请选择</option>
            <option
              v-for="option in dictList(this, 'systemType')"
              :value="option.dictValue"
              :key="option.dictValue">
              {{ option.dictText }}
            </option>
          </b-select>
        </div>

        <button class="button is-medium is-info">
          查询
        </button>
      </div>


      <div class="card mt-3">
        <div class="card-content">

          <div class="add">
            <router-link to="meetcommodity">
              <button class="button is-medium is-info add-franchiser">
                满数量增商品
              </button>
            </router-link>
          </div>
          <ul>
            <li style="width: auto;height: auto;display: flex;background: whitesmoke;margin-bottom: 1px" v-for="obj in test" >

              <div style="background: #00d1b2;vertical-align: middle;flex: 1;">
                <span style="display: block">{{obj.l.title}}</span>
                <span style="display: inline-block">{{obj.l.jiage}}</span>
              </div>

              <div style="background: #00d1b2;flex: 1;margin-left: 1px">
                <button>asdasd</button>
                <div  v-for="rig in obj.r">
                  <span style="display: block"> {{rig.title}}</span>
                  <span style="display: block"> {{rig.jiage}}</span>
                  <span style="display: inline-block"> {{rig.guge}}</span>
                </div>
              </div>
            </li>
          </ul>

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
