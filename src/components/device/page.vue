<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->
    <section class="mb-1">
      <b-field grouped group-multiline>
        <b-input v-model="query.macAddress" placeholder="MAC地址"></b-input>
        <b-select placeholder="设备类型" v-model="query.type">
          <option value="">设备类型</option>
          <option
            v-for="option in deviceTypes"
            :value="option.value"
            :key="option.value">
            {{ option.text }}
          </option>
        </b-select>
        <b-field>
          <b-radio-button v-model="query.isOnline"
                          native-value="true"
                          type="is-success">
            <b-icon icon="link"></b-icon>
            <span>在线</span>
          </b-radio-button>

          <b-radio-button v-model="query.isOnline"
                          native-value="false"
                          type="is-warning">
            <b-icon icon="unlink"></b-icon>
            <span>离线</span>
          </b-radio-button>

          <b-radio-button v-model="query.isOnline"
                          native-value="">
            全部
          </b-radio-button>
        </b-field>
        <p class="control ml-1">
          <button class="button is-primary">Search</button>
        </p>
      </b-field>
    </section>

    <section class="mb-1 is-right">
      <b-field grouped group-multiline position="is-right">
        <p class="control ml-1">
          <button class="button">
            <b-icon icon="plus"></b-icon>
            <span>新增</span>
          </button>
        </p>
      </b-field>
    </section>
    <!--buefy的表格组件，具体用法查阅文档-->
    <b-table
      bordered
      striped
      hoverable
      mobile-cards

      :data="pagination.records"
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
      @sort="onSort">

      <template slot-scope="props">

        <b-table-column field="deviceId" label="ID" numeric sortable centered>
          {{ props.row.deviceId }}
        </b-table-column>

        <b-table-column field="macAddress" label="MAC" meta="mac地址" centered>
          {{ props.row.macAddress }}
        </b-table-column>

        <b-table-column field="type" label="类型" numeric centered >
          {{ typeName(props.row.type) }}
        </b-table-column>

        <b-table-column field="username" label="拥有者" centered>
          {{ props.row.username }}
        </b-table-column>

      </template>
    </b-table>
  </section>
</template>

<script>
  import { devicePage } from '@/api/device';

  export default {
    data() {
      return {
        query: {
        },
        pagination: {},
        loading: false,
        sortField: 'deviceId',
        sortOrder: 'desc',
        defaultSortOrder: 'desc',
        deviceTypes : [
          {value : 1,text: "T1"},
          {value : 2,text: "猫眼"},
          {value : 3,text: "F1"},
          {value : 4,text: "201"}
        ]
      }
    },
    methods: {
      /*
       * Load async data
       */
      loadAsyncData(params) {
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
      this.loadAsyncData({page:page});
    },
    /*
     * Handle sort event
     */
    onSort(field, order) {
      this.sortField = field
      this.sortOrder = order
      this.loadAsyncData({page:this.pagination.page})
    },
    /*
     * Type style in relation to the value
     */
    type(value) {
      if (!value) {
        return "";
      }
      const number = parseFloat(value)
      if (number < 6) {
        return 'is-danger'
      } else if (number >= 6 && number < 8) {
        return 'is-warning'
      } else if (number >= 8) {
        return 'is-success'
      }
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
    this.loadAsyncData({page:1})
  }
  }
</script>
