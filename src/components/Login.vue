<template>
    <div class="container">
        <br>

        <div class="alert alert-success" role="alert" v-if="this.$route.params.fromSuccReg">注册成功，欢迎登录！</div>

        <div class="alert alert-warning" role="alert" v-if="loginError">
          <h5><Strong>登录失败</strong></h5>
          <ul>
            <li v-if="loginError.message">{{ loginError.message }}</li>
            <li v-for="errUsr in loginError.Username" :key="errUsr">{{ errUsr }}</li>
            <li v-for="errPwd in loginError.Password" :key="errPwd">{{ errPwd }}</li>
          </ul>
        </div>

        <h2>登录 <small>Please Sign in</small></h2>
        <br>

        <h5 class="control-label">用户名 <small>Username</small></h5>
        <div class="input-group mb-3">
            <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-user"></i></span></div>
            <input type="text" class="form-control" placeholder="Username" v-model="formLogin.username">
        </div>

        <h5 class="control-label">密码 <small>Password</small></h5>
        <div class="input-group mb-3">
            <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-key"></i></span></div>
            <input type="password" class="form-control" placeholder="Password" v-model="formLogin.password">
        </div>

        <div class="col-sl-10">
            <div class="checkbox"><label><input type="checkbox"> 保持登陆状态</label></div>
            <button type="submit" class="btn btn-success" @click="login()"><i class="fas fa-cloud-upload-alt"></i> Sign in</button>
        </div>
    </div>
</template>

<script>
// admin, bitwaves2019
import { mapActions } from 'vuex'
import api from '@/api'

export default {
  data () {
    return {
      formLogin: {
        username: '',
        password: ''
      },
      loginError: ''
    }
  },
  methods: {
    ...mapActions(['getProfile']),
    login () {
      let params = Object.assign({}, this.formLogin)
      api.login(params).then(response => {
        console.log(response)
        this.getProfile(response.data)
        this.$router.push('/')
      }).catch(error => {
        this.loginError = error
      })
    }
  }
}
</script>
