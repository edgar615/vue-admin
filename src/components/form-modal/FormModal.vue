<template>
  <transition :name="animation">
    <div class="form-modal">
      <div class="form-modal-background"></div>
      <div class="form-modal-card" :style="{ maxWidth: newWidth}">
        <header class="form-modal-card-header">
          <div class="form-modal-card-title">
            {{name}}
          </div>
          <a class="form-modal-close" aria-hidden="true" @click="cancel()">
            <b-icon icon="close" size="is-small"></b-icon>
          </a>
        </header>
        <component
          v-if="component"
          v-bind="props"
          v-on="events"
          :is="component"
          @close="close"/>
        <div
          v-else-if="content"
          v-html="content"/>
        <slot v-else/>
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
      onClose: {
        type: Function,
        default: () => {}
      }
    },
    data () {
      return {
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
