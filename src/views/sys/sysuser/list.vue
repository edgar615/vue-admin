<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->
    <div class="card">
      <div class="card-content">
        <b-field grouped group-multiline>
          <b-input v-model="filters.username" placeholder="用户名"></b-input>
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
        <div class="field is-grouped">
          <div class="buttons">
            <router-link to="/sys/sysuser/add"
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

        >

          <template slot-scope="props">

            <b-table-column field="username" label="用户名" centered>
              {{ props.row.username }}
            </b-table-column>

            <b-table-column field="fullname" label="姓名" centered>
              {{ props.row.fullname }}
            </b-table-column>

            <b-table-column field="state" label="状态" centered>
              <span class="tag" :class="stateClass(props.row.state)">{{ dictText(this, "userState",props.row.state) }}</span>
            </b-table-column>

            <b-table-column label="操作">
              <button class="button is-danger is-small" @click="doLock(props.row.sysUserId)"
                      title="锁定" v-show="props.row.state == 1">
                <b-icon icon="lock"></b-icon>
              </button>
              <button class="button is-danger is-small" @click="doUnLock(props.row.sysUserId)"
                      title="解锁" v-show="props.row.state == 2">
                <b-icon icon="unlock"></b-icon>
              </button>
              <router-link :to="{path:  '/sys/sysuser/' +props.row.sysUserId + '/permit' }"
                           exact class="button is-info is-small" title="授权">
                <b-icon icon="key"></b-icon>
              </router-link>
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
  import {lock, unLock} from '@/api/sys/sysuser';
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
        this.page(this, "/v1/sysuser/page", params)
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
    doLock(id) {
      lock(id).then(response => {
        this.loadAsyncData({page:this.pagination.page});
      })
    },
    doUnLock(id) {
      unLock(id).then(response => {
        this.loadAsyncData({page:this.pagination.page});
      })
    }
  },
  created() {
    this.loadAsyncData();
  }
  }
</script>
