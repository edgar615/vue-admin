<template>
  <div class="columns">
    <div class="column is-3 has-text-grey">
      <div class="p-5 mt-5">
        <img src="../../assets/logo.png" alt="">
      </div>
      <section class="section">
        <div class="field">
          <div class="control has-icons-left has-icons-right"
               :class="{'has-icons-right': errors.has('username') }">
            <input name="username" v-validate="'required'" class="input is-medium"
                   :class="{'is-danger': errors.has('username') }" type="text" placeholder="用户名"
                   data-vv-as="用户名" v-model="username" @keydown.enter="login">
            <span class="icon is-left is-large">
                    <i class="mdi mdi-account"></i>
                  </span>
            <span class="icon is-right is-large has-text-danger"
                  v-show="errors.has('username')">
                      <i class="mdi mdi-alert-circle-outline"></i>
                    </span>
          </div>
          <p v-show="errors.has('username')" class="help is-danger has-text-left">
            {{errors.first('username')}}</p>
        </div>

        <div class="field">
          <div class="control has-icons-left has-icons-right"
               :class="{'has-icons-right': errors.has('password') }">
            <input name="password" v-validate="'required|max:16'" class="input is-medium"
                   :class="{'is-danger': errors.has('password') }" type="password"
                   placeholder="密码"
                   data-vv-as="密码" v-model="password" @keydown.enter="login">
            <span class="icon is-left is-large">
                    <i class="mdi mdi-lock"></i>
                  </span>
            <span class="icon is-right is-large has-text-danger"
                  v-show="errors.has('password')">
                      <i class="mdi mdi-alert-circle-outline"></i>
                    </span>
          </div>
          <p v-show="errors.has('password')" class="help is-danger has-text-left">
            {{errors.first('password')}}</p>
        </div>
        <div class="field has-text-left">
          <label class="checkbox">
            <input type="checkbox">
            记住我
          </label>
        </div>

        <button class="button is-block is-primary is-fullwidth is-medium"
                @click="login" :disabled='errors.any()'
                :class="{'is-loading' : loading}">
                <span class="icon is-large">
                      <i class="mdi mdi-login"></i>
                 </span>
          登录
        </button>
        <p class="has-text-danger is-pulled-left is-size-6" v-if="errorMsg">
          登录失败，请确认是否输入正确的用户名和密码
        </p>
        <br>
        <p class="subtitle is-size-6 has-text-grey">使用以下账号直接登录</p>
        <div class="buttons">
          <button class="button">
              <span class="icon">
                <i class="mdi mdi-facebook"></i>
              </span>
          </button>
          <button class="button">
              <span class="icon">
                <i class="mdi mdi-twitter"></i>
              </span>
          </button>
        </div>
        <p class="mt-3 has-text-grey">
          <a href="../" class="has-text-grey">注册</a> &nbsp;·&nbsp;
          <a href="../" class="has-text-grey">忘记密码</a> &nbsp;·&nbsp;
        </p>
      </section>
    </div>
    <div id="particles-js" class="interactive-bg column is-9">
    </div>
  </div>
</template>

<script>
  import {login} from '@/api/login'

  export default {
    data() {
      return {
        loading: false,
        errorMsg: undefined
      }
    },
    mounted() {
      var partJson = {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "repulse"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      };
      var jsonUri = "data:text/plain;base64," + window.btoa(JSON.stringify(partJson));
      /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
      particlesJS.load('particles-js', jsonUri, function () {
        console.log('callback - particles.js config loaded');
      });
    },
    methods: {
      login() {
        const vm = this
        this.$validator.validateAll().then((result) => {
          vm.errorMsg = undefined
          if (result) {
            vm.loading = true
            login(this.username, this.password).then(response => {
              this.$store.commit('SET_TOKEN', response.data.token)
              window.location.reload()
            }).catch(function (error) {
              vm.loading = false
              vm.errorMsg = error.msg
            })
          }
        })
      }
    }
  }
</script>
