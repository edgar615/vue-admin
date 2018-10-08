<template>
  <div>
    {{curSystemName}}
    <!-- 使用路由生成菜单 -->
    <div v-for="level1 in level1List" :key="level1.sysPermissionId">
      <router-link class="menu-title is-size-7"
         :to="{path: level1.path}">
        <b-icon pack="fa" :icon="level1.icon" size="is-small"></b-icon>
        <span>{{level1.name}}</span>
        <b-icon pack="fa" size="is-small" icon="angle-right" v-show="activeLevel1 != level1.sysPermissionId"
                v-if="level1.children && level1.children.length > 0"></b-icon>
        <b-icon pack="fa" size="is-small" icon="angle-down" v-show="activeLevel1 == level1.sysPermissionId"
                v-if="level1.children && level1.children.length > 0"></b-icon>
      </router-link>
      <div class="side-menu is-size-7" v-show="activeLevel1 == level1.sysPermissionId">
        <!--v-if="!level2.hidden"-->
        <router-link v-for="level2 in level1.children"
                     :to="{path: level1.path + '/' + level2.path}"
                     :class="activeLevel1 == level1.sysPermissionId ? 'active' : '' " exact :key="level2.sysPermissionId">
          <b-icon pack="fa" :icon="level2.icon" size="is-small"></b-icon>
          <span>{{ level2.name }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
       data() {
            return {
            };
        },
     methods: {
     },
      //computed计算属性的方式在用属性时不用加(),而methods方式在使用时要像方法一样去用，必须加().
      //两种方式在缓存上也大有不同，利用computed计算属性是将 reverseMessage与message绑定，
      // 只有当message发生变化时才会触发reverseMessage，而methods方式是每次进入页面都要执行该方法，
      // 但是在利用实时信息时，比如显示当前进入页面的时间，必须用methods方式
        computed: {
          curSystemName() {
            const curSystem= this.$store.getters.currentSystem();
            if (curSystem) {
              return curSystem.name;
            }
            return "";
          },
          level1List() {
            const menus = this.$store.getters.menuList();
            return menus.filter(function(item, index, array) {
              return item.level == 1;
            });
          },
          activeSystem() {
            var active = this.$store.getters.activeSystem;
            if (active != undefined && active != '') {
              return  this.$store.getters.activeSystem;
            }
            const systems = this.$store.getters.systemList();
            if (systems && systems.length > 0) {
              return systems[0].subsystemId
            }
            return '';
          },
          activeLevel1() {
              return  this.$store.getters.activeLevel1;
          },
           systemList() {
             return this.$store.getters.systemList()
           }
        }
    };
</script>

