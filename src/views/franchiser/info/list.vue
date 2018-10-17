<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->
    <!--<div class="card">-->
      <!--<div class="card-content">-->
        <!--<b-field grouped group-multiline>-->
          <!--<b-input v-model="filters.sysIdentifier" placeholder="标识符"></b-input>-->
          <!--<b-select placeholder="类型" v-model="filters.type">-->
            <!--<option value="">请选择</option>-->
            <!--<option-->
              <!--v-for="option in dictList(this, 'systemType')"-->
              <!--:value="option.dictValue"-->
              <!--:key="option.dictValue">-->
              <!--{{ option.dictText }}-->
            <!--</option>-->
          <!--</b-select>-->
          <!--<p class="control ml-1">-->
            <!--<button class="button is-primary" @click="loadAsyncData">-->
              <!--<b-icon icon="magnify"></b-icon>-->
              <!--<span>查询</span>-->
            <!--</button>-->
          <!--</p>-->
        <!--</b-field>-->
      <!--</div>-->
    <!--</div>-->

    <!--<div class="card mt-3">-->
      <!--<div class="card-content">-->
        <!--<div class="field is-grouped">-->
          <!--<div class="buttons">-->
        <!--<span class="button is-danger" @click="onDeleteCheckedRows" :disabled="!checkedRows.length"-->
              <!--:class="{'is-loading' : deleting}">-->
          <!--<b-icon icon="delete-outline"></b-icon>-->
          <!--<span>删除</span>-->
        <!--</span>-->
            <!--<router-link to="/backend/system/add"-->
                         <!--exact class="button is-primary">-->
              <!--<b-icon icon="plus-circle-outline"></b-icon>-->
              <!--<span>新增</span>-->
            <!--</router-link>-->
          <!--</div>-->
        <!--</div>-->

        <!--&lt;!&ndash;buefy的表格组件，具体用法查阅文档&ndash;&gt;-->
        <!--<b-table-->
          <!--bordered-->
          <!--striped-->
          <!--hoverable-->
          <!--narrowed-->
          <!--mobile-cards-->

          <!--:data="(pagination.records && pagination.records.length == 0) ? [] : pagination.records"-->
          <!--:loading="loading"-->
          <!--paginated-->
          <!--backend-pagination-->
          <!--:total="pagination.totalRecords"-->
          <!--:per-page="pagination.pageSize"-->
          <!--:current-page="pagination.page"-->
          <!--@page-change="onPageChange"-->

          <!--backend-sorting-->
          <!--:default-sort-direction="defaultSortOrder"-->
          <!--:default-sort="[sortField, sortOrder]"-->
          <!--@sort="onSort"-->

          <!--:checked-rows.sync="checkedRows"-->
          <!--checkable-->
        <!--&gt;-->

          <!--<template slot-scope="props">-->

            <!--<b-table-column field="sorted" label="排序" numeric sortable centered>-->
              <!--{{ props.row.sorted }}-->
            <!--</b-table-column>-->

            <!--<b-table-column field="name" label="名称" centered>-->
              <!--{{ props.row.name }}-->
            <!--</b-table-column>-->

            <!--<b-table-column field="sysIdentifier" label="标识符" centered>-->
              <!--{{ props.row.sysIdentifier }}-->
            <!--</b-table-column>-->

            <!--<b-table-column field="type" label="类型"  centered >-->
              <!--{{ dictText(this, "systemType",props.row.type) }}-->
            <!--</b-table-column>-->

            <!--<b-table-column field="type" label="图标"  centered >-->
               <!--{{ props.row.icon }}-->
            <!--</b-table-column>-->

            <!--<b-table-column field="internal" label="内部访问?" centered>-->
              <!--<span class="tag" :class="internalClass(props.row.internal)">{{ dictText(this, "internal",props.row.internal) }}</span>-->
            <!--</b-table-column>-->

            <!--<b-table-column label="操作">-->
              <!--<router-link :to="{path:  '/backend/system/' +props.row.subsystemId + '/view' }"-->
                           <!--exact class="button is-info is-small" title="查看">-->
                <!--<b-icon icon="information-outline"></b-icon>-->
              <!--</router-link>-->
              <!--<router-link :to="{path:  '/backend/system/' +props.row.subsystemId + '/edit' }"-->
                           <!--exact class="button is-small" title="修改">-->
                <!--<b-icon icon="circle-edit-outline"></b-icon>-->
              <!--</router-link>-->
              <!--<button class="button is-danger is-small" @click="onDelete(props.row.subsystemId)"-->
                      <!--title="删除" :class="{'is-loading' : deleting}">-->
                <!--<b-icon icon="delete-outline"></b-icon>-->
              <!--</button>-->
              <!--<router-link :to="{path:  '/backend/system/' +props.row.subsystemId + '/permissions' }"-->
                           <!--exact class="button is-info is-small" title="菜单管理">-->
                <!--<b-icon icon="menu"></b-icon>-->
              <!--</router-link>-->
            <!--</b-table-column>-->
          <!--</template>-->
          <!--<template slot="empty">-->
            <!--<EmptyTable></EmptyTable>-->
          <!--</template>-->
        <!--</b-table>-->
      <!--</div>-->
    <!--</div>-->

    <!--头部标题栏-->
    <!--<div id="header">-->
      <!--加盟商管理-->
    <!--</div>-->

    <div class="wrap-box">
      <!--头部盒子-->
      <div class="message-box">
        <!--上部分盒子-->
        <div class="top-portion">
          <div class="Input-box">
            <b class="Input-title first-title">姓名搜索</b>
            <b-input v-model="name" class="input-custom"></b-input>
          </div>

          <div class="Input-box">
            <!--<b class="Input-title">所属业务组：</b>-->
            <!--<input type="text" class="Input" placeholder="" id="Business" name="Business">-->
            <b class="Input-title">所属业务</b>
            <b-input v-model="name" class="input-custom"></b-input>
          </div>

          <div class="Input-box">
            <b class="Input-title">加盟状态</b>
            <b-select placeholder="授权中" class="input-custom" id="long-select">
              <option
                class="input-custom"
                v-for="option in data"
                :value="option.id"
                :key="option.id">
                {{ option.user.state }}
              </option>
            </b-select>
          </div>

          <div class="Input-box">
            <b class="Input-title">加盟方式</b>
            <b-select placeholder="授权中" class="input-custom" id="long-select">
              <option
                class="input-custom"
                v-for="option in data"
                :value="option.id"
                :key="option.id">
                {{ option.user.state }}
              </option>
            </b-select>
          </div>

        </div>

        <!--下部分盒子-->
        <div class="bottom-portion">
          <div class="Input-box">
            <b class="Input-title first-title">加盟时间</b>
            <b-datepicker
              placeholder="开始时间"
              icon="calendar-today right-icon"
              class="time-custom">
            </b-datepicker>
            <b-datepicker
              placeholder="结束时间"
              icon="calendar-today"
              class="time-custom">
            </b-datepicker>
          </div>

          <div class="Input-box">
            <div class="field is-grouped-multiline is-grouped">
              <b class="Input-title">所属地区</b>
              <b-select placeholder="北京">
                <option value="北京">北京</option>
                <option value="上海">上海</option>
                <option value="湖北">湖北</option>
                <option value="重庆">重庆</option>
                <option value="广东">广东</option>
              </b-select>
              <b-select placeholder="北京市">
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
                <option value="vane">Vane</option>
                <option value="billy">Billy</option>
                <option value="jack">Jack</option>
              </b-select>
              <b-select placeholder="朝阳区">
                <option value="朝阳区">朝阳区</option>
                <option value="silver">Silver</option>
                <option value="vane">Vane</option>
                <option value="billy">Billy</option>
                <option value="jack">Jack</option>
              </b-select>
            </div>
          </div>

        </div>

        <!--按钮部分-->
        <div class="bottom-btn">
          <button class="search-btn">
            搜索
          </button>
          <button class="empty-btn">
            清空
          </button>
        </div>

      </div>
      <!--头部盒子结束符-->

      <!--下部分数据表格-->
      <!--buefy的表格组件，具体用法查阅文档-->
      <div class="card mt-3 Table-custom"  rules=none>

          <!--添加加盟商按钮-->
          <!--<div class="field is-grouped">-->
            <!--<div class="buttons">-->
              <!--<router-link to="add" class="button is-primary">-->
                <!--<span class="icon"><i class="mdi mdi-plus-circle-outline mdi-24px"></i></span> <span>新增加盟商</span>-->
              <!--</router-link>-->
            <!--</div>-->
          <!--</div>-->

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

            backend-sorting
            :default-sort-direction="defaultSortOrder"
            :default-sort="[sortField, sortOrder]"
            @sort="onSort"

          >

            <template slot-scope="props">
              <b-table-column field="name" label="序号">
                {{ props.row.name }}
              </b-table-column>
              <b-table-column field="name" label="加盟商姓名">
                {{ props.row.name }}
              </b-table-column>

              <b-table-column field="franchiserId" label="加盟商编号">
                {{ props.row.franchiserId }}
              </b-table-column>

              <b-table-column field="businessGroup" label="所属业务组">
                {{ props.row.businessGroup }}
              </b-table-column>

              <b-table-column field="contactNumber" label="联系电话" >
                {{ props.row.contactNumber }}
              </b-table-column>

              <b-table-column field="address" label="地址">
                {{ props.row.address }}
              </b-table-column>

              <b-table-column field="authorizationStartDate" label="授权时间">
                {{ props.row.authorizationStartDate }}
                {{ props.row.authorizationEndDate }}
              </b-table-column>

              <b-table-column field="state" label="授权状态">
                {{ dictText(this, "accreditState",props.row.state) }}
              </b-table-column>

              <b-table-column field="type" label="授权协议">
                <router-link :to="{path:  '/backend/system/' +props.row.subsystemId + '/view' }"
                             exact class="table-compile" title="查看">
                    查看
                </router-link>
              </b-table-column>

              <b-table-column field="type" label="营业执照">
                <router-link :to="{path:  '/backend/system/' +props.row.subsystemId + '/view' }"
                             exact class="table-compile" title="查看">
                  查看
                </router-link>
              </b-table-column>

              <b-table-column label="操作">
                <router-link :to="{path:  '/backend/system/' +props.row.subsystemId + '/edit' }"
                             exact class="table-compile" title="修改">
                  编辑
                </router-link>
                <router-link :to="{path:  '/backend/system/' +props.row.subsystemId + '/permissions' }"
                             exact class="table-manage" title="菜单管理">
                  管理
                </router-link>
                <router-link to="" @click="onDelete(props.row.subsystemId)"
                        title="删除" :class="{'is-loading' : deleting}">
                  <span class="table-delete">删除</span>
                </router-link>
              </b-table-column>
            </template>
            <!--分页器-->
            <!--<template slot="empty">-->
              <!--<EmptyTable></EmptyTable>-->
            <!--</template>-->
          </b-table striped>

          <div class="base-box">
             <router-link to="add">
               <button class="add-btn">新增</button>
             </router-link>
            <button class="second">删除</button>
          </div>


      </div>
      <!--card结束符-->

    </div>

  </section>
</template>

<script>
  import { franchiserList } from '@/api/franchiser/franchiserlist.js';
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
        isSwitched: true,
        isSwitchedTwo: true,
        // 分页器
        total: 2,
        current: 1,
        perPage: 5,
        order: '',
        size: '',
        isSimple: false,
        isRounded: false
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
        this.pageModel(this, franchiserList, params)
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
      },
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
<style scoped>
  /*@import '../../../styles/Commonality.css';*/
  .pl-3{
    padding: 0!important;
  }
</style>
