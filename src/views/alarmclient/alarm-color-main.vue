<template>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">颜色配置</p>
      </header>
      <section class="modal-card-body">
        <b-field label="1级" horizontal>
          <b-field>
            <b-radio-button v-model="model.radioGroup1"
                            native-value="primay"
                            type="is-primary">
              <span>紫色</span>
            </b-radio-button>
            <b-radio-button v-model="model.radioGroup1"
                            native-value="success"
                            type="is-success">
              <span>绿色</span>
            </b-radio-button>
            <b-radio-button v-model="model.radioGroup1"
                            native-value="info"
                            type="is-info">
              <span>蓝色</span>
            </b-radio-button>
            <b-radio-button v-model="model.radioGroup1"
                            native-value="warning"
                            type="is-warning">
              <span>黄色</span>
            </b-radio-button>
            <b-radio-button v-model="model.radioGroup1"
                            native-value="danger"
                            type="is-danger">
              <span>红色</span>
            </b-radio-button>
          </b-field>
        </b-field>
        <b-field label="2级" horizontal>
          <b-field>
            <b-radio-button v-model="model.radioGroup2"
                            native-value="primay"
                            type="is-primary">
              <span>紫色</span>
            </b-radio-button>
            <b-radio-button v-model="model.radioGroup2"
                            native-value="success"
                            type="is-success">
              <span>绿色</span>
            </b-radio-button>
            <b-radio-button v-model="model.radioGroup2"
                            native-value="info"
                            type="is-info">
              <span>蓝色</span>
            </b-radio-button>
            <b-radio-button v-model="model.radioGroup2"
                            native-value="warning"
                            type="is-warning">
              <span>黄色</span>
            </b-radio-button>
            <b-radio-button v-model="model.radioGroup2"
                            native-value="danger"
                            type="is-danger">
              <span>红色</span>
            </b-radio-button>
          </b-field>
        </b-field>
        <b-field label="3级" horizontal>
          <b-field>
            <b-radio-button v-model="model.radioGroup3"
                            native-value="primay"
                            type="is-primary">
              <span>紫色</span>
            </b-radio-button>
            <b-radio-button v-model="model.radioGroup3"
                            native-value="success"
                            type="is-success">
              <span>绿色</span>
            </b-radio-button>
            <b-radio-button v-model="model.radioGroup3"
                            native-value="info"
                            type="is-info">
              <span>蓝色</span>
            </b-radio-button>
            <b-radio-button v-model="model.radioGroup3"
                            native-value="warning"
                            type="is-warning">
              <span>黄色</span>
            </b-radio-button>
            <b-radio-button v-model="model.radioGroup3"
                            native-value="danger"
                            type="is-danger">
              <span>红色</span>
            </b-radio-button>
          </b-field>
        </b-field>
        <b-field label="4级" horizontal>
          <b-field>
            <b-radio-button v-model="model.radioGroup4"
                            native-value="primay"
                            type="is-primary">
              <span>紫色</span>
            </b-radio-button>
            <b-radio-button v-model="model.radioGroup4"
                            native-value="success"
                            type="is-success">
              <span>绿色</span>
            </b-radio-button>
            <b-radio-button v-model="model.radioGroup4"
                            native-value="info"
                            type="is-info">
              <span>蓝色</span>
            </b-radio-button>
            <b-radio-button v-model="model.radioGroup4"
                            native-value="warning"
                            type="is-warning">
              <span>黄色</span>
            </b-radio-button>
            <b-radio-button v-model="model.radioGroup4"
                            native-value="danger"
                            type="is-danger">
              <span>红色</span>
            </b-radio-button>
          </b-field>
        </b-field>
        <b-field label="5级" horizontal>
          <b-field>
            <b-radio-button v-model="model.radioGroup5"
                            native-value="primay"
                            type="is-primary">
              <span>紫色</span>
            </b-radio-button>
            <b-radio-button v-model="model.radioGroup5"
                            native-value="success"
                            type="is-success">
              <span>绿色</span>
            </b-radio-button>
            <b-radio-button v-model="model.radioGroup5"
                            native-value="info"
                            type="is-info">
              <span>蓝色</span>
            </b-radio-button>
            <b-radio-button v-model="model.radioGroup5"
                            native-value="warning"
                            type="is-warning">
              <span>黄色</span>
            </b-radio-button>
            <b-radio-button v-model="model.radioGroup5"
                            native-value="danger"
                            type="is-danger">
              <span>红色</span>
            </b-radio-button>
          </b-field>
        </b-field>
        <b-field horizontal><!-- Label left empty for spacing -->
          <p class="control">
            <button class="button is-primary" @click="$parent.close()">
              <b-icon icon="check-circle"></b-icon>
              <span>保存</span>
            </button>
            <button class="button" @click="$parent.close()">
              <b-icon icon="undo"></b-icon>
              <span>关闭</span>
            </button>
          </p>
        </b-field>
      </section>
    </div>
</template>

<script>
  import AlarmHandle from '@/views/alarmclient/partials/alarm-handle'
  import AlarmCheck from '@/views/alarmclient/partials/alarm-check'
  import AlarmHistory from '@/views/alarmclient/partials/alarm-history'
  export default {
    data() {
      return {
        model: {
          radioGroup1 : 'success',
          radioGroup2 : 'info',
          radioGroup3 : 'primay',
          radioGroup4 : 'warning',
          radioGroup5 : 'danger'
        }
      }
    }
  }
</script>

<style scoped>
  .modal-card {
    width: 480px;
  }
</style>
