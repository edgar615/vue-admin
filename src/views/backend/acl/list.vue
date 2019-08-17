<template>
  <section>
    <nav class="level page-title">
      <!-- Left side -->
      <div class="level-left">
        <PageTitle></PageTitle>
        <div class="level-item">
          <b-select placeholder="角色" v-model="filters.roleId">
            <option value="">请选择</option>
            <option
                v-for="option in roles"
                :value="option.roleId"
                :key="option.roleId">
              {{ option.name }}
            </option>
          </b-select>
        </div>
        <div class="level-item">
          <b-input v-model="filters.resourceName" placeholder="资源名称"></b-input>
        </div>
        <div class="level-item">
          <p class="control ml-1">
            <button class="button" @click="loadAsyncData({page: 1})">
              <b-icon icon="magnify"></b-icon>
              <span>查询</span>
            </button>
          </p>
        </div>
      </div>

      <!-- Right side -->
      <div class="level-right">
        <div class="level-item">
          <div class="level-item">
            <button class="button is-primary" @click="addModal()">
              <b-icon icon="plus-circle-outline"></b-icon>
              <span>新增</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="card">
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

            <b-table-column field="companyType" label="角色">
              {{ props.row.roleName }}
            </b-table-column>

            <b-table-column field="resourceName" label="资源">
              {{ props.row.resourceName }}
            </b-table-column>

            <b-table-column field="operateType" label="操作类型">
              {{ operateTypeName(props.row.operateType) }}
            </b-table-column>

            <b-table-column field="prohibited" label="禁止">
              {{ $boolText(props.row.prohibited) }}
            </b-table-column>

            <b-table-column field="leftExpr" label="比较字段">
              {{ props.row.leftExpr }}
            </b-table-column>

            <b-table-column field="exprType" label="比较操作符">
              {{ $dictText('exprType',props.row.exprType) }}
            </b-table-column>

            <b-table-column field="rightExpr" label="比较值">
              {{ props.row.rightExpr }}
            </b-table-column>


            <b-table-column label="操作">
              <a @click="onDelete(props.row.aclConfigId)" :class="{'is-loading' : deleting}">
                删除
              </a>
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
  import {aclPage, deleteAcl} from '@/api/backend/acl'
  import {roleList} from '@/api/user/role'
  import AddForm from '@/views/backend/acl/add.vue'

  export default {
    data () {
      return {
        filters: {},
        pagination: {},
        loading: false,
        deleting: false,
        roles: []
      }
    },
    methods: {
      operateTypeName (operateType) {
        let array = []
        if ((operateType & 1) === 1) {
          array.push('读取')
        }
        if ((operateType & 2) === 2) {
          array.push('新增')
        }
        if ((operateType & 4) === 4) {
          array.push('修改')
        }
        if ((operateType & 8) === 8) {
          array.push('删除')
        }
        return array.join(',')
      },
      loadRoles () {
        const vm = this
        roleList().then(data => {
          vm.roles = data.data
        })
      },
      loadAsyncData (params) {
        this.$pageModelWithHistory(aclPage, params)
      },
      /*
       * Handle page-change event
       */
      onPageChange (page) {
        if (this.pagination.page !== page) {
          this.loadAsyncData({page: page})
        }
      },
      onDelete (id) {
        this.$deleteModel(deleteAcl, id,
          () => this.loadAsyncData({page: this.pagination.page}))
      },
      addModal () {
        const vm = this
        this.$formModal.open({
          parent: this,
          name: '新增ACL',
          width: '30rem',
          component: AddForm,
          onClose: () => { vm.loadAsyncData() }
        })
      }
    },
    created () {
      this.$fillParamFromHistory()
      this.loadRoles()
      this.loadAsyncData()
    }
  }
</script>
