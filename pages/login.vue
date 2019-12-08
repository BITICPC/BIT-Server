<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-center" cols="12">
        <v-card width="350">
          <v-card-title class="justify-center">
            登录
          </v-card-title>
          <v-card-subtitle class="text-center">
            Sign in
          </v-card-subtitle>
          <v-divider />
          <v-card-text>
            <v-form ref="form" @submit.prevent="login">
              <v-text-field
                v-model="formLogin.username"
                :rules="usernameRules"
                :loading="loading"
                :error-messages="getErrorByAttributes('username')"
                color="purple"
                prepend-icon="mdi-account"
                label="用户名"
                autocomplete
                required
              />
              <v-text-field
                v-model="formLogin.password"
                :rules="passwordRules"
                :loading="loading"
                :error-messages="getErrorByAttributes('password')"
                type="password"
                color="purple"
                prepend-icon="mdi-lock"
                label="密码"
                class="mb-2"
                autocomplete
                required
              />
              <!-- <v-checkbox color='purple' label='保持登陆状态' /> -->
              <v-btn :loading="loading" :color="errorCode !== 200 ? 'error' : 'success'" type="submit" block>
                <v-icon left small>
                  fas fa-sign-in-alt
                </v-icon>
                登录
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import account from '@/plugins/utils/account'
import api from '@/plugins/utils/api'

export default {
  layout ({ query }) {
    if (query.polygon === true) {
      return 'polygon'
    }
  },
  data () {
    return {
      formLogin: {
        username: '',
        password: ''
      },
      usernameRules: account.usernameRules,
      passwordRules: account.passwordRules,
      errorCode: 200,
      loading: false
    }
  },
  watch: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    ...mapActions(['setProfile', 'newToast']),
    getErrorByAttributes (field) {
      if (this.errorCode === 404 && field === 'username') {
        return '此用户名尚未注册'
      }
      if (this.errorCode === 422 && field === 'password') {
        return '密码错误'
      }
      return null
    },
    login () {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.errorCode = 200
        api.login(this.formLogin).then((res) => {
          this.setProfile({
            username: res.data.username,
            role: res.data.isAdmin,
            jwt: res.data.jwt
          })
          this.newToast({
            text: '登录成功！',
            color: 'success',
            icon: 'mdi-check-circle'
          })
          if (this.$route.query.back) {
            this.$router.push(this.$route.query.back)
          } else {
            this.$router.go(-1)
          }
        }).catch((err) => {
          if (err !== undefined) {
            this.errorCode = err.status
          }
          this.newToast({
            text: '登录失败！',
            color: 'error',
            icon: 'mdi-alert'
          })
        }).finally(() => { this.loading = false })
      }
    }
  }
}
</script>
