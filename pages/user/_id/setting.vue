<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-breadcrumbs class="pl-0 pt-0 py-3" :items="items" divider=">">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
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
                <v-form ref="profile" @submit.prevent="updateProfile">
                  <v-text-field
                    v-model="formProfile.nickname"
                    :rules="nicknameRules"
                    :loading="loading"
                    color="purple"
                    prepend-icon="mdi-account"
                    label="昵称"
                  />
                  <v-text-field
                    v-model="formProfile.phone"
                    :rules="phoneRules"
                    :loading="loading"
                    color="purple"
                    prepend-icon="mdi-phone"
                    label="手机号"
                  />
                  <v-text-field
                    v-model="formProfile.school"
                    :rules="schoolRules"
                    :loading="loading"
                    color="purple"
                    prepend-icon="mdi-school"
                    label="学校名称"
                  />
                  <v-text-field
                    v-model="formProfile.studentId"
                    :rules="studentIdRules"
                    :loading="loading"
                    type="number"
                    color="purple"
                    prepend-icon="mdi-id-card"
                    label="学号"
                  />
                  <v-text-field
                    v-model="formProfile.blogUrl"
                    :loading="loading"
                    type="url"
                    color="purple"
                    prepend-icon="mdi-rss"
                    label="个人主页"
                  />
                  <v-text-field
                    v-model="formProfile.email"
                    :rules="emailRules"
                    :loading="loading"
                    type="email"
                    color="purple"
                    prepend-icon="mdi-email"
                    label="邮箱"
                    class="mb-2"
                  />
                  <v-btn :loading="loading" color="primary" type="submit" block>
                    <v-icon left>
                      mdi-cloud-upload
                    </v-icon>
                    保存
                  </v-btn>
                </v-form>
              </v-tab-item>
              <v-tab-item value="account">
                <v-form ref="account" @submit.prevent="updateAccount">
                  <v-text-field
                    v-model="formAccount.username"
                    :rules="usernameRules"
                    :loading="loading"
                    color="purple"
                    prepend-icon="mdi-account"
                    label="用户名"
                    disabled
                  />
                  <v-text-field
                    v-model="formAccount.oldPassword"
                    :rules="passwordRules"
                    :loading="loading"
                    :error-messages="getErrorByAttributes('oldPassword')"
                    type="password"
                    color="purple"
                    prepend-icon="mdi-history"
                    label="旧密码"
                    required
                    autocomplete
                  />
                  <v-text-field
                    v-model="formAccount.password"
                    :rules="passwordRules"
                    :loading="loading"
                    :error-messages="getErrorByAttributes('password')"
                    type="password"
                    color="purple"
                    prepend-icon="mdi-lock"
                    label="新密码"
                    required
                  />
                  <v-text-field
                    v-model="formAccount.confirm"
                    :rules="passwordRules"
                    :loading="loading"
                    :error-messages="getErrorByAttributes('confirm')"
                    type="password"
                    color="purple"
                    prepend-icon="mdi-check-circle-outline"
                    label="确认密码"
                    class="mb-2"
                    required
                  />
                  <v-btn :loading="loading" :color="errorCode !== 200 ? 'error' : 'primary'" type="submit" block>
                    <v-icon left>
                      mdi-cloud-upload
                    </v-icon>
                    保存
                  </v-btn>
                </v-form>
              </v-tab-item>
              <v-tab-item value="safety" />
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import account from '@/plugins/utils/account'

export default {
  layout ({ query }) {
    if (query.polygon) {
      return 'polygon'
    }
  },
  middleware: 'login',
  data () {
    return {
      items: [
        {
          text: '用户',
          to: '/ranklist'
        },
        {
          text: this.$route.params.id,
          exact: true,
          to: '/user/' + this.$route.params.id
        },
        {
          text: '设置',
          to: '/user/' + this.$route.params.id + '/setting'
        }
      ],
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
        oldPassword: '',
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
      errorCode: 200
    }
  },
  computed: {
    ...mapGetters(['profile', 'isLogin'])
  },
  mounted () {
    if (this.$route.params.id === this.profile.username) {
      Object.keys(this.formProfile).forEach((element) => {
        if (this.profile[element] !== null) {
          this.formProfile[element] = this.profile[element]
        }
      })
      this.formAccount.username = this.profile.username
    } else {
      this.newToast({
        text: '您没有修改用户信息的权限！',
        color: 'error',
        icon: 'mdi-alert'
      })
    }
  },
  methods: {
    ...mapActions(['setProfile', 'changePassword', 'newToast']),
    getErrorByAttributes (field) {
      if (field === 'oldPassword' && this.errorCode === 403) {
        return '旧密码不正确'
      }
      if (field === 'password' && this.formAccount.password.length > 0 && this.formAccount.oldPassword === this.formAccount.password) {
        return '设置的新密码不能与旧密码完全相同'
      }
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
          this.newToast({
            text: '个人资料保存成功！',
            color: 'success',
            icon: 'mdi-check-circle'
          })
        }).catch(() => {
          this.newToast({
            text: '个人资料保存失败！',
            color: 'error',
            icon: 'mdi-alert'
          })
        }).finally(() => { this.loading = false })
      }
    },
    updateAccount () {
      if (this.$refs.account.validate()) {
        this.loading = true
        this.errorCode = 200
        this.changePassword(this.formAccount).then(() => {
          this.newToast({
            text: '密码修改成功！',
            color: 'success',
            icon: 'mdi-check-circle'
          })
          this.formAccount.oldPassword = this.formAccount.password = this.formAccount.confirm = ''
          this.$refs.account.resetValidation()
        }).catch((err) => {
          if (err !== undefined) {
            this.errorCode = err.status
          }
          this.newToast({
            text: '个人资料保存失败！',
            color: 'error',
            icon: 'mdi-alert'
          })
        }).finally(() => { this.loading = false })
      }
    }
  }
}
</script>
