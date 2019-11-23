<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 md4>
        <v-card>
          <v-card-title class="justify-center">
            注册
          </v-card-title>
          <v-card-subtitle class="text-center">
            Sign up
          </v-card-subtitle>
          <v-divider />
          <v-card-text>
            <v-form ref="form" @submit.prevent="register" class="mt-2">
              <v-text-field
                v-model="formRegister.username"
                :rules="usernameRules"
                :error-messages="getErrorByAttributes('username')"
                color="purple"
                prepend-icon="mdi-account"
                label="用户名"
                required
              />
              <v-text-field
                v-model="formRegister.password"
                :rules="passwordRules"
                type="password"
                color="purple"
                prepend-icon="mdi-lock"
                label="密码"
                required
              />
              <v-text-field
                v-model="formRegister.confirm"
                :rules="passwordRules"
                :error-messages="getErrorByAttributes('confirm')"
                type="password"
                color="purple"
                prepend-icon="mdi-check-circle-outline"
                label="确认密码"
                required
              />
              <v-text-field
                v-model="formRegister.phone"
                :rules="phoneRules"
                type="number"
                color="purple"
                prepend-icon="mdi-phone"
                label="手机号"
                required
              />
              <v-checkbox
                v-model="formRegister.checkbox"
                :rules="[v => !!v || '您必须同意用户协议才能继续。']"
                label="同意用户协议"
                class="mb-2"
                color="purple"
                required
              />
              <v-btn :loading="loading" :color="formErrors.errorCode ? 'error' : 'primary'" type="submit" block>
                <v-icon class="mr-2" small>
                  fas fa-registered
                </v-icon>
                注册
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
      formRegister: {
        username: '',
        password: '',
        phone: '',
        confirm: '',
        checkbox: false
      },
      formErrors: {
        errorCode: 0,
        message: ''
      },
      usernameRules: account.usernameRules,
      passwordRules: account.passwordRules,
      phoneRules: account.phoneRules,
      loading: false
    }
  },
  methods: {
    ...mapActions(['setJwt', 'getProfile']),
    getErrorByAttributes (field) {
      if (field === 'confirm') {
        return this.formRegister.password !== this.formRegister.confirm ? '两次输入的密码不一致' : null
      }
      return field === 'username' && this.formErrors.errorCode === 1 ? this.formErrors.message : null
    },
    register () {
      if (this.$refs.form.validate()) {
        this.loading = true
        api.register(this.formRegister).then(() => {
          api.login(this.formRegister).then((res) => {
            this.setJwt(res.data.jwt)
            this.getProfile(res.data.username)
            this.$router.push('/')
          })
        }).catch((err) => {
          this.formErrors = err
        }).finally(() => { this.loading = false })
      }
    }
  }
}
</script>
