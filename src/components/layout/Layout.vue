<template>
  <div>
    <Navbar></Navbar>
    <!-- Main container -->
    <div class="is-fullheight main-container">
        <Aside></Aside>
      <div class="is-main-content is-paddingless" :class="showFolderAside ? 'has-sidebar-left-folded' : 'has-sidebar-left'">
        <PageTitle></PageTitle>
        <PageNav v-show="showLevel2Menu"></PageNav>
        <router-view class="pr-3 pl-3"></router-view>
        <ul class="nav-sticky" style="margin-top: 30px;">
          <li class="nav-sticky-item">
            <b-tooltip label="购物车"
                       position="is-left"
                       animated>
              <a href="#">
                <b-icon icon="cart-outline"></b-icon>
              </a>
            </b-tooltip>

          </li>
          <li class="nav-sticky-item">
            <b-tooltip label="帮助文档"
                       position="is-left"
                       animated>
              <a href="#">
                <b-icon icon="help-circle-outline"></b-icon>
              </a>
            </b-tooltip>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import Navbar from '@/components/layout/navbar/navbar.vue'
  import Aside from '@/components/layout/aside/aside.vue'
  import PageNav from '@/components/page-nav/PageNav.vue'

  export default {
    data () {
      return {}
    },
    computed: {
      showFolderAside() {
        return this.$store.getters.showFolderAside
      },
      activeLevel2 () {
        return this.$store.getters.activeLevel2
      },
      currentLevel1Menu () {
        // 以前直接使用 $router.options.routes显示菜单，与后端结合之后，直接通过菜单计算
        const menu = this.$store.getters.currentLevel1Menu()
        if (menu) {
          return menu
        } else {
          return {
            children: []
          }
        }
      },
      showLevel2Menu () {
        var showLevel2 = false
        const menu = this.$store.getters.currentLevel1Menu()
        if (menu && menu.children) {
          menu.children.forEach(function (item) {
            if (!item.hidden && !item.acquiescent) {
              showLevel2 = true
            }
          })
        }
        return showLevel2
      }
    },
    components: {
      Navbar, Aside, PageNav
    }
  }
</script>
