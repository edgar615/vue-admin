import Vue from 'vue'
import Router from 'vue-router'

// 初始化加载的模块
import MainContent from '@/components/main-content/main-content.vue';
import EventCreate from '@/components/event/create.vue';
import Layout from '@/components/Layout.vue';
// 异步加载的模块
var Notfound = function (resolve, reject) {
  require.ensure(['@/components/notfound/notfound.vue'], function () {
    resolve(require('@/components/notfound/notfound.vue'));
  });
};

var EventList = function (resolve, reject) {
  require.ensure(['@/components/event/list.vue'], function () {
    resolve(require('@/components/event/list.vue'));
  });
};

var Recharge = function (resolve, reject) {
  require.ensure(['@/components/user/recharge.vue'], function () {
    resolve(require('@/components/user/recharge.vue'));
  });
};

var Account = function (resolve, reject) {
  require.ensure(['@/components/user/account.vue'], function () {
    resolve(require('@/components/user/account.vue'));
  });
};

Vue.use(Router)
var routes = [{
  path: '/',
  component: Layout,
  meta: {
    // 直接使用 name 作为菜单的名字, 如果有默认路由的时候会有警告
    // Named Route '首页' has a default child route.
    // When navigating to this named route (:to="{name: '首页'"),
    // the default child route will not be rendered.
    // Remove the name from this route and use the name of the default child route for named links instead.
    name: '首页'
  },
  children: [{
    path: '', // 默认路由
    component: MainContent
  }]
}, {
  path: '/event',
  component: Layout,
  meta: {
    name: '活动'
  },
  children: [{
    path: '', // 默认路径
    redirect: 'create',
    meta: {
      hidden: true // 隐藏的路由不会在路由菜单中显示出来
    }
  }, {
    path: 'create',
    component: EventCreate,
    meta: {
      name: '创建'
    }
  }, {
    path: 'list',
    component: EventList,
    meta: {
      name: '管理'
    }
  }]
}, {
  path: '/user',
  component: Layout,
  meta: {
    name: '账户'
  },
  children: [{
    path: '',
    redirect: 'recharge',
    meta: {
      hidden: true
    }
  }, {
    path: 'recharge',
    component: Recharge,
    meta: {
      name: '账户充值'
    }
  }, {
    path: 'account',
    component: Account,
    meta: {
      name: '账户信息'
    }
  }]
}];

// 在最后添加处理 404 路由
routes.push({
  path: '*', // 匹配未找到路由的情况, 类似 404 页面
  component: Notfound,
  meta: {
    hidden: true
  }
});

export default
new Router({
  routes: routes
});
