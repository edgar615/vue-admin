<template>
    <section>
        <div class="level" v-if="title && title != ''">
            <div class="level-left">
                <div class="level-item">
                    <div class="title has-text-primary">{{title}}</div>
                </div>
            </div>
        </div>
        <div class="notification" v-if="description && description != ''">
            {{description}}
        </div>
        {{description}}
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
        created () {
        }
    }
</script>
