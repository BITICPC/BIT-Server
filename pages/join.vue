<template>
  <div class="container"><br>

    <b-alert v-model="formErrors.hasError" variant="warning" dismissible>
      <h5><Strong>登录失败</strong></h5>
      <ul>
        <li v-for="errMessage in formErrors.errMessage" :key="errMessage">{{ errMessage }}</li>
      </ul>
    </b-alert>

    <h2>注册</h2><br>

    <b-form @submit="register">
      <h5 class="control-label">用户名</h5>
      <b-input-group class="mb-3">
        <b-input-group-prepend>
          <span class="input-group-text"><i class="fas fa-user"></i></span>
        </b-input-group-prepend>
        <b-form-input type="text" placeholder="请输入用户名" v-model="formRegister.username" required></b-form-input>
      </b-input-group>

      <h5 class="control-label">手机号</h5>
      <b-input-group class="mb-3">
        <b-input-group-prepend>
          <span class="input-group-text"><i class="fas fa-phone"></i></span>
        </b-input-group-prepend>
        <b-form-input type="number" placeholder="请输入手机号" v-model="formRegister.phone" required></b-form-input>
      </b-input-group>

      <h5 class="control-label">密码</h5>
      <b-input-group class="mb-3">
        <b-input-group-prepend>
          <span class="input-group-text"><i class="fas fa-lock"></i></span>
        </b-input-group-prepend>
        <b-form-input type="password" placeholder="请输入密码" v-model="formRegister.password" required></b-form-input>
      </b-input-group>

      <h5 class="control-label">确认密码</h5>
      <b-input-group class="mb-3">
        <b-input-group-prepend>
          <span class="input-group-text"><i class="fas fa-question"></i></span>
        </b-input-group-prepend>
        <b-form-input type="password" placeholder="请再次输入密码" v-model="formRegister.confirm" required></b-form-input>
      </b-input-group><br>

    <b-button type="submit" variant="primary"><i class="fas fa-registered"></i> 注册</b-button>
    </b-form>
  </div>
</template>

<script>
import api from '@/components/api'

export default {
  data () {
    return {
      formRegister: {
        username: '',
        phone: '',
        password: '',
        confirm: ''
      },
      formErrors: {
        hasError: false,
        errMessage: []
      }
    }
  },
  methods: {
    validation () {
      this.formErrors.errMessage = []
      if (this.formRegister.username.length < 3) {
        this.formErrors.errMessage.push('用户名长度必须大于2位')
      }
      if (this.formRegister.phone.length != 11) {
        this.formErrors.errMessage.push('手机号格式错误')
      }
      if (this.formRegister.password.length < 6) {
        this.formErrors.errMessage.push('设置的密码长度必须大于5位')
      }
      if (this.formRegister.confirm !== this.formRegister.password) {
        this.formErrors.errMessage.push('两次输入的密码不匹配')
      }
      return this.formErrors.hasError = this.formErrors.errMessage.length > 0
    },
    register (event) {
      event.preventDefault()
      if (!this.validation()) {
        api.register(this.formRegister).then(response => {
          this.$router.push({
            name: 'login',
            params: { fromSuccReg: true }
          })
        }).catch(error => {
          // console.log(error)
          this.formErrors.hasError = true;
          this.formErrors.errMessage = [ error.message ]
        })
      }
    }
  }
}
</script>