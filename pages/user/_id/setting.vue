<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 md4>
        <v-card>
          <v-tabs v-model="tabs" color="purple" centered icons-and-text>
            <v-tab href="#profile">
              个人资料<v-icon>fas fa-address-card</v-icon>
            </v-tab>
            <v-tab href="#account">
              账号信息<v-icon>fas fa-user-cog</v-icon>
            </v-tab>
            <v-tab href="#safety" disabled>
              安全设置<v-icon>fas fa-shield-alt</v-icon>
            </v-tab>
          </v-tabs>
          <v-card-text>
            <v-tabs-items v-model="tabs">
              <v-tab-item value="profile">
                <v-form ref="profile" @submit.prevent="updateProfile" class="mt-2">
                  <v-text-field
                    v-model="formProfile.nickname"
                    :rules="nicknameRules"
                    color="purple"
                    prepend-icon="mdi-account"
                    label="昵称"
                  />
                  <v-text-field
                    v-model="formProfile.phone"
                    :rules="phoneRules"
                    color="purple"
                    prepend-icon="mdi-phone"
                    label="手机号"
                  />
                  <v-text-field
                    v-model="formProfile.school"
                    :rules="schoolRules"
                    color="purple"
                    prepend-icon="mdi-school"
                    label="学校名称"
                  />
                  <v-text-field
                    v-model="formProfile.studentId"
                    :rules="studentIdRules"
                    type="number"
                    color="purple"
                    prepend-icon="mdi-id-card"
                    label="学号"
                  />
                  <v-text-field
                    v-model="formProfile.blogUrl"
                    type="url"
                    color="purple"
                    prepend-icon="mdi-rss"
                    label="个人主页"
                  />
                  <v-text-field
                    v-model="formProfile.email"
                    :rules="emailRules"
                    type="email"
                    color="purple"
                    prepend-icon="mdi-email"
                    label="邮箱"
                    class="mb-2"
                  />
                  <v-btn :loading="loading" color="primary" type="submit" block>
                    <v-icon class="mr-2">
                      mdi-cloud-upload
                    </v-icon>
                    保存
                  </v-btn>
                </v-form>
              </v-tab-item>
              <v-tab-item value="account">
                <v-form ref="account" @submit.prevent="updateAccount" class="mt-2">
                  <v-text-field
                    v-model="formAccount.username"
                    :rules="usernameRules"
                    color="purple"
                    prepend-icon="mdi-account"
                    label="用户名"
                    disabled
                  />
                  <v-text-field
                    v-model="formAccount.password"
                    :rules="passwordRules"
                    type="password"
                    color="purple"
                    prepend-icon="mdi-lock"
                    label="新密码"
                    required
                  />
                  <v-text-field
                    v-model="formAccount.confirm"
                    :rules="passwordRules"
                    :error-messages="getErrorByAttributes('confirm')"
                    type="password"
                    color="purple"
                    prepend-icon="mdi-check-circle-outline"
                    label="确认密码"
                    required
                  />
                </v-form>
              </v-tab-item>
              <v-tab-item value="safety" />
            </v-tabs-items>
          </v-card-text>
        </v-card>
        <v-snackbar v-model="snackbar.show" color="success">
          {{ snackbar.message }}
          <v-btn @click="snackbar.show = false" dark text>
            关闭
          </v-btn>
        </v-snackbar>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import account from '@/components/utils/account'

export default {
  data () {
    return {
      formProfile: {
        nickname: '',
        school: '',
        studentId: '',
        blogUrl: '',
        email: '',
        phone: ''
      },
      formAccount: {
        username: '',
        password: '',
        confirm: ''
      },
      usernameRules: account.usernameRules,
      passwordRules: account.passwordRules,
      nicknameRules: account.nicknameRules,
      phoneRules: account.phoneRules,
      schoolRules: account.schoolRules,
      studentIdRules: account.studentIdRules,
      emailRules: account.emailRules,
      tabs: null,
      loading: false,
      snackbar: {
        show: false,
        message: ''
      }
    }
  },
  computed: {
    ...mapGetters(['profile', 'isLogin'])
  },
  mounted () {
    if (this.isLogin) {
      Object.keys(this.formProfile).forEach((element) => {
        if (this.profile[element] !== null) {
          this.formProfile[element] = this.profile[element]
        }
      })
      this.formAccount.username = this.profile.username
    }
  },
  methods: {
    ...mapActions(['setProfile']),
    getErrorByAttributes (field) {
      if (field === 'confirm' && this.formAccount.password !== this.formAccount.confirm) {
        return '两次输入的密码不一致'
      }
      return null
    },
    updateProfile () {
      if (this.$refs.profile.validate()) {
        this.loading = true
        const data = {}
        Object.keys(this.formProfile).forEach((element) => {
          if (this.formProfile[element].length > 0) {
            data[element] = this.formProfile[element]
          } else {
            data[element] = null
          }
        })
        this.setProfile(data).then(() => {
          this.snackbar.message = '个人资料保存成功！'
          this.snackbar.show = true
        }).finally(() => { this.loading = false })
      }
    }
  }
}
</script>
