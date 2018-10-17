<template>
  <div>
    <!-- 使用路由生成菜单 -->
    <div v-for="level1 in level1List" :key="level1.sysPermissionId">
      <router-link class="menu-title is-size-7"
                   :to="{path: level1.path}">
        <b-icon :icon="level1.icon" size="is-small"></b-icon>
        <span>{{level1.name}}</span>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    methods: {},
    // computed计算属性的方式在用属性时不用加(),而methods方式在使用时要像方法一样去用，必须加().
    // 两种方式在缓存上也大有不同，利用computed计算属性是将 reverseMessage与message绑定，
    // 只有当message发生变化时才会触发reverseMessage，而methods方式是每次进入页面都要执行该方法，
    // 但是在利用实时信息时，比如显示当前进入页面的时间，必须用methods方式
    computed: {
      curSystemName () {
        const curSystem = this.$store.getters.currentSystem()
        if (curSystem) {
          return curSystem.name
        }
        return ''
      },
      level1List () {
        const menus = this.$store.getters.menuList()
        return menus.filter(function (item, index, array) {
          return item.level == 1
        })
      },
      activeLevel1 () {
        return this.$store.getters.activeLevel1
      },
      showAngle () {
        return this.$store.getters.activeLevel1
      },
      systemList () {
        return this.$store.getters.systemList()
      }
    }
  }
</script>

