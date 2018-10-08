<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->
    <div class="card">
      <div class="card-content">
        <b-field grouped group-multiline>
          <b-input v-model="filters.sysIdentifier" placeholder="标识符"></b-input>
          <p class="control ml-1">
            <button class="button is-primary" @click="loadAsyncData">
              <b-icon pack="fa" icon="search"></b-icon>
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
                      title="选择" v-show="!appNotExists(props.row.subsystemId)">
                <b-icon pack="fa" icon="check-circle-o"></b-icon>
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
  import {systemPage} from '@/api/company';
  import EmptyTable from '@/components/EmptyTable.vue';
  export default {
    props: {
      applications: Array,
      companyId: {
          type: String,
          default: -1
      }
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
      appNotExists(id) {
          var exists = false;
        this.applications.forEach(function(item, index, input) {
            if (item.subsystemId == id) {
              exists = true;
            }
        })
        return exists;
      },
      loadAsyncData(params) {
        this.pageModel(this, systemPage, params)
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
  watch : {
        companyId(newCompanyId) {
          if (newCompanyId && newCompanyId != -1) {
            this.loadAsyncData();
          }
        }
  }
  }
</script>
