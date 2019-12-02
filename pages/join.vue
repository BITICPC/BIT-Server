<template>
  <v-container>
    <v-row justify="center">
      <v-col class="py-0" cols="12" md="4">
        <v-card>
          <v-card-title class="justify-center">
            注册
          </v-card-title>
          <v-card-subtitle class="text-center">
            Sign up
          </v-card-subtitle>
          <v-divider />
          <v-card-text>
            <v-form ref="form" @submit.prevent="register">
              <v-text-field
                v-model="formRegister.username"
                :rules="usernameRules"
                :loading="loading"
                :error-messages="getErrorByAttributes('username')"
                color="purple"
                prepend-icon="mdi-account"
                label="用户名"
                required
              />
              <v-text-field
                v-model="formRegister.password"
                :rules="passwordRules"
                :loading="loading"
                type="password"
                color="purple"
                prepend-icon="mdi-lock"
                label="密码"
                required
              />
              <v-text-field
                v-model="formRegister.confirm"
                :rules="passwordRules"
                :loading="loading"
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
                :loading="loading"
                type="number"
                color="purple"
                prepend-icon="mdi-phone"
                label="手机号"
                required
              />
              <v-checkbox
                v-model="formRegister.checkbox"
                :rules="[v => !!v || '请先阅读并勾选同意用户协议']"
                label="已阅读并同意用户协议"
                class="mb-2"
                color="purple"
                required
              />
              <v-btn :loading="loading" :color="errorCode !== 200 ? 'error' : 'primary'" type="submit" block>
                <v-icon left small>
                  fas fa-registered
                </v-icon>
                注册
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
      errorCode: 200,
      usernameRules: account.usernameRules,
      passwordRules: account.passwordRules,
      phoneRules: account.phoneRules,
      loading: false
    }
  },
  methods: {
    ...mapActions(['setJwt', 'getProfile', 'newToast']),
    getErrorByAttributes (field) {
      if (field === 'confirm' && this.formRegister.password !== this.formRegister.confirm) {
        return '两次输入的密码不一致'
      }
      if (field === 'username' && this.errorCode === 409) {
        return '已存在一位使用该名字的用户'
      }
      return null
    },
    register () {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.errorCode = 200
        api.register(this.formRegister).then(() => {
          api.login(this.formRegister).then((res) => {
            this.setJwt(res.data.jwt)
            this.getProfile(res.data.username)
            this.newToast({
              text: '注册成功！',
              color: 'success',
              icon: 'mdi-check-circle'
            })
            this.$router.push('/')
          })
        }).catch((err) => {
          if (err !== undefined) {
            this.errorCode = err.status
          }
          this.newToast({
            text: '注册失败！',
            color: 'error',
            icon: 'mdi-alert'
          })
        }).finally(() => { this.loading = false })
      }
    }
  }
}
</script>
