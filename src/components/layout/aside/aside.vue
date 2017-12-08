<template>
    <!-- 使用路由生成菜单 -->
  <aside class="menu">
    <!-- 使用路由生成菜单 -->
    <p class="menu-label">
      Dashboard
    </p>
    <ul class="menu-list">
      <template v-for="route in $router.options.routes" v-if="!route.meta.hidden">
          <li><router-link :to="{path: route.path}" active-class="is-active" exact :key="route.path">{{ route.meta.name }}</router-link>
            <ul  v-if="route.children && route.children.length > 1">
              <li v-for="child in route.children" v-if="!child.meta.hidden" :key="route.path + '/' + child.path">
                <router-link :to="{path: route.path + '/' + child.path}" active-class="is-active" exact>{{ child.meta.name }}</router-link>
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
        computed: {
            level1() {
              // 默认打开所有一级菜单
                return this.$router.options.routes.map(function(route) {
                    return route.path;
                });
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

