<template>
  <div class="columns is-vcentered">
    <div class="login column is-4 ">
      <section class="section">
        <div class="has-text-centered">
          <img class="login-logo" src="https://placehold.it/128x128">
        </div>

        <div class="field">
          <label class="label">用户名</label>
          <div class="control has-icons-right" :class="{'has-icons-right': errors.has('username') }" >
            <input name="username" v-validate="'required'" class="is-medium input" :class="{'is-danger': errors.has('username') }" type="text" placeholder="用户名"
                   data-vv-as="用户名" v-model="username">
            <span class="icon is-small is-right has-text-danger" v-show="errors.has('username')">
                      <i class="mdi mdi-alert-circle-outline"></i>
                    </span>
          </div>
          <p v-show="errors.has('username')" class="help is-danger has-text-left">{{ errors.first('username')}}</p>
        </div>
        <div class="field">
          <label class="label">密码</label>
          <div class="control" :class="{'has-icons-right': errors.has('password') }" >
            <input name="password" v-validate="'required|max:16'" class="is-medium input" :class="{'is-danger': errors.has('password') }" type="password" placeholder="密码"
                   data-vv-as="密码" v-model="password">
            <span class="icon is-small is-right has-text-danger" v-show="errors.has('password')">
                      <i class="mdi mdi-alert-circle-outline"></i>
                    </span>
          </div>
          <p v-show="errors.has('password')" class="help is-danger has-text-left">{{ errors.first('password')}}</p>
        </div>

        <div class="has-text-centered">
          <a class="button is-primary" @click="login" :disabled='errors.any()' :class="{'is-loading' : loading}">
             <span class="icon">
                      <i class="mdi mdi-login"></i>
                 </span>&nbsp;&nbsp;
            登录
          </a>
        </div>
        <div class="has-text-centered has-text-grey">
          <router-link to="/signup"> 注册</router-link> &nbsp;·&nbsp;
          <router-link to="/signup"> 忘记密码</router-link>&nbsp;·&nbsp;
        </div>
      </section>
    </div>
    <div id="particles-js" class="interactive-bg column is-8">
    </div>
  </div>
</template>

<script>
  import { login } from '@/api/login';
  import dynamicRouter from '@/router/dynamicRouter'
  export default {
    data() {
      return {
        loading: false
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
  var jsonUri = "data:text/plain;base64,"+window.btoa(JSON.stringify(partJson));
  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  particlesJS.load('particles-js', jsonUri, function() {
    console.log('callback - particles.js config loaded');
  });
    },
    methods: {
      login() {
        const vm = this
        this.$validator.validateAll().then((result) => {
          if (result) {
            vm.loading = true
            login(this.username, this.password).then(response => {
            //跳转首页
            this.$store.commit('SET_TOKEN', response.data.token)
            //刷新页面
              window.location.reload();
          }).catch(function (error) {
            vm.loading = false;
          })
          return;
        }
      });
    }
   }
  }
</script>

<style scoped>
  .interactive-bg {
    height: 100vh;
    background-color: #3490DC;
    -webkit-box-shadow: inset 24px 4px 64px -24px rgba(71,71,71,1);
    -moz-box-shadow: inset 24px 4px 64px -24px rgba(71,71,71,1);
    box-shadow: inset 24px 4px 64px -24px rgba(71,71,71,1);
    padding: 0px;
  }
  @media (max-width: 769px) {
    .interactive-bg{
      display: none
    }
  }

  .button {
    margin-top: 20px;
    margin-bottom: 20px;
    min-width: 150px;
  }

  .login-logo {
    margin: 0 auto;
    margin-bottom: 50px;
    max-height: 100px;

  }

  .columns{
    margin: 0px;
  }
</style>
