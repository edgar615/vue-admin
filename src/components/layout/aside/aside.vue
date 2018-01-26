<template>
    <!-- 使用路由生成菜单 -->
  <div>
    <!-- 使用路由生成菜单 -->
   <div  v-for="system in systemList" :class="activeSystem == system.subsystemId ? 'active pt-2' : 'pt-2' " >
       <a class="menu-title is-size-6" @click="onClickSystem(system.subsystemId)">
         <b-icon size="is-small" icon="angle-right" v-show="subsystemId != system.subsystemId"></b-icon>
         <b-icon size="is-small" icon="angle-down" v-show="subsystemId == system.subsystemId"></b-icon>
         <span>{{system.name}}</span>
      </a>
     <div class="side-menu is-size-7" v-show="subsystemId == system.subsystemId">
       <router-link v-for="menu in system.permissions" v-if="!menu.hidden"
                    :to="{path: menu.path}" :class="activeLevel1 == menu.sysPermissionId ? 'active' : '' " exact :key="menu.sysPermissionId">
         <b-icon :icon="menu.icon" size="is-small"></b-icon>
         <span>{{ menu.name }}</span>
       </router-link>
     </div>
   </div>

  </div>
</template>
<script>
    export default {
       data() {
            return {
              subsystemId : this.$store.getters.activeSystem
            };
        },
     methods: {
       onClickSystem(subsystemId) {
         this.subsystemId = subsystemId;
       }
     },
      //computed计算属性的方式在用属性时不用加(),而methods方式在使用时要像方法一样去用，必须加().
      //两种方式在缓存上也大有不同，利用computed计算属性是将 reverseMessage与message绑定，
      // 只有当message发生变化时才会触发reverseMessage，而methods方式是每次进入页面都要执行该方法，
      // 但是在利用实时信息时，比如显示当前进入页面的时间，必须用methods方式
        computed: {
          activeSystem() {
            return  this.$store.getters.activeSystem;
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

