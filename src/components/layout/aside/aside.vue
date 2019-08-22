<template>
  <!-- BEGIN: Aside Menu -->
  <div class="app-aside fade nav-dropdown aside-bg" :class="showFolderAside ? 'folded' : ''" style="display: none;"
       aria-hidden="true">
    <div class="navside">
      <div data-flex="" class="hide-scroll">
        <nav class="scroll nav-stacked nav-color">
          <ul class="nav">
            <li :key="system.subsystemId" v-for="system in systems" :class="activeSystem == system.subsystemId ? 'active' : '' ">
              <router-link :to="{path: system.path}">
                <span class="nav-caret" v-show="system.permissions && system.permissions.length > 0">
                  <b-icon icon="chevron-down"></b-icon>
                </span>
                <b-icon :icon="system.icon" class="nav-icon no-fade"></b-icon>
                <span class="nav-text">{{system.name}}</span>
              </router-link>
              <ul :class="calSubMenuClass(system)">
                <li v-for="level1 in system.permissions" :key="level1.sysPermissionId" :class="activeLevel1 == level1.sysPermissionId ? 'active' : '' ">
                  <router-link  :to="{path: level1.path}" v-show="level1.type == 1 && !level1.hidden">
                    <span class="nav-text">{{level1.name}}</span>
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="nav-bottom is-medium">
            <li>
              <a href="#">
                <figure class="image is-48x48">
                  <img class="is-rounded" src="https://via.placeholder.com/48">
                </figure>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  <!-- END: Aside Menu -->
</template>
<script>

  export default {
    data() {
      return {
        clickedModule: 0
      }
    },
    methods: {
      onClickModule(moduleId) {
        if (this.clickedModule === moduleId) {
          this.clickedModule = 0
        } else {
          this.clickedModule = moduleId
        }
      },
      calSubMenuClass(system) {
        if (!system.permissions) {
          return "nav-sub"
        } else if (system.permissions.length > 15) {
          return 'nav-sub nav-mega nav-mega-3'
        } else if (system.permissions.length > 10) {
          return 'nav-sub nav-mega'
        } else {
          return 'nav-sub'
        }
      }
    },
    // computed计算属性的方式在用属性时不用加(),而methods方式在使用时要像方法一样去用，必须加().
    // 两种方式在缓存上也大有不同，利用computed计算属性是将 reverseMessage与message绑定，
    // 只有当message发生变化时才会触发reverseMessage，而methods方式是每次进入页面都要执行该方法，
    // 但是在利用实时信息时，比如显示当前进入页面的时间，必须用methods方式
    computed: {
      showFolderAside() {
        return this.$store.getters.showFolderAside
      },
      systems() {
        let systemArray = this.$store.getters.systemList()
        const activeSystem = this.$store.getters.activeSystem
        if (systemArray.length > 0 && (activeSystem === undefined || activeSystem === '')) {
          this.$store.commit('ACTIVE_SYSTEM', systemArray[0].subsystemId)
        }
        return systemArray
      },
      activeSystem() {
        var active = this.$store.getters.activeSystem
        return active
      },
      activeLevel1 () {
        return this.$store.getters.activeLevel1
      },
      level1List() {
        const menus = this.$store.getters.menuList()
        return menus.filter(function (item, index, array) {
          return item.level === 1
        })
      }
    }
  }
</script>

