<template>
  <b-container><br>

    <b-alert v-model="$route.params.fromSuccReg" variant="success" dismissible>注册成功，欢迎登录！</b-alert>

    <b-alert v-model="formErrors.hasError" variant="warning" dismissible>
      <h5><Strong>登录失败</strong></h5>
      <li>{{ formErrors.errMessage }}</li>
    </b-alert>

    <h2>登录</h2><br>

    <b-form @submit="login">
      <h5 class="control-label">用户名</h5>
      <b-input-group class="mb-3">
        <b-input-group-prepend>
          <span class="input-group-text"><i class="fas fa-user"></i></span>
        </b-input-group-prepend>
        <b-form-input tyle="text" placeholder="请输入用户名" v-model="formLogin.username" required></b-form-input>
      </b-input-group>

      <h5 class="control-label">密码</h5>
      <b-input-group class="mb-3">
        <b-input-group-prepend>
          <span class="input-group-text"><i class="fas fa-lock"></i></span>
        </b-input-group-prepend>
        <b-form-input type="password" placeholder="请输入密码" v-model="formLogin.password" required></b-form-input>
      </b-input-group>

      <b-input-group class="mb-3">
        <b-form-checkbox value="rememberMe" switch>保持登陆状态</b-form-checkbox>
      </b-input-group>

      <b-button type="submit" variant="primary"><i class="fas fa-cloud-upload-alt"></i> 登录</b-button>
    </b-form>
  </b-container>
</template>
<script>
import { mapActions } from 'vuex'
import api from '@/components/api'

export default {
  data () {
    return {
      formLogin: {
        username: '',
        password: ''
      },
      formErrors: {
        hasError: false,
        errMessage: ''
      }
    }
  },
  methods: {
    ...mapActions(['setJwt', 'getProfile']),
    validation () {
      let checkUsername = this.formLogin.username.length >= 3
      let checkPassword = this.formLogin.password.length >= 6
      if (!checkUsername && !checkPassword) {
        this.formErrors.errMessage = '请输入正确的用户名和密码'
      } else if (!checkUsername) {
        this.formErrors.errMessage = '请输入正确的用户名'
      } else if (!checkPassword) {
        this.formErrors.errMessage = '请输入正确的密码'
      }
      return this.formErrors.hasError = !checkUsername || !checkPassword 
    },
    login (event) {
      event.preventDefault()
      if (!this.validation()) {
        api.login(this.formLogin).then(response => {
          this.setJwt(response.data.jwt)
          this.getProfile(response.data.username)
          this.$router.go(-1)
        }).catch(error => {
          this.formErrors = {
            hasError: true,
            errMessage: error.message
          }
        })
      }
    }
  }
}
</script>