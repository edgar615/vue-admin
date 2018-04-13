// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import '@/styles/bulma-timeline.css'
import zh_CN from '@/utils/zh-CN'
import '@/styles/vars.scss' //自定义风格

Vue.config.productionTip = false

//项目名
Vue.prototype.$appName = 'XXXX综合管理平台'
Vue.prototype.$showLogo = false


//富文本编辑器，不使用的话删除
import VueHtml5Editor from 'vue-html5-editor'
Vue.use(VueHtml5Editor,{
  // 配置图片模块
  image: {
    // 文件最大体积，单位字节  max file size
    sizeLimit: 512 * 1024,
    // 上传参数,默认把图片转为base64而不上传
    // upload config,default null and convert image to base64
    upload: {
      url: "http://www.edgar615.com:32881/v1/file",
      fieldName: "file"
    },
    uploadHandler(responseText){
      //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
      var json = JSON.parse(responseText)
      return "http://www.edgar615.com:32881/v1/file/" + json.result;
    }
  }

});

//CRUD基本方法，减少页面开发量
import ApiUtil from '@/utils/util'
Vue.use(ApiUtil);

//弹框
import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue);

//校验
import '@/utils/validate'

Vue.use(VeeValidate, {
  locale: 'zh_CN',
  delay: 500,
  dictionary: {
    zh_CN
  }
});

//Buefy组件
Vue.use(Buefy, {
  defaultIconPack: "fa"
  ,defaultDayNames: ["日", "一", "二", "三", "四", "五", "六"]
  ,defaultMonthNames: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
})

//Bue提供的表单水平布局在生成错误提示的时候不太友好，修改了源码，重新定义了一个
import JccField from '@/components/field'
import JccMetaInput from '@/components/meta'
Vue.component('jcc-field', JccField)
Vue.component('jcc-meta-input', JccMetaInput)
/*
 {
 defaultIconPack: "mdi" //Icon pack used internally and on the Icon component attribute — Material Design Icons or FontAwesome可选 	mdi, fa
 ,defaultContainerElement: "body"//Default container attribute for floating Notices (Toasts & Snackbars). Note that this also changes the position of the Notices from fixed to absolute. Meaning that the container should be fixed.
 ,defaultDialogConfirmText: "确定" //Default dialog confirmText attribute
 ,defaultDialogCancelText: '取消' //Default dialog cancelText attribute
 ,defaultSnackbarDuration: 3500 //Default snackbar duration attribute.
 ,defaultToastDuration: 2000 //Default toast duration attribute.
 ,defaultTooltipType : "is-primary" // Default tooltip type (color) attribute.可选 is-white, is-black, is-light, is-dark, is-primary, is-info, is-success, is-warning, is-danger, and any other colors you've set in the $colors list on Sass
 ,defaultTooltipAnimated : false //Default tooltip animated attribute.
 ,defaultInputAutocomplete: "on" //Default input autocomplete attribute.可选 on, off
 ,defaultDateFormatter:date.toLocaleDateString() //Default datepicker date-formatter attribute
 ,defaultDateParser:Date.parse(date) //Default datepicker date-parser attribute
 ,defaultDayNames: ["日", "一", "二", "三", "四", "五", "六"] //Default datepicker day-names attribute
 ,defaultMonthNames: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"] //Default datepicker month-names attribute
 ,defaultFirstDayOfWeek : 0// 	Default datepicker first-day-of-week attribute
 ,defaultTimeFormatter: "HH:mm"//Default timepicker time-formatter attribute
 ,defaultTimeParser : "HH:mm"//Default time-parser attribute
 ,defaultModalScroll : "clip"//Default modal/dialog scroll attribute，可选：clip, keep
 }
 */
/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    if (store.getters.token) {
      next("/")
    } else {
      next()
    }
} else {
  if (store.getters.token) {
    next()
  } else {
    next("/login")
  }
}
})

// router.beforeEach((to, from, next) => {
//   //在不刷新页面的情况下，不同权限的用户重复登录会导致有些用户可以访问他没有权限的页面，这里根据meta再次判断一下路由权限，没有权限的直接跳转到403
//   if (to.path == "/login") {
//     next()
//   } else {
//     if (store.getters.token) {
//       //登录之后使用reload方法将整个页面刷新，避免下列问题：不同的两个菜单ID，对应的同一个地址切换用户之后会出现403
//       const menuIds = store.getters.menuIds;
//       if (menuIds.length > 0 && to.meta && to.meta.menuId) {
//         if (menuIds.indexOf(to.meta.menuId) == -1) {
//           next("/403")
//           return;
//         }
//       }
//       next()
//     } else {
//       next("/login")
//     }
//   }
// })

router.afterEach((to, from) => {
  if (to.meta && to.meta.menuId) {
    store.commit('ACTIVE_LEVEL2_MENU', [to.meta.subsystemId, to.meta.parentId, to.meta.menuId])
  } else {
  store.commit('ACTIVE_LEVEL2_MENU', ['', '', ''])
}

})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
