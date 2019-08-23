<template>
  <nav class="navbar is-fixed-top" :class="showFolderAside ? 'has-sidebar-left-folded' : 'has-sidebar-left'">
    <div class="navbar-brand">
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
         @click="burgerClick()" :class="burgerToggle ? 'is-active' : ''">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navMenu" class="navbar-menu" :class="menuToggle ? 'is-active' : ''">
      <div class="navbar-start">
        <a class="navbar-item" @click="toggleAside">
          <b-icon icon="view-headline"></b-icon>
        </a>
      </div>
      <div class="navbar-end">
        <a class="navbar-item">
          <span>{{user.fullname}}，您好</span>
        </a>
        <div class="dropdown is-hoverable ml-2 is-bottom-left">
          <div class="dropdown-trigger">
            <a
                class="navbar-item"
                slot="trigger"
                role="button">
              <b-icon icon="bell" size="is-small" data-badge="8"
                      class="badge is-badge-danger"></b-icon>
            </a>
          </div>
          <div class="dropdown-menu" role="menu" style="width: 380px">
            <Message></Message>
          </div>
        </div>

        <div class="dropdown is-hoverable ml-2 is-bottom-left">
          <div class="dropdown-trigger">
            <a
                class="navbar-item"
                slot="trigger"
                role="button">
              <span>我的空间</span>
              <b-icon icon="menu-down"></b-icon>
            </a>
          </div>
          <div class="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <div class="dropdown-item">
                <p>You can insert <strong>any type of content</strong> within the dropdown menu.</p>
              </div>
              <hr class="dropdown-divider">
              <a class="dropdown-item" href="#">
                <b-icon icon="account" size="is-small"></b-icon>
                个人资料
              </a>
              <hr class="dropdown-divider">
              <a href="#" class="dropdown-item">
                <b-icon icon="lock-reset" size="is-small"></b-icon>
                修改密码
              </a>
            </div>
          </div>
        </div>

        <a class="navbar-item" href="#" @click="logout">
          <b-icon icon="logout"></b-icon>
        </a>
      </div>
    </div>
  </nav>
</template>
<script>
  import Message from '@/components/layout/navbar/message.vue'
  export default {
    components: {
      Message
    },
    data() {
      return {
        burgerToggle: false,
        menuToggle: false,
        showFolderAside: this.$store.getters.showFolderAside
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('Logout').then(res => {
          this.$router.push({path: '/login'})
        }).catch(err => {
        })
      },
      burgerClick() {
        this.burgerToggle = !this.burgerToggle
        this.menuToggle = !this.menuToggle
      },
      toggleAside() {
        this.showFolderAside = !this.showFolderAside
        this.$store.dispatch('changeShowFolderAside', {showFolderAside: this.showFolderAside})
      }
    },
    computed: {
      user() {
        return this.$store.getters.user
      }
    }
  }
</script>

