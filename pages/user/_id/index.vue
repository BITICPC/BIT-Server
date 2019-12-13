<template>
  <v-container>
    <v-btn
      v-if="$route.params.id === profile.username"
      :to="{ path: `/user/${profile.username}/setting`, query: $route.query }"
      color="success"
      fab
      dark
      fixed
      bottom
      right
    >
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-row justify="center">
      <v-col cols="12" xl="9">
        <v-breadcrumbs class="pl-0 py-0" :items="items" divider=">">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="py-0" cols="12" sm="3" md="3" xl="2">
        <v-skeleton-loader
          :loading="loading"
          type="card"
        >
          <v-card>
            <v-img :src="avatar" :lazy-src="avatar">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey lighten-5" />
                </v-row>
              </template>
            </v-img>
            <v-card-title class="pt-2">
              {{ $route.params.id }}
            </v-card-title>
            <v-card-subtitle>
              {{ isAdmin ? '管理员' : '普通用户' }}
            </v-card-subtitle>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col class="pt-sm-0 pb-0 pl-sm-0" cols="12" sm="5" md="5" xl="4">
        <v-card>
          <v-card-title>用户资料</v-card-title>
          <v-card-subtitle>User Profile</v-card-subtitle>
          <v-divider />
          <v-list dense>
            <v-list-item v-for="(item, index) in profileMenu" :key="index">
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
      <v-col class="pt-sm-0 pb-0 pl-sm-0" cols="12" sm="4" md="4" xl="3">
        <v-card>
          <v-card-title>用户统计</v-card-title>
          <v-card-subtitle>User Statistical</v-card-subtitle>
          <v-divider />
          <v-list dense>
            <v-list-item v-for="(item, index) in statisticalMenu" :key="index">
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
import { mapActions, mapGetters } from 'vuex'
import api from '@/plugins/utils/api'
import account from '@/plugins/utils/account'

export default {
  layout ({ query }) {
    if (query.polygon === true) {
      return 'polygon'
    }
  },
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
        }
      ],
      profileMenu: [
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
      statisticalMenu: [
        {
          title: '用户排名',
          icon: 'chart-line',
          value: '未知',
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
      avatar: require('@/static/user.jpg'),
      isAdmin: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['profile'])
  },
  mounted () {
    this.loading = true
    api.getUserInfo(this.$route.params.id).then((res) => {
      for (const idx in this.profileMenu) {
        if (res.data[this.profileMenu[idx].type] !== null) {
          this.profileMenu[idx].value = res.data[this.profileMenu[idx].type]
        }
      }
      if (res.data.email !== null) {
        this.avatar = 'https://www.gravatar.com/avatar/' + account.getGravatar(res.data.email) + '?s=300'
      }
      this.isAdmin = res.data.isAdmin
      this.statisticalMenu[0].value = res.data.rank
      this.statisticalMenu[1].value = res.data.totalProblemsAccepted + ' / ' + res.data.totalProblemsAttempted
      this.statisticalMenu[2].value = res.data.totalAccepted + ' / ' + res.data.totalSubmissions
      this.statisticalMenu[3].value = (res.data.totalSubmissions > 0 ? Math.floor(res.data.totalAccepted / res.data.totalSubmissions * 100) : '0') + ' %'
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
