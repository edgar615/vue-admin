<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->
    <div class="card">
      <div class="card-content">
        <b-field grouped group-multiline>
          <b-input v-model="filters.sysIdentifier" placeholder="标识符"></b-input>
          <b-select placeholder="类型" v-model="filters.type">
            <option value="">请选择</option>
            <option
              v-for="option in dictList(this, 'systemType')"
              :value="option.value"
              :key="option.value">
              {{ option.text }}
            </option>
          </b-select>
          <b-field>
            <b-radio-button v-model="filters.internal"
                            native-value="true"
                            type="is-success" class="is-dark-blue-lighter">
              <b-icon icon="user-secret"></b-icon>
              <span>内部访问</span>
            </b-radio-button>

            <b-radio-button v-model="filters.internal"
                            native-value="false"
                            type="is-info">
              <b-icon icon="folder-open"></b-icon>
              <span>公开</span>
            </b-radio-button>

            <b-radio-button v-model="filters.internal"
                            native-value="">
              全部
            </b-radio-button>
          </b-field>
          <p class="control ml-1">
            <button class="button is-primary" @click="loadAsyncData">
              <b-icon icon="search"></b-icon>
              <span>查询</span>
            </button>
          </p>
        </b-field>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-content">
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

          :rowClass="rowClass"
        >

          <template slot-scope="props">

            <b-table-column field="name" label="名称" centered>
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="sysIdentifier" label="标识符" centered>
              {{ props.row.sysIdentifier }}
            </b-table-column>

            <b-table-column field="type" label="类型"  centered >
              {{ dictText(this, "systemType",props.row.type) }}
            </b-table-column>

            <b-table-column field="type" label="图标"  centered >
               {{ props.row.icon }}
            </b-table-column>

            <b-table-column field="internal" label="内部?" centered>
              <span class="tag" :class="internalClass(props.row.internal)">{{ dictText(this, "internal",props.row.internal) }}</span>
            </b-table-column>

            <b-table-column label="操作">
              <button class="button is-primary is-small" @click="doSelectSystem(props.row)"
                      title="选择" v-show="!appNotExists(props.row.applicationId)">
                <b-icon icon="check-circle-o"></b-icon>
              </button>
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
  import EmptyTable from '@/components/EmptyTable.vue';
  export default {
    props: {
      applications: Array
    },
    data() {
      return {
        filters: {
        },
        pagination: {},
        loading: false
      }
    },
    components: {
      EmptyTable
    },
    methods: {
      rowClass(row, index) {
          if (this.appNotExists(row.applicationId)) {
              return "bg-primary";
          }
          return '';
      },
      appNotExists(id) {
          var exists = false;
        this.applications.forEach(function(item, index, input) {
            if (item.applicationId == id) {
              exists = true;
            }
        })
        return exists;
      },
      loadAsyncData(params) {
        this.page(this, "/v1/system/page", params)
    },
    /*
     * Handle page-change event
     */
    onPageChange(page) {
      if (this.pagination.page != page) {
        this.loadAsyncData({page:page});
      }
    },
    internalClass(value) {
      if (value == undefined) {
        return "is-black";
      }
      if (value) {
        return "is-success";
      }
      return "is-dark";
    },
      doSelectSystem(sys) {
        this.$emit('onSelectSystem', sys)
      }
  },
  created() {
    this.loadAsyncData();
  }
  }
</script>
