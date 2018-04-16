<template>
  <!-- <p>home component</p> -->
  <el-container class="outerContainer">
    <el-header class="header">
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple"><img class="logo" src="./logo.jpg" alt=""></div></el-col>
        <el-col :offset="16" :span="4"><div class="grid-content bg-purple"><a href="#" @click.prevent="loginout">退出</a></div></el-col>
      </el-row>
    </el-header>
    <el-container class="BottomContainer">
      <el-aside class="side" width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo aside-menu"
          @open="handleOpen"
          @close="handleClose"
          :unique-opened="true"
          :router="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/users">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/roles">角色列表</el-menu-item>
              <el-menu-item index="/rights">权限列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">商品列表</el-menu-item>
              <el-menu-item index="3-2">商品分类</el-menu-item>
              <el-menu-item index="3-3">商品参数</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">订单列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1">数据报表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
    </el-menu>
      </el-aside>
      <el-main class="main"><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>
<script>
import {removeUserInfo} from '@/assets/js/auth'
export default {
  // 如果没有登录，则让用户跳转到登录组件
  // 否则就什么都不做，允许进来
  // 从本地存储拿到token
  // 如果有，让其通过，否则跳转到登录组件
  // 这种做法不严谨，如果用户自己添加admin-token,依然会进入
  // beforeCreate () {
  //   const token = window.localStorage.getItem('admin-token')
  //   if (!token) {
  //     this.$router.push({
  //       name: 'login'
  //     })
  //   }
  // },
  data () {
    return {}
  },
  methods: {
    loginout () {
      this.$confirm('您确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 1.删除本地存储的Token身份标识
        removeUserInfo()
        // window.localStorage.removeItem('admin-token')
        // 2.跳转到登录试图
        this.$router.push({
          name: 'login'
        })
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style>
.outerContainer .header {
  height:60px;
  background-color: #B3C0D1;
  line-height: 60px;
  padding-left:0;
  padding-right:0;
  width:100%;
}
.header .logo{
  height:60px;
  width: 88%;
}
.outerContainer{
  height:100%;
}
.BottomContainer, .aside-menu{
  /*height:100%;*/
  background-color: #D3DCE6;
}
.BottomContainer .side{
  background-color: #D3DCE6;
  height:100%;
}
.main{
  background-color: #E9EEF3;
  height:100%;
}
</style>
