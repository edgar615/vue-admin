<template>
  <div class="aside-menu">
    <ul>
      <li v-for="system in systems" :class="activeSystem == system.subsystemId ? 'active' : '' ">
        <router-link :to="{path: system.path}">
          <b-icon :icon="system.icon" size="is-small" class="menu-icon"></b-icon>
          <span class="menu-text">{{system.name}}</span>
        </router-link>
      </li>
    </ul>

    <ul class="menu-bottom">
      <li>
        <a href="#">
          <b-icon icon="power" size="is-small" class="menu-icon"></b-icon>
          <span class="menu-text">退出</span>

        </a>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        clickedModule: 0
      }
    },
    methods: {
      onClickModule (moduleId) {
        if (this.clickedModule === moduleId) {
          this.clickedModule = 0
        } else {
          this.clickedModule = moduleId
        }
      }
    },
    // computed计算属性的方式在用属性时不用加(),而methods方式在使用时要像方法一样去用，必须加().
    // 两种方式在缓存上也大有不同，利用computed计算属性是将 reverseMessage与message绑定，
    // 只有当message发生变化时才会触发reverseMessage，而methods方式是每次进入页面都要执行该方法，
    // 但是在利用实时信息时，比如显示当前进入页面的时间，必须用methods方式
    computed: {
      systems () {
        let systemArray = this.$store.getters.systemList()
        const activeSystem = this.$store.getters.activeSystem
        if (systemArray.length > 0 && (activeSystem === undefined || activeSystem === '')) {
          this.$store.commit('ACTIVE_SYSTEM', systemArray[0].subsystemId)
        }
        return systemArray
      },
      activeSystem () {
        var active = this.$store.getters.activeSystem
        return active
      },
      level1List () {
        const menus = this.$store.getters.menuList()
        return menus.filter(function (item, index, array) {
          return item.level === 1
        })
      }
    }
  }
</script>

