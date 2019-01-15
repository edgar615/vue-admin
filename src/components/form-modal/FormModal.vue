<template>
  <transition :name="animation">
    <div class="form-modal">
      <div class="form-modal-background"></div>
      <div id="form-modal" class="form-modal-card" :style="{ maxWidth: newWidth, top: newTop}">
        <header class="form-modal-card-header">
          <div class="form-modal-card-title">
            {{name}}
          </div>
          <a class="is-pulled-right" aria-hidden="true" @click="cancel()">
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
  import {removeElement, getViewPort, getDocumentPort} from '../../utils/helpers'

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
      onCancel: {
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
        if (typeof window === 'undefined') {
          return
        }
        this.savedScrollTop = !this.savedScrollTop
          ? document.documentElement.scrollTop
          : this.savedScrollTop
        console.log(this.savedScrollTop)
        // console.log(getDocumentPort().height)
        // console.log(getViewPort().height)
        // console.log(document.documentElement.scrollTop)
        // console.log(this.isActive)
        // console.log(this.$el)
        if (this.isActive) {
          document.body.classList.add('is-noscroll')
          // document.getElementsByClassName('form-modal-card')[0].style.top = !this.savedScrollTop ? 0 : `${this.savedScrollTop}px`
        } else {
          document.body.classList.remove('is-noscroll')
        }
        // if (this.isActive) {
        //   document.body.style.top = `-${this.savedScrollTop}px`
        //   return
        // }
        // document.documentElement.scrollTop = this.savedScrollTop
        // document.body.style.top = null
        // this.savedScrollTop = null
      },
      cancel (method) {
        this.close()
      },
      /**
       * Call the onCancel prop (function).
       * Emit events, and destroy modal if it's programmatic.
       */
      close () {
        this.$emit('close')
        this.$emit('update:active', false)
        // Timeout for the animation complete before destroying
        this.isActive = false
        setTimeout(() => {
          this.$destroy()
          removeElement(this.$el)
        }, 150)
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
