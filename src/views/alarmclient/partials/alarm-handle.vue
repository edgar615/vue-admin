<template>
  <section>
    <div class="card mt-0">
      <header class="card-header">
        <p class="card-header-title">
          基本信息
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </span>
        </a>
      </header>
      <div class="card-content">
        <div class="columns">
          <div class="column is-half is-size-7">
            <b-field label="单位名称" horizontal class="static-field">
              <p class="control is-size-7">
                武汉动物园
               </p>
            </b-field>
            <b-field label="单位类别" horizontal class="static-field">
              <p class="control is-size-7">
                园区
               </p>
            </b-field>
            <b-field label="消防控制室电话" horizontal class="static-field">
              <p class="control is-size-7">
                02740091221
                  <button class="button is-small">
                <b-icon  icon="phone" size="is-small"></b-icon>
              </button>
               </p>
            </b-field>
            <b-field label="安全责任人" horizontal class="static-field">
              <p class="control is-size-7">
                张帆 15527186868
                  <button class="button is-small">
                  <b-icon  icon="phone" size="is-small"></b-icon>
                </button>
               </p>
            </b-field>
          </div>
          <div class="column is-half is-size-7">
            <b-field label="机构代码" horizontal class="static-field">
              <p class="control is-size-7">
                201710100100201
               </p>
            </b-field>
            <b-field label="单位详址" horizontal class="static-field">
              <p class="control is-size-7">
                武汉市汉阳区88号
               </p>
            </b-field>
            <b-field label="专职消防管理人" horizontal class="static-field">
              <p class="control is-size-7">
                王潇 15527186800
                  <button class="button is-small">
                <b-icon  icon="phone" size="is-small"></b-icon>
              </button>
               </p>
            </b-field>
            <b-field label="安全管理人" horizontal class="static-field">
              <p class="control is-size-7">
                李玉玉 15527186821
                <button class="button is-small">
                  <b-icon  icon="phone" size="is-small"></b-icon>
                </button>
              </p>
            </b-field>
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-1">
      <header class="card-header">
        <p class="card-header-title">
          警情信息
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </span>
        </a>
      </header>
      <div class="card-content">
        <div class="columns">
            <div class="column is-half is-size-7">
              <b-field label="警情类型" horizontal class="static-field">
                <p class="control is-size-7">
                  火警
                 </p>
              </b-field>
              <b-field label="报警码" horizontal class="static-field">
                <p class="control is-size-7">
                  E101
                 </p>
              </b-field>
              <b-field label="前端设备" horizontal class="static-field">
                <p class="control is-size-7">
                  消防栓
                 </p>
              </b-field>
            </div>
          <div class="column is-half is-size-7">
            <b-field label="报警时间" horizontal class="static-field">
              <p class="control is-size-7">
                2017-12-20 17:14:00
               </p>
            </b-field>
            <b-field label="单位详址" horizontal class="static-field">
              <p class="control is-size-7">
                武汉市汉阳区88号
               </p>
            </b-field>
            <b-field label="设备位置" horizontal class="static-field">
              <p class="control is-size-7">
                东南方向
               </p>
            </b-field>
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-1">
      <header class="card-header">
        <p class="card-header-title">
          同时处理
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </span>
        </a>
      </header>
      <div class="card-content">
        <b-field grouped group-multiline>
          <b-field>
            <b-input expanded size="is-small"></b-input>
            <p class="control">
              <span class="button is-static is-small">分钟以内</span>
            </p>
          </b-field>
          <b-field>
            <b-radio-button
                            native-value="true"
                            type="is-success">
              <span>相同防区</span>
            </b-radio-button>
            <b-radio-button
                            native-value=""
                            size="is-small">
              全部
            </b-radio-button>
          </b-field>
        </b-field>
      </div>
    </div>
    <div class="card mt-1">
      <header class="card-header">
        <p class="card-header-title">
          警情处理
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </span>
        </a>
      </header>
      <div class="card-content">
        <div class="columns">
          <div class="column is-three-fifths">
            <b-field label="联系用户" horizontal grouped>
              <b-field grouped>
                <b-select placeholder="选择联系人">
                  <option value="">
                    李易峰 18627123212
                </option>
                </b-select>
                <p class="control">
                  <button class="button is-primary">
                    <b-icon  icon="phone"></b-icon>
                    <span>呼叫</span>
                  </button>
                </p>
              </b-field>
            </b-field>
            <b-field label="信息确认" horizontal>
              <b-field grouped>
                <b-select placeholder="选择类型">
                  <option value="">
                    误操作
                </option>
                  <option value="">
                    实警
                </option>
                  <option value="">
                    用户测试
                </option>
                </b-select>
                <p class="control">
                  <button class="button is-primary">
                    <b-icon icon="phone"></b-icon>
                    <span>联系119</span>
                  </button>
                </p>
              </b-field>
            </b-field>
            <b-field label="到达现场" horizontal>
              <b-field>
                <b-radio-button v-model="model.arrival"
                                native-value="Nop"
                                type="is-danger">
                  <b-icon icon="close"></b-icon>
                  <span>未到</span>
                </b-radio-button>

                <b-radio-button v-model="model.arrival"
                                native-value="Yep"
                                type="is-success">
                  <b-icon icon="check-square-o"></b-icon>
                  <span>到达</span>
                </b-radio-button>
              </b-field>
            </b-field>
            <b-field label="通知出警" horizontal>
              <b-field grouped>
                <b-select placeholder="选择出警人员">
                  <option value="">
                    张毅 18627123212
                </option>
                </b-select>
                <p class="control">
                  <button class="button is-primary">
                    <b-icon icon="phone"></b-icon>
                    <span>呼叫</span>
                  </button>
                </p>
              </b-field>
            </b-field>
            <b-field label="出警记录" horizontal>
              <b-field>
                <b-checkbox-button v-model="model.checkboxGroup"
                                   native-value="Nop"
                                   type="is-info">
                  <b-icon icon="flag"></b-icon>
                  <span>出警到达</span>
                </b-checkbox-button>

                <b-checkbox-button v-model="model.checkboxGroup"
                                   native-value="Yep"
                                   type="is-success">
                  <b-icon icon="check"></b-icon>
                  <span>检查结果</span>
                </b-checkbox-button>

                <b-checkbox-button v-model="model.checkboxGroup"
                                   native-value="Default"
                                   type="is-dark">
                  <b-icon icon="stop"></b-icon>
                  <span>出警结束</span>
                </b-checkbox-button>
              </b-field>
            </b-field>
            <b-field label="处理方式" horizontal>
              <b-field>
                <b-radio-button v-model="model.radioGroup"
                                native-value="Nop"
                                type="is-primary">
                  <b-icon icon="car"></b-icon>
                  <span>出警处理</span>
                </b-radio-button>
                <b-radio-button v-model="model.radioGroup"
                                native-value="Yep"
                                type="is-info">
                  <b-icon icon="phone"></b-icon>
                  <span>电话处理</span>
                </b-radio-button>

                <b-radio-button v-model="model.radioGroup"
                                native-value="Default"
                                type="is-warning">
                  <b-icon icon="server"></b-icon>
                  <span>系统处理</span>
                </b-radio-button>
              </b-field>
            </b-field>
            <b-field horizontal label="备注">
              <b-input type="textarea"></b-input>
            </b-field>
          </div>
          <div class="column">
            <div class="timeline">
              <header class="timeline-header">
                <span class="tag is-primary">用户报警</span>
              </header>
              <div class="timeline-item">
                <div class="timeline-marker is-danger">
                </div>
                <div class="timeline-content">
                  <p class="heading">2017-12-20 17:14:00 用户报警</p>
                  <!--<p>用户报警</p>这个页面需要很紧凑的展示数据，所以将这个元素与heading合并-->
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker is-success">
                </div>
                <div class="timeline-content">
                  <p class="heading">2017-12-20 17:14:01 收到警情</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <p class="heading">2017-12-20 17:14:01 微信推送</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <p class="heading">2017-12-20 17:14:01 短信推送</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <p class="heading">2017-12-20 17:14:01 APP推送</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <p class="heading">2017-12-20 17:14:01 APP用户确认</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <p class="heading">2017-12-20 17:14:01 语音推送</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <p class="heading">2017-12-20 17:14:01 语音推送确认</p>
                </div>
              </div>
              <header class="timeline-header">
                <span class="tag is-primary">受理</span>
              </header>
              <div class="timeline-item">
                <div class="timeline-marker is-info"></div>
                <div class="timeline-content">
                  <p class="heading">2017-12-20 17:14:01 刘亮受理</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <p class="heading">2017-12-20 17:14:01 联系李易峰</p>
                  <p>无人接听</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <p class="heading">2017-12-20 17:14:01 联系朱俊</p>
                  <p>实警</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker is-danger"></div>
                <div class="timeline-content">
                  <p class="heading">2017-12-20 17:14:01 联系119</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker is-info"></div>
                <div class="timeline-content">
                  <p class="heading">2017-12-20 17:14:01 通知出警</p>
                  <p>出警人员：张毅</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <p class="heading">2017-12-20 17:14:01 抵达现场</p>
                </div>
              </div>
              <div class="timeline-header">
                <span class="tag is-success">处理完成</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        model: {
          arrival: false,
          checkboxGroup : [],
          radioGroup : 1
        }
      }
    }
  }
</script>

<style scoped>
  .timeline-content {
    margin-bottom: 0.25rem;
  }
  .timeline-item {
    padding-bottom: 5px;
  }
</style>
