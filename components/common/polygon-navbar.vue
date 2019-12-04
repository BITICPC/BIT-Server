<template>
  <div>
    <v-app-bar :fixed="true" color="info" app dark>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer" />
      <img src="~/static/BIT.png" style="width: 35px;">
      <v-toolbar-title class="ma-3">
        BIT Online Judge
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="(btn, idx) in buttons" :key="idx" :to="btn.link" :exact="btn.title == 'Home'" text>
          <v-icon left small>
            fas fa-{{ btn.icon }}
          </v-icon>
          <span class="subtitle-1">{{ btn.title }}</span>
        </v-btn>
      </v-toolbar-items>

      <v-spacer />

      <v-toolbar-items class="hidden-sm-and-down">
        <template v-if="!isLogin">
          <v-row>
            <v-col class="pr-1">
              <v-btn class="subtitle-1" color="success" :to="{ path:'/login', query: { polygon: true } }">
                <v-icon left small>
                  fas fa-sign-in-alt
                </v-icon>
                登录
              </v-btn>
            </v-col>
            <v-col>
              <v-btn class="subtitle-1" color="primary" :to="{ path:'/join', query: { polygon: true } }">
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
              <v-btn text :to="{ path: `/user/${profile.username}`, query: { polygon: true } }" v-on="on">
                <v-avatar size="36" class="mr-2">
                  <img src="~/static/user.jpg">
                </v-avatar>
                <span>{{ profile.username }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item>
                <v-list-item-icon class="mr-3">
                  <v-icon>mdi-file-chart</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>提交记录</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item :to="{ path: `/user/${profile.username}/setting`, query: { polygon: true } }">
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

    <v-navigation-drawer id="drawer" v-model="drawer" width="200" temporary app>
      <template v-if="isLogin" v-slot:prepend>
        <v-list-item :to="`/user/${profile.username}/setting`" two-line>
          <v-list-item-avatar>
            <img src="~/static/user.jpg">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ profile.username }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ profile.isAdmin ? 'Admin' : 'Regular User' }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
      </template>
      <v-list dense nav>
        <v-list-item v-for="(btn, idx) in buttons" :key="idx" :to="btn.link" :exact="btn.title == 'Home'">
          <v-list-item-icon>
            <v-icon small>
              fas fa-{{ btn.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitle-1">
              {{ btn.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-if="!isLogin" v-slot:append>
        <div class="pa-1">
          <v-btn color="success" to="/login" block>
            <v-icon left small>
              fas fa-sign-in-alt
            </v-icon>
            Sign in
          </v-btn>
        </div>
        <div class="pa-1">
          <v-btn color="primary" to="/join" block>
            <v-icon left small>
              fas fa-user-plus
            </v-icon>
            Sign up
          </v-btn>
        </div>
      </template>
      <template v-else v-slot:append>
        <div class="pa-1">
          <v-btn color="secondary" to="/logout" block>
            <v-icon left small>
              fas fa-sign-out-alt fa-fw
            </v-icon>
            Sign out
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      drawer: false,
      buttons: [
        {
          title: 'Home',
          icon: 'home',
          link: '/polygon'
        },
        {
          title: 'Problem',
          icon: 'book-open',
          link: '/polygon/problem'
        },
        {
          title: 'Contest',
          icon: 'trophy',
          link: '/polygon/contest'
        }
      ],
      items: [
        {
          icon: 'sign-out-alt fa-fw"',
          title: 'Sign out',
          link: '/logout'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['profile', 'isLogin'])
  }
}
</script>
