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
              <b-icon icon="lock-open-outline"></b-icon>
              <span>活动</span>
            </b-radio-button>
            <b-radio-button v-model="filters.state"
                            native-value="2"
                            type="is-dark" class="is-dark-blue-lighter">
              <b-icon icon="lock-outline"></b-icon>
              <span>锁定</span>
            </b-radio-button>
            <b-radio-button v-model="filters.state"
                            native-value="">
              全部
            </b-radio-button>
          </b-field>
          <p class="control ml-1">
            <button class="button is-primary" @click="loadAsyncData">
              <b-icon icon="magnify"></b-icon>
              <span>查询</span>
            </button>
          </p>
        </b-field>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-content">

        <b-table
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
          pagination-size="is-small"

        >

          <template slot-scope="props">

            <b-table-column field="sorted" label="编码" numeric>
              {{ props.row.companyCode }}
            </b-table-column>

            <b-table-column field="name" label="名称">
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="state" label="状态">
              <span class="tag" :class="stateClass(props.row.state)">{{ $dictText(this, "companyState",props.row.state) }}</span>
            </b-table-column>

            <b-table-column field="address" label="地址">
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
  import {page} from '@/api/company';
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
        this.$pageModel(this, page, params)
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
