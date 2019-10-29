<template>
  <b-form @submit="saveNewPassword">
    <h5 class="control-label">用户名</h5>
    <b-input-group class="mb-3">
      <b-input-group-prepend>
        <span class="input-group-text"><i class="fas fa-user"></i></span>
      </b-input-group-prepend>
      <b-form-input tyle="text" placeholder="Username" v-model="formAccount.username" disabled></b-form-input>
    </b-input-group>
    <h5 class="control-label">新密码</h5>
      <b-input-group class="mb-3">
      <b-input-group-prepend>
        <span class="input-group-text"><i class="fas fa-lock"></i></span>
      </b-input-group-prepend>
      <b-form-input type="password" placeholder="New Password" v-model="formAccount.password" required></b-form-input>
    </b-input-group>

    <h5 class="control-label">确认密码</h5>
    <b-input-group class="mb-3">
      <b-input-group-prepend>
        <span class="input-group-text"><i class="fas fa-question"></i></span>
      </b-input-group-prepend>
      <b-form-input type="password" placeholder="Password Confirmation" v-model="formAccount.confirm" required></b-form-input>
    </b-input-group>

    <b-button type="submit" variant="primary"><i class="fas fa-cloud-upload-alt"></i> 确认</b-button>
  </b-form>
</template>

<script>
export default {
  data () {
    return {
      formAccount: {
        username: '',
        password: '',
        confirm: ''
      },
      formStatus: {
        hasError: false,
        hasSucceed: false,
        message: []
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.formAccount.username = this.$store.state.user.profile.username
    },
    validation () {
      this.formStatus.message = []
      this.formStatus.hasSucceed = false
      if (this.formAccount.password.length < 6) {
        this.formStatus.message.push('设置的新密码长度必须大于5位')
      }
      if (this.formAccount.confirm !== this.formAccount.password) {
        this.formStatus.message.push('两次输入的密码不匹配')
      }
      return this.formStatus.hasError = this.formStatus.message.length > 0
    },
    saveNewPassword (event) {
      event.preventDefault()
      if (!this.validation()) {
        this.formStatus.hasSucceed = true
        this.formStatus.message = ['修改密码成功！']
        this.$emit('status', this.formStatus)
      } else {
        this.$emit('status', this.formStatus)
      }
    }
  }
}
</script>