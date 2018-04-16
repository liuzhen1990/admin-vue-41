<template>
  <div class="login-wrap">
    <el-form label-width="100px" label-position="left" ref="form" class="demo-ruleForm login-form">
      <h3 class="login-title">用户登录</h3>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="name">
        <el-input v-model="userForm.password"></el-input>
      </el-form-item>
      <el-form-item label="登录">
        <el-button class="login-btn" type="primary" @click="login">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
import {saveUserInfo} from '@/assets/js/auth.js'
export default {
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      // console.log(this.userForm)
      const res = await axios.post('http://localhost:8888/api/private/v1/login', this.userForm)
      console.log(res)
      console.log(res.data)
      console.log(res.data.data)
      // 对象
      console.log(typeof (res.data.data))
      if (res.data.meta.status === 200) {
        // 如果登录成功，则需要要服务器签发给用户的token身份令牌记录到localStorage中
        saveUserInfo(res.data.data)
        // window.localStorage.setItem('admin-token', JSON.stringify(res.data.data))
        console.log(res.data.data)
        this.$router.push('/')
      }
    }
  }
}

</script>
<style>
.login-wrap {
  height: 100%;
  background-color: #607d8b;
  display:flex;
  justify-content:center;
  align-items:center;
}
.login-form{
  background-color: #fff;
  padding:30px;
  border-radius:5px;
}
.login-title{
  text-align:center;
}
.login-btn{
  width:100%;
}
</style>
