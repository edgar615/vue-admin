<template>
  <transition :name="animation">
    <div class="form-modal">
      <div class="form-modal-background"></div>
      <div class="form-modal-card" :style="{ maxWidth: newWidth}">
        <b-loading :is-full-page="isFullPage" :active.sync="isLoading"></b-loading>
        <header class="form-modal-card-header">
          <div class="form-modal-card-title">
            {{name}}
          </div>
          <a class="form-modal-close" aria-hidden="true" @click="cancel()">
            <b-icon icon="close" size="is-small"></b-icon>
          </a>
        </header>
        <div class="notification form-modal-card-notification is-success" v-if="result === 1">
          <p>{{response.message}}</p>
        </div>
        <div class="notification form-modal-card-notification is-danger" v-if="result === 2">
          <p>{{response.message}}</p>
          <p v-if="response.err && response.err.msg">{{response.err.msg}}</p>
        </div>
        <component
          v-if="component && result != 1"
          v-bind="props"
          v-on="events"
          :is="component"
          @close="close"/>
        <div
          v-else-if="content && result === 0"
          v-html="content"/>
        <slot v-else/>
        <div class="form-modal-card-footer" v-if="result === 1">
          <button class="button" @click="close()">
            <span>关闭</span>
          </button>
        </div>
        <div class="form-modal-card-footer" v-if="showClose">
          <button class="button" @click="cancel()">
            <span>关闭</span>
          </button>
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
  import {removeElement} from '../../utils/helpers'

  export default {
    name: 'FormModal',
    props: {
      component: [Object, Function],
      name: {
        type: String,
        default: 'Modal'
      },
      content: String,
      props: Object,
      events: Object,
      width: {
        type: [String, Number],
        default: '50%'
      },
      animation: {
        type: String,
        default: 'zoom-out'
      },
      showClose: {
        type: Boolean,
        default: false
      },
      onClose: {
        type: Function,
        default: () => {}
      },
      response: Object
    },
    data () {
      return {
        isLoading: false,
        isFullPage: false,
        result: 0,
        isActive: this.active || false,
        savedScrollTop: null,
        newWidth: typeof this.width === 'number'
          ? this.width + 'px'
          : this.width
      }
    },
    computed: {
      newTop () {
        return !this.savedScrollTop ? 0 : `${this.savedScrollTop}px`
      }
    },
    watch: {
      isActive () {
        this.handleScroll()
      }
    },
    methods: {
      startLoading () {
        this.isLoading = true
      },
      closeLoading () {
        this.isLoading = false
      },
      succeed (message, data) {
        this.result = 1
        this.response = {
          message: message,
          data: data
        }
        this.closeLoading()
      },
      fail (message, err) {
        this.result = 2
        this.response = {
          message: message,
          err: err
        }
        this.closeLoading()
      },
      handleScroll () {
        if (typeof window === 'undefined') return
        if (this.isActive) {
          document.documentElement.classList.add('is-clipped')
        } else {
          document.documentElement.classList.remove('is-clipped')
        }
      },
      cancel () {
        this.$emit('close')
        this.$emit('update:active', false)
        // Timeout for the animation complete before destroying
        this.isActive = false
        setTimeout(() => {
          this.$destroy()
          removeElement(this.$el)
        }, 150)
      },
      /**
       * Call the onCancel prop (function).
       * Emit events, and destroy modal if it's programmatic.
       */
      close () {
        this.onClose.apply(null, arguments)
        this.cancel()
      }
    },
    beforeMount () {
      document.body.appendChild(this.$el)
    },
    mounted () {
      this.isActive = true
    },
    beforeDestroy () {
      if (typeof window !== 'undefined') {
        // reset scroll
        const savedScrollTop = !this.savedScrollTop
          ? document.documentElement.scrollTop
          : this.savedScrollTop
        document.body.classList.remove('is-noscroll')
        document.documentElement.scrollTop = savedScrollTop
        document.body.style.top = null
      }
    }
  }
</script>
