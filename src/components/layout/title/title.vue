<template>
    <nav class="level page-title">
        <!-- Left side -->
        <div class="level-left">
            <PageTitle></PageTitle>
        </div>
    </nav>
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
