<template>
  <section>
    <div class="card">
      <div class="card-content">
        <b-field grouped group-multiline>
          <b-input v-model="filters.name" placeholder="名称"></b-input>
          <b-field>
            <b-radio-button v-model="filters.state"
                            native-value="1"
                            type="is-success">
              <b-icon icon="lock"></b-icon>
              <span>未发布</span>
            </b-radio-button>
            <b-radio-button v-model="filters.state"
                            native-value="2"
                            type="is-dark" class="is-dark-blue-lighter">
              <b-icon icon="unlock"></b-icon>
              <span>已发布</span>
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
        <div class="field is-grouped">
          <div class="buttons">
            <router-link to="/child/promotion/add"
                         exact class="button is-primary">
              <b-icon icon="plus"></b-icon>
              <span>新增</span>
            </router-link>
          </div>
        </div>

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

          detailed
          detail-key="companyId"
        >

          <template slot-scope="props">

            <b-table-column field="companyCode" label="活动名称" centered>
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="name" label="活动时间" centered>
              {{ props.row.timeDesc }}
            </b-table-column>

            <b-table-column field="state" label="状态" centered>
              <span class="tag" :class="stateClass(props.row.state)">{{ dictText(this, "promotionState",props.row.state) }}</span>
            </b-table-column>

            <b-table-column field="name" label="添加时间" centered>
              {{ props.row.addOn }}
            </b-table-column>

            <b-table-column label="操作">
              <router-link :to="{path:  '/child/promotion/' +props.row.promotionId + '/edit' }"
                           exact class="button is-small" title="修改">
                <b-icon icon="pencil"></b-icon>
              </router-link>
              <button class="button is-danger is-small" @click="publish(props.row.promotionId)"
                      title="发布" v-show="props.row.state == 1">
                <b-icon icon="unlock"></b-icon>
              </button>
            </b-table-column>
          </template>
          <template slot="empty">
            <EmptyTable></EmptyTable>
          </template>
          <template slot="detail" slot-scope="props">
            <div class="columns is-size-7">
              <div class="column">
                <b-field label="地址" horizontal class="static-field">
                  <p class="control is-size-7">
                    {{ props.row.address}}
                 </p>
                </b-field>
              </div>
            </div>
          </template>
        </b-table>
      </div>
    </div>


  </section>
</template>

<script>
  import {publish} from '@/api/child/promotion';
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
        this.page(this, "/v1/promotion/page", params)
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
    doUnLock(id) {
      publish(id).then(response => {
        this.loadAsyncData({page:this.pagination.page});
      })
    }
  },
  created() {
    this.loadAsyncData();
  }
  }
</script>
