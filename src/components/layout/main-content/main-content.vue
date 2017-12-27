<template>
    <div class="main-content">
        <RouterBreadcrumb></RouterBreadcrumb>
        <router-view class="pl-3 pr-3"></router-view>
    </div>
</template>
<script>
    import RouterBreadcrumb from '@/components/layout/router-breadcrumb/router-breadcrumb.vue'

    export default {
        data() {
            return {
            };
        },
        components: {
            RouterBreadcrumb
        }
    };
</script>
