<template>
  <div class="aside-menu">
    <ul>
      <li>

        <a href="http://startific.com">
          <b-icon icon="star" size="is-small" class="menu-icon"></b-icon>
          <span class="menu-text">系统设置</span>

        </a>
      </li>

      <li>
        <a href="#">
          <b-icon icon="star" size="is-small" class="menu-icon"></b-icon>

          <span class="menu-text">
                            服务商
                        </span>

        </a>

      </li>

      <li>
        <a href="#">
          <b-icon icon="star" size="is-small" class="menu-icon"></b-icon>
          <span class="menu-text">
                            短信
                        </span>
        </a>

      </li>

      <li>
        <a href="#">
          <b-icon icon="star" size="is-small" class="menu-icon"></b-icon>
          <span class="menu-text">
                            支付
                        </span>
        </a>
      </li>
      <li>
        <a href="#">
          <b-icon icon="star" size="is-small" class="menu-icon"></b-icon>
          <span class="menu-text">
                            商城设置
                        </span>
        </a>

      </li>

      <li>
        <a href="#">
          <b-icon icon="star" size="is-small" class="menu-icon"></b-icon>
          <span class="menu-text">
                            大屏设置
                        </span>
        </a>
      </li>
    </ul>

    <ul class="menu-bottom">
      <li>
        <a href="#">
          <b-icon icon="logout" size="is-small" class="menu-icon"></b-icon>
          <span class="menu-text">
                            退出登录
                        </span>

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

