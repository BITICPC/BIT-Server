<template>
    <div class="container">
        <br>

        <div class="alert alert-warning" role="alert" v-if="preError || registerError">
          <h5><Strong>注册失败</strong></h5>
          <ul>
            <li v-if="preError">{{ preError }}</li>
            <li v-if="registerError.message">{{ registerError.message }}</li>
            <li v-for="errUsr in registerError.Username" :key="errUsr">{{ errUsr }}</li>
            <li v-for="errPwd in registerError.Password" :key="errPwd">{{ errPwd }}</li>
            <li v-for="errPhone in registerError.Phone" :key="errPhone">{{ errPhone }}</li>
          </ul>
        </div>

        <h2>注册 <small>Registration</small></h2><br>

        <h5 class="control-label">用户名 <small>User Name</small></h5>
        <div class="input-group mb-3">
            <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-user"></i></span></div>
            <input type="text" class="form-control" placeholder="User Name" v-model="formRegister.username">
        </div>

        <h5 class="control-label">手机号 <small>Phone Number</small></h5>
        <div class="input-group mb-3">
            <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-phone"></i></span></div>
            <input type="number" maxlength="11" class="form-control" placeholder="Phone Number" v-model="formRegister.phone">
        </div>

        <h5 class="control-label">密码 <small>Password</small></h5>
        <div class="input-group mb-3">
            <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-key"></i></span></div>
            <input type="password" class="form-control" placeholder="Password" v-model="formRegister.password">
        </div>

        <h5 class="control-label">确认密码 <small>Confirmation</small></h5>
        <div class="input-group mb-3">
            <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-question"></i></span></div>
            <input type="password" class="form-control" placeholder="Confirmation" v-model="confirmPwd">
        </div>

        <button type="submit" class="btn btn-success" @click="register()"><i class="fas fa-registered"></i> Sign up</button>

    </div>
</template>

<script>
import api from '@/api'

export default {
  data () {
    return {
      formRegister: {
        username: '',
        password: '',
        phone: ''
      },
      confirmPwd: '',
      preError: '',
      registerError: ''
    }
  },
  methods: {
    register () {
      if (this.confirmPwd === this.formRegister.password) {
        this.preError = ''
        let params = Object.assign({}, this.formRegister)
        api.register(params).then(response => {
          this.$router.push({
            name: 'Login',
            params: { fromSuccReg: true }
          })
        }).catch(error => {
          this.registerError = error
        })
      } else {
        this.preError = '两次输入的密码不匹配'
      }
    }
  }
}
</script>
