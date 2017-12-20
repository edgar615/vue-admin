<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">警情处理</p>
      </header>
      <section class="modal-card-body">
        <b-tabs type="is-toggle"  expanded>
          <b-tab-item label="警情信息" icon="exclamation-circle"></b-tab-item>
          <b-tab-item label="警情复合" icon="check-circle"></b-tab-item>
          <b-tab-item label="历史报警" icon="list"></b-tab-item>
          <b-tab-item label="用户信息" icon="user-circle"></b-tab-item>
        </b-tabs>
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
            基本信息
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
            警情信息
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
              <div class="column is-three-quarters">
                <b-field label="首次受理人" horizontal class="static-field">
                  <p class="control">
                     李易峰
	                </p>
                </b-field>
                <b-field label="受理时间" horizontal class="static-field">
                  <p class="control">
                    2017-12-20 17:14:00
                   </p>
                </b-field>
                <b-field label="微信推送时间" horizontal class="static-field">
                  <p class="control">
                    2017-12-20 17:14:00
                   </p>
                </b-field>
                <b-field label="短信推送时间" horizontal class="static-field">
                  <p class="control">
                    2017-12-20 17:14:00
                   </p>
                </b-field>
                <b-field label="APP推送时间" horizontal class="static-field">
                  <p class="control">
                    2017-12-20 17:14:00
                   </p>
                </b-field>
                <b-field label="APP用户确认" horizontal class="static-field">
                  <p class="control">
                    2017-12-20 17:14:00
                   </p>
                </b-field>
                <b-field label="语音推送时间" horizontal class="static-field">
                  <p class="control">
                    2017-12-20 17:14:00
                   </p>
                </b-field>
                <b-field label="语音用户确认" horizontal class="static-field">
                  <p class="control">
                    2017-12-20 17:14:00
                   </p>
                </b-field>
                <b-field label="联系用户" horizontal>
                  <b-select placeholder="选择用户">
                      <option value="">
                        李易峰 18627123212
                    </option>
                  </b-select>
                </b-field>
                <b-field label="信息确认" horizontal>
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
                </b-field>
                <b-field label="到达现场" horizontal>
                  <b-radio-button v-model="radioButton"
                                  native-value="Nop"
                                  type="is-danger">
                    <b-icon icon="close"></b-icon>
                    <span>未到</span>
                  </b-radio-button>

                  <b-radio-button v-model="radioButton"
                                  native-value="Yep"
                                  type="is-success">
                    <b-icon icon="check"></b-icon>
                    <span>到达</span>
                  </b-radio-button>
                </b-field>
                <b-field label="Email" horizontal>
                  <b-input
                    type="email"
                    v-model="email"
                    placeholder="Your email"
                    required>
                  </b-input>
                </b-field>
              </div>
              <div class="column">
                处理结果
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button class="button is-primary">Login</button>
      </footer>
    </div>
  </form>
</template>

<script>
  export default {
    props: ['email', 'password']
  }
</script>

<style scoped>
  .modal-card {
    width: 960px;
  }
</style>
