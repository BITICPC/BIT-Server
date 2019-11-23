<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 md4>
        <v-card>
          <v-card-title class="justify-center">
            登录
          </v-card-title>
          <v-card-subtitle class="text-center">
            Sign in
          </v-card-subtitle>
          <v-divider />
          <v-card-text>
            <v-form ref="form" @submit.prevent="login" class="mt-2">
              <v-text-field
                v-model="formLogin.username"
                :rules="usernameRules"
                :error-messages="getErrorByAttributes('username')"
                color="purple"
                prepend-icon="mdi-account"
                label="用户名"
                required
              />
              <v-text-field
                v-model="formLogin.password"
                :rules="passwordRules"
                :error-messages="getErrorByAttributes('password')"
                type="password"
                color="purple"
                prepend-icon="mdi-lock"
                label="密码"
                class="mb-2"
                required
              />
              <!-- <v-checkbox color='purple' label='保持登陆状态' /> -->
              <v-btn :loading="loading" :color="formErrors.errorCode ? 'error' : 'success'" type="submit" block>
                <v-icon class="mr-2" small>
                  fas fa-sign-in-alt
                </v-icon>
                登录
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
import account from '@/components/utils/account'
import api from '@/components/utils/api'

export default {
  data () {
    return {
      formLogin: {
        username: '',
        password: ''
      },
      usernameRules: account.usernameRules,
      passwordRules: account.passwordRules,
      formErrors: {
        errorCode: 0,
        message: ''
      },
      loading: false
    }
  },
  methods: {
    ...mapActions(['setJwt', 'getProfile']),
    getErrorByAttributes (field) {
      return (this.formErrors.errorCode === 1 && field === 'username') || (this.formErrors.errorCode === 2 && field === 'password') ? this.formErrors.message : null
    },
    login () {
      if (this.$refs.form.validate()) {
        this.loading = true
        api.login(this.formLogin).then((res) => {
          this.setJwt(res.data.jwt)
          this.getProfile(res.data.username)
          this.$router.go(-1)
        }).catch((err) => {
          this.formErrors = err
        }).finally(() => { this.loading = false })
      }
    }
  }
}
</script>
