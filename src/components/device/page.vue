<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->
    <div class="mb-1">
      <b-field grouped group-multiline>
        <b-input v-model="filters.macAddress" placeholder="MAC地址"></b-input>
        <b-select placeholder="设备类型" v-model="filters.type">
          <option value="">设备类型</option>
          <option
            v-for="option in dictList('deviceType')"
            :value="option.value"
            :key="option.value">
            {{ option.text }}
          </option>
        </b-select>
        <b-field>
          <b-radio-button v-model="filters.isOnline"
                          native-value="true"
                          type="is-success">
            <b-icon icon="link"></b-icon>
            <span>在线</span>
          </b-radio-button>

          <b-radio-button v-model="filters.isOnline"
                          native-value="false"
                          type="is-warning">
            <b-icon icon="unlink"></b-icon>
            <span>离线</span>
          </b-radio-button>

          <b-radio-button v-model="filters.isOnline"
                          native-value="">
            全部
          </b-radio-button>
        </b-field>
        <p class="control ml-1">
          <button class="button is-primary" @click="onQuery">
            <b-icon icon="search"></b-icon>
            <span>查询</span>
          </button>
        </p>
      </b-field>
    </div>

    <div class="field is-grouped">
      <div class="buttons">
        <span class="button is-danger" @click="onDeleteCheckedRows" :disabled="!checkedRows.length">
          <b-icon icon="trash"></b-icon>
          <span>删除</span>
        </span>
        <span class="button is-purple">
           <b-icon icon="plus"></b-icon>
          <span>新增</span>
        </span>
        <span class="button is-danger">Cancel</span>
      </div>
    </div>

    <!--buefy的表格组件，具体用法查阅文档-->
    <b-table
      bordered
      striped
      hoverable
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
      checkable>

      <template slot-scope="props">

        <b-table-column field="deviceId" label="ID" numeric sortable centered>
          {{ props.row.deviceId }}
        </b-table-column>

        <b-table-column field="macAddress" label="MAC" meta="mac地址" centered>
          {{ props.row.macAddress }}
        </b-table-column>

        <b-table-column field="type" label="类型" numeric centered >
          {{ dictText("deviceType",props.row.type) }}
        </b-table-column>

        <b-table-column field="username" label="所有人" centered>
          {{ props.row.username }}
        </b-table-column>

        <b-table-column field="isOnline" label="在线" centered>
          <span class="tag" :class="onlineClass(props.row.isOnline)">{{ dictText("isOnline",props.row.isOnline) }}</span>
        </b-table-column>

        <b-table-column label="操作">
          <button class="button is-danger">
            <b-icon icon="trash"></b-icon>
            <span>删除</span>
          </button>
        </b-table-column>
      </template>
      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon
                icon="frown-o"
                size="is-large">
              </b-icon>
            </p>
            <p>无数据.</p>
          </div>
        </section>
      </template>
    </b-table>
  </section>
</template>

<script>
  import { devicePage } from '@/api/device';

  export default {
    data() {
      return {
        filters: {
        },
        pagination: {},
        loading: false,
        sortField: 'deviceId',
        sortOrder: 'desc',
        defaultSortOrder: 'desc',
        checkedRows: []
      }
    },
    methods: {
      /*
       * Load async data
       */
      loadAsyncData(params) {
        if (params == undefined) {
          params = {};
        }
        //如果表格没有拍下，不需要这些操作
        var sort = this.sortField;
        if (this.sortOrder == 'desc') {
          sort = "-" + sort;
        }
        params.sort = sort;
        params = Object.assign(this.filters, params);
        this.loading = true
        devicePage(params).then(response => {
          this.pagination = response.data;
           this.loading = false;
      });
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
      var checkedIds = this.checkedRows.map(function(item) {
        return item.deviceId;
      })
    },
    /*
     * 查询
     */
    onQuery() {
//      this.filters.page = 1;
      //Object.assign(this.filters, {page:1})filters是通过get/set方法处理，这个方法不能正常使用
      this.loadAsyncData();
    },
    /*
     * Type style in relation to the value
     */
    onlineClass(value) {
      if (value == undefined) {
        return "is-black";
      }
      if (value) {
        return "is-success";
      }
      return "is-dark";
    },
    dictText(name, value) {
      return this.$store.getters.dictText(name, value);
    },
    dictList(name) {
      return this.$store.getters.dictList(name);
    },
    typeName(value) {
      if (value == 1) {
        return "T1";
      } else if (value == 3) {
        return "F1";
      } else {
        return "未知";
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
  mounted() {
    this.loadAsyncData();
  }
  }
</script>
