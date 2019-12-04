<template>
  <v-container>
    <v-row justify="center">
      <v-col class="py-0" cols="12" md="3">
        <v-skeleton-loader
          :loading="loading"
          type="card"
        >
          <v-card>
            <v-img src="https://cdn.v2ex.com/gravatar/ff22233d2641a6df9cd6f4c9a825c2c8?s=1000&d=mm" />
            <v-card-title class="pt-2">
              {{ $route.params.id }}
            </v-card-title>
            <v-card-subtitle>
              {{ profile.isAdmin ? '管理员' : '普通用户' }}
            </v-card-subtitle>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col class="pt-md-0 pb-0 pl-md-0" cols="12" md="4">
        <v-card>
          <v-card-title>用户资料</v-card-title>
          <v-card-subtitle>User Profile</v-card-subtitle>
          <v-divider />
          <v-list dense>
            <v-list-item v-for="(item, index) in profile" :key="index">
              <v-list-item-icon>
                <v-icon left>
                  mdi-{{ item.icon }}
                </v-icon>
                <span class="font-weight-bold">{{ item.title }}</span>
              </v-list-item-icon>
              <v-list-item-content>
                <span class="text-right">
                  {{ item.value }}
                </span>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col class="pt-md-0 pb-0 pl-md-0" cols="12" md="3">
        <v-card>
          <v-card-title>用户统计</v-card-title>
          <v-card-subtitle>User Statistical</v-card-subtitle>
          <v-divider />
          <v-list dense>
            <v-list-item v-for="(item, index) in statistical" :key="index">
              <v-list-item-icon>
                <v-icon left>
                  mdi-{{ item.icon }}
                </v-icon>
                <span class="font-weight-bold">{{ item.title }}</span>
              </v-list-item-icon>
              <v-list-item-content>
                <span :class="`${item.color}--text text-right`">
                  {{ item.value }}
                </span>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
import api from '@/components/utils/api'

export default {
  layout ({ query }) {
    if (query.polygon) {
      return 'polygon'
    }
  },
  data: () => ({
    profile: [
      {
        type: 'nickname',
        title: '昵称',
        icon: 'account',
        value: '保密'
      },
      {
        type: 'phone',
        title: '手机号',
        icon: 'phone',
        value: '保密'
      },
      {
        type: 'school',
        title: '学校',
        icon: 'school',
        value: '保密'
      },
      {
        type: 'studentId',
        title: '学号',
        icon: 'id-card',
        value: '保密'
      },
      {
        type: 'blogUrl',
        title: '个人主页',
        icon: 'rss',
        value: '保密'
      },
      {
        type: 'email',
        title: '邮箱',
        icon: 'email',
        value: '保密'
      }
    ],
    statistical: [
      {
        title: '用户排名',
        icon: 'chart-line',
        value: '1024 / 62375',
        color: 'success'
      },
      {
        title: '解题 / 尝试',
        icon: 'lightbulb-on',
        value: '未知',
        color: 'blue'
      },
      {
        title: '通过 / 提交',
        icon: 'poll',
        value: '未知',
        color: 'orange'
      },
      {
        title: '通过率',
        icon: 'check',
        value: '未知 %',
        color: 'secondary'
      }
    ],
    loading: false
  }),
  mounted () {
    this.loading = true
    api.getUserInfo(this.$route.params.id).then((res) => {
      for (const idx in this.profile) {
        if (res.data[this.profile[idx].type] !== null) {
          this.profile[idx].value = res.data[this.profile[idx].type]
        }
      }
      this.statistical[1].value = res.data.totalProblemsAccepted + ' / ' + res.data.totalProblemsAttempted
      this.statistical[2].value = res.data.totalAccepted + ' / ' + res.data.totalSubmissions
      this.statistical[3].value = (res.data.totalSubmissions > 0 ? Math.floor(res.data.totalAccepted / res.data.totalSubmissions * 100) : '0') + ' %'
    }).catch(() => {
      this.newToast({
        text: '获取用户信息失败!',
        color: 'error',
        icon: 'mdi-alert'
      })
    }).finally(() => { this.loading = false })
  },
  methods: {
    ...mapActions(['newToast'])
  }
}
</script>
