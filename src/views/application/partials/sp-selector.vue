<template>
  <section>
    <div class="card">
      <div class="card-content">
        <b-field grouped group-multiline>
          <b-input v-model="filters.companyCode" placeholder="编码"></b-input>
          <b-input v-model="filters.name" placeholder="名称"></b-input>
          <b-field>
            <b-radio-button v-model="filters.state"
                            native-value="1"
                            type="is-success">
              <b-icon icon="unlock"></b-icon>
              <span>活动</span>
            </b-radio-button>
            <b-radio-button v-model="filters.state"
                            native-value="2"
                            type="is-dark" class="is-dark-blue-lighter">
              <b-icon icon="lock"></b-icon>
              <span>锁定</span>
            </b-radio-button>
            <b-radio-button v-model="filters.state"
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

        >

          <template slot-scope="props">

            <b-table-column field="sorted" label="编码" numeric centered>
              {{ props.row.companyCode }}
            </b-table-column>

            <b-table-column field="name" label="名称" centered>
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="state" label="状态" centered>
              <span class="tag" :class="stateClass(props.row.state)">{{ dictText(this, "companyState",props.row.state) }}</span>
            </b-table-column>

            <b-table-column field="address" label="地址" centered>
              {{ props.row.address }}
            </b-table-column>

            <b-table-column label="操作">
              <button class="button is-primary is-small" @click="doSelectSp(props.row)"
                      title="选择">
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
      /*
       * Load async data
       */
      loadAsyncData(params) {
        this.page(this, "/v1/company/page", params)
      },
      /*
       * Handle page-change event
       */
      onPageChange(page) {
        if (this.pagination.page != page) {
          this.loadAsyncData({page:page});
        }
      },
      stateClass(value) {
        if (value == undefined) {
          return "is-black";
        }
        if (value == 1) {
          return "is-success";
        }
        return "is-dark";
      },
      doSelectSp(sp) {
          this.$emit('onSelectSp', sp)
      }
    },
    created() {
      this.loadAsyncData();
    }
  }
</script>
