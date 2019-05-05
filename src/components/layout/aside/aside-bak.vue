<template>
  <div>
    <div v-for="level1 in level1List" :key="level1.sysPermissionId">
      <a class="menu-title" v-if="level1.type == 3" @click="onClickModule(level1.sysPermissionId)">
        <b-icon :icon="level1.icon" size="is-small"></b-icon>
        <span>{{level1.name}}</span>
        <b-icon class="is-pulled-right" size="is-small" icon="chevron-right" v-show="clickedModule != level1.sysPermissionId && activeModule  != level1.sysPermissionId "
                v-if="level1.nonHiddenChild"></b-icon>
        <b-icon class="is-pulled-right" size="is-small" icon="chevron-down" v-show="clickedModule == level1.sysPermissionId || activeModule  == level1.sysPermissionId "
                v-if="level1.nonHiddenChild"></b-icon>
      </a>
      <router-link class="menu-title"
                   :class="activeLevel1 == level1.sysPermissionId || activeModule  == level1.sysPermissionId ? 'active' : '' "
                   :to="{path: level1.path}" v-show="level1.type == 1">
        <b-icon :icon="level1.icon" size="is-small"></b-icon>
        <span>{{level1.name}}</span>
      </router-link>
      <div class="side-menu" v-if="level1.type == 3">
        <router-link v-for="level2 in level1.children" v-if="!level2.hidden"
                     v-show="clickedModule == level1.sysPermissionId || activeModule  == level1.sysPermissionId "
                     :to="{path: level2.path}"
                     :class="activeLevel1 == level2.sysPermissionId ? 'active' : '' " exact
                     :key="level2.sysPermissionId">
          <b-icon :icon="level2.icon" size="is-small"></b-icon>
          <span>{{ level2.name }}</span>
        </router-link>
      </div>
    </div>
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
          return item.level === 1
        })
      },
      activeLevel1 () {
        return this.$store.getters.activeLevel1
      },
      activeModule () {
        return this.$store.getters.activeModule
      },
      activeLevel2 () {
        return this.$store.getters.activeLevel2
      },
      systemList () {
        return this.$store.getters.systemList()
      }
    }
  }
</script>

