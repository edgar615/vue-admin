<template>
    <el-row>
        <el-col :span="4" class="navbar__logo-box">
            <img src="../../../assets/logo.png" alt="" class="navbar__logo">
        </el-col>
        <el-col :span="20" class="navbar__menu-box">
          <el-menu :default-active="activeIndex" class="navbar__menu" mode="horizontal">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            <el-submenu index="4" class="navbar__menu-last">
              <template slot="title">Edgar</template>
              <el-menu-item index="4-1"><router-link to="/user/recharge">账户充值</router-link></el-menu-item>
              <el-menu-item index="4-2"><router-link to="/user/account">账户信息</router-link></el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        data() {
            return {
             activeIndex: '1',
            };
        },
        methods: {
            handleNavDropdownCommand: function(command) {
                if (command == 'logout') {
                    this.$confirm('确认退出吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(function() {
                        this.$message('你的退出逻辑');
                    }.bind(this));
                }
            }
        }
    };
</script>
<style>
    .navbar__logo-box {
        background-color: #0da7ff;
    }
    .navbar__logo {
        display: block;
        height: 60px;
        margin-left: auto;
        margin-right: auto;
    }
    .navbar__menu-box {
        background-color: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    }
    .navbar__menu {
        float: right;
        background-color: #fff;
    }
    .navbar__menu-last {
      margin-right: 50px;
     }
    .navbar__dropdown-menu a {
        color: inherit;
        text-decoration: none;
    }
    .navbar__title {
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 12px;
        height: 60px;
        line-height: 60px;
        font-size: 1.5em;
        font-weight: bold;
    }
    .navbar__title a {
        color: #48576a;
        text-decoration: none;
    }
</style>
