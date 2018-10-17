<template>
  <section>

    <div class="columns">
      <div class="column">
        招聘基本信息
      </div>
    </div>

    <b-field grouped group-multiline>
      <b-label class="label">所属门店：</b-label>
      <b-select placeholder="所属门店" v-model.trim="model.companyId">
        <option value="0">请选择</option>
        <option value="1">派多格惠新西街南口店</option>
      </b-select>
    </b-field>

    <b-field grouped group-multiline>
      <b-label class="label">招聘岗位：</b-label>
      <b-tabs v-model.trim="model.position">
        <b-tab-item label="美容师">
          <div class="block">
            <b-radio v-model="model.level"
                     native-value="0">
              C级
            </b-radio>
            <b-radio v-model.trim="model.level"
                     native-value="1">
              首席(派多格认证)
            </b-radio>
            <b-radio v-model.trim="model.level"
                     native-value="2">
              B级
            </b-radio>
            <b-radio v-model.trim="model.level"
                     native-value="3">
              A级
            </b-radio>
          </div>
        </b-tab-item>

        <b-tab-item label="训犬师">
          <div class="block">
            <b-radio v-model.trim="model.level"
                     native-value="4">
              C级(派多格认证)
            </b-radio>
            <b-radio v-model.trim="model.level"
                     native-value="5">
              初级
            </b-radio>
            <b-radio v-model.trim="model.level"
                     native-value="6">
              中级
            </b-radio>
            <b-radio v-model.trim="model.level"
                     native-value="7">
              高级
            </b-radio>
          </div>
        </b-tab-item>

        <b-tab-item label="其他">
          <div class="block">
            <b-input v-model.trim="model.position"></b-input>
          </div>
        </b-tab-item>
      </b-tabs>
    </b-field>


    <div class="columns">
      <div class="column">
        <b-field grouped group-multiline>
          <b-label class="label">招聘人数：</b-label>
          <b-input v-model.trim="model.recruitmentNum" ></b-input>
          <b-label class="label">人</b-label>
        </b-field>
      </div>


      <div class="column">
        <b-field grouped group-multiline>
          <b-label class="label">待遇：</b-label>
          <b-input v-modeltrim="model.minSalary" ></b-input>
          <b-label class="label"> - </b-label>
          <b-input v-model.trim="model.maxSalary" ></b-input>
          <b-label class="label"> 元 </b-label>
        </b-field>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <b-field grouped group-multiline>
          <b-label class="label">联系人：</b-label>
          <b-input v-model.trim="model.contact" ></b-input>
        </b-field>
      </div>

      <div class="column">
        <b-field grouped group-multiline>
          <b-label class="label">联系电话：</b-label>
          <b-input v-model.trim="model.contactNumber" ></b-input>
        </b-field>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <b-field grouped group-multiline>
          <b-label class="label">备注：</b-label>
          <b-input v-model.trim="model.description" ></b-input>
        </b-field>
      </div>
    </div>


    <b-label class="label">选择模板：</b-label>

    <button class="button is-primary" @click="save" :disabled='errors.any()'
            :class="{'is-loading' : saving}">
      <b-icon icon="check-circle"></b-icon>
      <span>保存</span>
    </button>
    <button class="button" @click="back">
      <b-icon icon="undo"></b-icon>
      <span>返回</span>
    </button>

  </section>
</template>
<script>
  import { addRecruitment} from '@/api/recruitment/recruitment';

  export default {
    data() {
      return {
        loading: false,
        saving: false,
        model: {
          companyId: 0,
          position: 1,
          radio: 'C级',
          level: 0,
          recruitmentNum: 0,
          minSalary: 0,
          maxSalary: 0,
          contact: "",
          contactNumber: 0,
          description: "",
        }
      }
    },
    methods: {
      back() {
        this.$router.back();
      },
      save() {
        const vm = this
        this.saveMode(vm, addRecruitment,() => vm.$router.push({ path: '/recruitment/danding' }));
      }
    }
  }
</script>
<style>

</style>
