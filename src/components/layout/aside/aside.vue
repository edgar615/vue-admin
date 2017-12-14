<template>
    <!-- 使用路由生成菜单 -->
  <aside class="menu">
    <!-- 使用路由生成菜单 -->
    <p class="menu-label">
      Dashboard
    </p>
    <ul class="menu-list">
      <template v-for="menu in asideMenus" v-if="!menu.hidden">
        <li><router-link :to="{path: menu.path}" active-class="is-active" exact :key="menu.path">{{ menu.name }}</router-link>
          <ul  v-if="menu.children && menu.children.length > 0">
            <li v-for="child in menu.children" v-if="!child.hidden" :key="menu.path + '/' + child.path">
              <router-link :to="{path: menu.path + '/' + child.path}" active-class="is-active" exact>{{ child.name }}</router-link>
            </li>
          </ul>
        </li>
      </template>
    </ul>
  </aside>
</template>
<script>
    export default {
        data() {
            return {
            };
        },
      //computed计算属性的方式在用属性时不用加(),而methods方式在使用时要像方法一样去用，必须加().
      //两种方式在缓存上也大有不同，利用computed计算属性是将 reverseMessage与message绑定，
      // 只有当message发生变化时才会触发reverseMessage，而methods方式是每次进入页面都要执行该方法，
      // 但是在利用实时信息时，比如显示当前进入页面的时间，必须用methods方式
        computed: {
            asideMenus() {
              //以前直接使用 $router.options.routes显示菜单，与后端结合之后，直接通过菜单计算
              return this.$store.getters.menuList();
            },
            curSystem() {
              return this.$store.getters.activeSystem;
            },
           curRoute() {
              //根据匹配地址判断打开的一级菜单
               return this.$route.matched.map(function(route) {
                    return route.path;
                });
            }
        }
    };
</script>

