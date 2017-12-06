<template>
    <div class="app">
        <Navbar class="app__navbar"></Navbar>
        <el-row class="app__main-box">
            <el-col :span="4" class="app__router-nav-box">
                <Sidebar></Sidebar>
            </el-col>
            <el-col :span="20" class="app__main-content-box">
                <MainContent></MainContent>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Navbar from '@/components/layout/navbar/navbar.vue';
    import Sidebar from '@/components/layout/sidebar/sidebar.vue';
    import MainContent from '@/components/layout/main-content/main-content.vue';

    export default {
        data() {
            return {
            };
        },
        components: {
            Navbar,
            Sidebar,
            MainContent
        }
    };
</script>
<style>
   /**
    * 样式命名规范
    * - 要么使用 scoped
    * - 要么所有样式都基于组件的名称来做 BEM 的命名规范
    *   例如: app.vue 组件的名字为 app
    *         那么样式应该是 .app {} .app__element {} .app--modifier {}
    */
    .app,
    .app__main-box,
    .app__router-nav-box,
    .app__main-content-box {
        /* 全屏显示内容区域 */
        height: 100%;
    }
    .app__navbar {
        position: fixed;
        top: 0;
        z-index: 1;
        width: 100%;
    }
    .app__main-box {
        padding-top: 0px; /* 预留出顶部导航的高度 */
    }
    .app__router-nav-box {
        overflow: auto;
    }
    .app__main-content-box {
        overflow: auto;
        padding-top: 5px;
    }
</style>
