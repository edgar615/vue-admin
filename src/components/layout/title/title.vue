<template>
    <section class="mt-3 mb-3">
        <div class="level" v-if="title && title != ''">
            <div class="level-left">
                <div class="level-item">
                    <div class="title is-size-4 has-text-primary">{{title}}</div>
                </div>
            </div>
        </div>
        <div class="level" v-else>
            <div class="level-left">
                <div class="level-item">
                    <div class="title is-size-4 has-text-primary">{{lastRouteName}}</div>
                </div>
            </div>
        </div>
        <div class="notification" v-if="description && description != ''">
            {{description}}
        </div>
    </section>
</template>

<script>
    export default {
        data () {
            return {
                title: this.$route.meta.title,
                description: this.$route.meta.description
            }
        },
        computed: {
            lastRouteName() {
              return this.$route.matched[this.$route.matched.length - 1].meta.name
            },
            breadcrumbMenu() {
              return this.$route.matched
            },
            showBreadcrumb() {
              const matched = this.$route.matched
              if (matched) {
                return matched[matched.length - 1].meta.showBreadcrumb
              }
              return false
            }
        },
        created () {
        }
    }
</script>
