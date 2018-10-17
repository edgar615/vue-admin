<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->
    <div id="header">
      新增会员
    </div>
    <div class="wrap-box">
      <div class="message-box">

    <div>基本信息</div>

        <div class="Input-box">
          <b class="Input-title">会员名称：</b>
          <b-input v-model="member.name" ></b-input>
        </div>
        <div class="Input-box">
          <b class="Input-title">会员手机号：</b>
          <b-input v-model="member.tel" ></b-input>
        </div>
        <div class="Input-box">
          <b class="Input-title">性别：</b>

          <b-radio v-model="member.gender"
                   native-value=1>
            男
          </b-radio>
          <b-radio v-model="member.gender"
                   @input="click"
                   native-value=2>
            女
          </b-radio>

        </div>

        <div class="Input-box">
          <b class="Input-title">出生日期：</b>
          <b-datepicker
            placeholder="日期选择"
            icon="calendar-today"
            @input="starDate" >
          </b-datepicker>
        </div>

        <div>宠物信息</div>
        <div class="Input-box">
          <b class="Input-title">宠物名称：</b>
          <b-input v-model="petName" ></b-input>
        </div>
        <div class="Input-box">
          <b class="Input-title">宠物品种：</b>
          <b-input v-model="petVariety" ></b-input>
        </div>
        <div class="Input-box">
          <b class="Input-title">出生日期：</b>
          <b-datepicker
            placeholder="日期选择"
            icon="calendar-today"
            @input="starDatePet">
          </b-datepicker>
        </div>
        <div class="Input-box">
          <b class="Input-title">身高：</b>
          <b-input v-model="petHeight" ></b-input>
        </div>        <div class="Input-box">
          <b class="Input-title">体重：</b>
          <b-input v-model="petWeight" ></b-input>
        </div>
        <div class="Input-box">
          <b class="Input-title">性别：</b>
          <b-radio v-model=petGender
                   native-value=1>
            公
          </b-radio>
          <b-radio v-model=petGender
                   native-value=2>
            母
          </b-radio>

        </div>

        <!--<div class="Input-box">-->
          <!--<b class="Input-title">身高：</b>-->
          <!--<b-input v-model="name" ></b-input>-->
        <!--</div>-->
        <div class="add">

            <button class="button is-medium is-info add-franchiser" @click="addPet">
              新增宠物
            </button>

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

          :data="(member.addMemberPetReqList && member.addMemberPetReqList.length == 0) ? [] : member.addMemberPetReqList"
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

          :checked-rows.sync="checkedRows">

          <template slot-scope="props">

            <b-table-column field="companyId" label="序号"  centered  >
              {{props.index+1}}
            </b-table-column>

            <b-table-column field="name" label="名称" centered>
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="transactionNumber" label="种类" centered>
              {{ props.row.petVariety }}
            </b-table-column>

            <b-table-column field="type" label="出生日期"  centered >
              {{ props.row.birthday}}
              <!--{{ dictText(this, "paymentType",props.row.type) }}-->
            </b-table-column>

            <b-table-column field="transactionOn" label="身高"  centered >
               {{ props.row.height }}
            </b-table-column>

            <b-table-column field="operator" label="体重" centered>
              <!--<span class="tag" :class="internalClass(props.row.internal)">{{ dictText(this, "internal",props.row.internal) }}</span>-->
              {{ props.row.weight }}
            </b-table-column>

            <b-table-column   field="paymentType"  label="性别" centered>
              <!--{{ dictText(this, "paymentType",props.row.paymentType) }}-->
              {{ props.row.gender }}
            </b-table-column>

            <!--<b-table-column field="amount" label="签名"  centered >-->
              <!--{{ props.row.amount }}-->
            <!--</b-table-column>-->
            <b-table-column field="type" label="操作"  centered >

              <router-link :to="{path:  '/backend/system/' +props.row.subsystemId + '/view' }"
                           exact class="button is-info is-small" title="订单详情">
                <b-icon icon="information-outline"></b-icon>
              </router-link>

            </b-table-column>
          </template>
          <template slot="empty">
            <EmptyTable></EmptyTable>
          </template>
        </b-table>
        <button class="button is-medium is-info add-franchiser" @click="requestAddMember">
          新增
        </button>
      </div>
    </div>
</div>


  </section>
</template>

<script>
  import { addMember  } from '@/api/member/memberinfo.js';
  import EmptyTable from '@/components/EmptyTable.vue';

  Date.prototype.Format = function(fmt)
  { //author: meizz
    var o = {
      "M+" : this.getMonth()+1,                 //月份
      "d+" : this.getDate(),                    //日
      "h+" : this.getHours(),                   //小时
      "m+" : this.getMinutes(),                 //分
      "s+" : this.getSeconds(),                 //秒
      "q+" : Math.floor((this.getMonth()+3)/3), //季度
      "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
      fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
      if(new RegExp("("+ k +")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
  }
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
        temp:0,

        member:{
          name:'',
          tel:'',
          gender: 1,
          birthday:null,
          memberPoints:0,
          addMemberPetReqList: [],

        },

        petName:'',
        petVariety:'',
        petBirthday:null,
        petHeight:null,
        petWeight:null,
        petGender:1,




      }
    },
    components: {
      EmptyTable,

    },
    methods: {
      /*
       * Load async data
       */
      loadAsyncData(params) {
        this.pageModel(this, getFundrecord, params);

    },

      addPet() {
        var pet = {};
        pet.name= this.petName;
        pet.petVariety= this.petVariety;
        pet.birthday= this.petBirthday;
        pet.height= this.petHeight;
        pet.weight= this.petWeight;
        pet.gender= this.petGender;
         this.member.addMemberPetReqList. push(pet);
      },
    //  设置开始，结束时间最大最小范围
      starDate(date){
        this.member.birthday = date.getTime()/1000;
      },
      starDatePet(date){
         // console.log( new Date(date).Format("yyyy-M-d" )+'' );
        this.petBirthday = date.getTime()/1000;

      },

   requestAddMember() {
     var result;

    this.loading = true
    return addMember(this.member).then(response => {
      result = response.data;
      console.log(result)
      this.loading = false;
    }).catch(err => {
      this.loading = false;
    })
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
  created() {
    this.loadAsyncData();
  }
  }
</script>
