<template>
  <section>
    <!--buefy的form元素，也可以用原生的bulma实现,group-multiline会自动换行，position用于指定位置-->
    <!--如果一行放不下，用多个section-->

    <div class="wrap-box">
      <div class="message-box">
        <div class="top-portion">

          <div class="Input-box">
            <b class="Input-title first-title">会员手机</b>
            <b-input class="input-custom"  v-model="model.tel" ></b-input>
          </div>
          <div class="Input-box">
            <b class="Input-title ">会员名称</b>
            <b-input class="input-custom" v-model="model.name" ></b-input>
          </div>
          <div class="Input-box">
            <b class="Input-title">性别：</b>
            <b-radio v-model="model.gender"
                     native-value=1>
              男
            </b-radio>
            <b-radio v-model="model.gender"
                     native-value=2>
              女
            </b-radio>
          </div>
          <div class="Input-box">
            <b class="Input-title">出生日期：</b>
            <b-datepicker
              class="time-custom"
              placeholder="日期选择"
              v-model="date"
              icon="calendar-today"
              @input="starDatePet">
            </b-datepicker>
          </div>
        </div>
        <!--按钮部分-->
        <div class="bottom-btn">
          <button class="search-btn" @click="sbm">
            提交
          </button>
        </div>
      </div>
    </div>
    <b-loading :active.sync="loading"></b-loading>
  </section>
</template>

<script>
  import { getInfo ,updateInfo} from '@/api/member/memberinfo.js';
  function timetrans(date){
    var date = new Date(date*1000);//如果date为10位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y+M+D;
  }
  export default {
    data() {
      return {
        loading: false,
        model: {
        },
        petBirthday:0,
        date: new Date(),

      }
    },
    components: {

    },
    methods: {
      /*
       * Load async data
       */
      getModel(id){
        this.loading = true
      return getInfo(id).then(response => {
        this.model = response.data;
        this.date = new Date(timetrans(this.model.birthday));
        console.log(this.model.birthday+'')
          this.loading = false;
      }).catch(err => {
        this.loading = false;
      })}
      ,
      starDatePet(date){
        // console.log( new Date(date).Format("yyyy-M-d" )+'' );
        // this.petBirthday = date.getTime()/1000;

      },

      sbm(){

        if(this.model.name==''&&this.model.tel==''){
          this.$dialog.alert('会员名和手机号不能为空')
          return
        }

        this.loading = true
        return updateInfo(this.$route.params.id,this.model).then(response => {
          this.loading = false;
          this.$router.back(-1);
        }).catch(err => {
          this.loading = false;
        })
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
      this.getModel(this.$route.params.id)
    }
  }
</script>
