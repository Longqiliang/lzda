<template>
  <div class="app-wrapper">
    <div class="login">
      <h2 class="title">
      <img src="../assets/logo.png" alt="lzda-logo" class="title-logo">
    </h2>
    <div class="form-group">
      <h4 class="form-title">用户登录</h4>
      <el-form class="login-form" autocomplete="on" :model="user" :rules="loginRules" ref="loginForm" label-position="left">
        <el-form-item prop="username"> 
          <label for="user" class="form-input_label">
            <i class="form-icon iconfont icon-username"></i>
          </label>
          <el-input type="text" name="username" class="form-input" placeholder="请输入您的帐号" id="user" v-model="user.username" />
        </el-form-item>
        <el-form-item prop="password">
          <label for="password" class="form-input_label">
            <i class="form-icon iconfont icon-password"></i>
          </label>
          <el-input type="password" name="password" class="form-input" placeholder="密码6-18位"  id="password" v-model="user.password" />
        </el-form-item>
        <div class="form-input-footer">
          <el-button type="primary" :loading="loading" @click.native.prevent="onSubmit">登&nbsp;&nbsp;录</el-button>
        </div>
      </el-form>
    </div>
    </div>
    
  </div>

</template>

<script>
import { login } from '@/api/article'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  data () {
    const validatePassword = (rule, value, callback) => {
      // if(value.length < 6 || value.length > 18) {
      //   callback(new Error('请输入有效的密码'))
      // } else {
      //   callback()
      // }
      callback()
    }
    return {
      user: {
        username: null,
        password: null
      },
      loginRules: {
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false
    }
  },
  methods: {
    onSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          login(this.user).then(res => {
            const data = res.data
            this.loading = false
            if(data.success){
              const user = data.user 
              setToken(user.username)
              this.$router.push({ path: '/' })
            }else {
              this.$message.error(data.message)
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
