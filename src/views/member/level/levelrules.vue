<template>
    <section style="padding: 20px 20px 31px 20px;">
      <div class="card">
        <div class="card-content" style="padding: 40px;">

          <div class="add-Wrap">
            <!--<b-field label="加盟商姓名(必填)">-->
              <!--<b-input class="add-input"></b-input>-->
            <!--</b-field>-->
            <div class="area-wrap">
              <span class="left-title"> 累计消费:</span>
              <b-input type="text" class="right-input"></b-input>
            </div>



            <div class="present-btn">
              <button class="submit" @click="">
                提交
              </button>
              <button class="cancel" @click="">
                取消
              </button>
            </div>


          </div>
          <!--add-wrap结束符-->
        </div>

      </div>
      <!--外部盒子结束符-->
    </section>
</template>
<script>
  import { addSystem} from '@/api/backend/system';

  export default {
    data() {
    return {
      loading: false,
      saving: false,
      url1:'',
      url2:'',
      url3:'',
      name:'',
      model: {
      }
    }
  },
  methods: {
      back() {
        this.$router.back();
      },
      save() {
          // const vm = this
          // this.saveMode(vm, addSystem,() => vm.$router.push({ path: '/backend/system' }));
      },
      // 文件上传

    }
  }
</script>
<style>
  .right-input{

  }
</style>
