<template>
  <div>
    <v-app-bar color="teal" fixed app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-avatar class="ml-2" size="36">
        <img src="@/static/BIT.png">
      </v-avatar>
      <v-toolbar-title class="ma-3">
        BIT Online Judge
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <template v-if="!isLogin">
          <v-row>
            <v-col class="pr-1">
              <v-btn class="subtitle-1" color="success" to="/login">
                <v-icon left small>
                  fas fa-sign-in-alt
                </v-icon>
                登录
              </v-btn>
            </v-col>
            <v-col>
              <v-btn class="subtitle-1" color="primary" to="/join">
                <v-icon left small>
                  fas fa-user-plus
                </v-icon>
                注册
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <v-menu open-on-hover offset-y>
            <template v-slot:activator="{ on }">
              <v-btn class="nav" text :to="`/user/${profile.username}`" v-on="on">
                <v-avatar size="36" class="mr-2">
                  <v-img :src="avatar" />
                </v-avatar>
                <span>{{ profile.username }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item v-if="isAdmin" to="/jury">
                <v-list-item-icon class="mr-3">
                  <v-icon>mdi-tools</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>后台管理</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item :to="{ path: '/status', query: { author: profile.username } }">
                <v-list-item-icon class="mr-3">
                  <v-icon>mdi-file-chart</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>提交记录</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item :to="`/user/${profile.username}/setting`">
                <v-list-item-icon class="mr-3">
                  <v-icon>mdi-account-edit</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>用户设置</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/logout">
                <v-list-item-icon class="mr-3">
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>注销</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      drawer: true,
      avatar: require('@/static/user.jpg')
    }
  },
  computed: {
    ...mapGetters(['profile', 'isLogin', 'isAdmin'])
  }
}
</script>
