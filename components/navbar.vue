<template>
  <div>
    <v-app-bar :fixed="true" color="purple" app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up" />
      <img src="~/static/BIT.png" style="width: 35px;">
      <v-toolbar-title class="ma-3">
        BIT Online Judge
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="(btn, idx) in buttons" :key="idx" :to="btn.link" text>
          <v-icon class="ma-1" small>
            fas fa-{{ btn.icon }}
          </v-icon>
          <span class="subtitle-1">{{ btn.title }}</span>
        </v-btn>
      </v-toolbar-items>

      <v-spacer />

      <div class="hidden-sm-and-down">
        <template v-if="!isLogin">
          <v-btn class="ma-2 subtitle-1" color="success" to="/login">
            <v-icon class="mr-1" small>
              fas fa-sign-in-alt
            </v-icon>
            登录
          </v-btn>
          <v-btn class="ma-2 subtitle-1" color="primary" to="/join">
            <v-icon class="mr-1" small>
              fas fa-user-plus
            </v-icon>
            注册
          </v-btn>
        </template>
        <template v-else>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" text>
                <v-icon class="mr-1" small>
                  fas fa-user
                </v-icon>
                {{ profile.username }}
                <v-icon class="ml-2" small>
                  fas fa-caret-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :to="item.link"
              >
                <v-list-item-icon class="mr-1">
                  <v-icon small>
                    fas fa-{{ item.icon }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </div>
    </v-app-bar>

    <v-navigation-drawer id="drawer" v-model="drawer" temporary app width="200">
      <template v-if="isLogin" v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="~/static/user.jpg">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ profile.username }}
            </v-list-item-title>
            <v-list-item-subtitle>
              注册用户
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
      </template>
      <v-list dense nav>
        <v-list-item v-for="(btn, idx) in buttons" :key="idx" :to="btn.link">
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
            <v-icon class="mr-1" small>
              fas fa-sign-in-alt
            </v-icon>
            登录
          </v-btn>
        </div>
        <div class="pa-1">
          <v-btn color="primary" to="/join" block>
            <v-icon class="mr-1" small>
              fas fa-user-plus
            </v-icon>
            注册
          </v-btn>
        </div>
      </template>
      <template v-else v-slot:append>
        <div class="pa-1">
          <v-btn color="secondary" to="/logout" block>
            <v-icon class="mr-1" small>
              fas fa-sign-out-alt fa-fw
            </v-icon>
            注销
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
          title: '首页',
          icon: 'home',
          link: '/'
        },
        {
          title: '题库',
          icon: 'book-open',
          link: '/problem'
        },
        {
          title: '评测',
          icon: 'tasks',
          link: '/status'
        },
        {
          title: '排名',
          icon: 'signal',
          link: '/ranklist'
        },
        {
          title: '帮助',
          icon: 'question-circle',
          link: '/help'
        }
      ],
      items: [
        {
          icon: 'chart-pie',
          title: '提交记录'
        },
        {
          icon: 'edit',
          title: '用户设置'
        },
        {
          icon: 'sign-out-alt fa-fw"',
          title: '注销',
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
