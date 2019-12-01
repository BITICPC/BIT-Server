<template>
  <div>
    <v-app-bar :fixed="true" color="purple" app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up" />
      <img src="~/static/BIT.png" style="width: 35px;">
      <v-toolbar-title class="ma-3">
        BIT Online Judge
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="(btn, idx) in buttons" :key="idx" :to="btn.link" exact text>
          <v-icon left small>
            fas fa-{{ btn.icon }}
          </v-icon>
          <span class="subtitle-1">{{ btn.title }}</span>
        </v-btn>
      </v-toolbar-items>

      <v-spacer />

      <div class="hidden-sm-and-down">
        <template v-if="!isLogin">
          <v-btn class="ma-2 subtitle-1" color="success" to="/login">
            <v-icon left small>
              fas fa-sign-in-alt
            </v-icon>
            Sign in
          </v-btn>
          <v-btn class="ma-2 subtitle-1" color="primary" to="/join">
            <v-icon left small>
              fas fa-user-plus
            </v-icon>
            Sign up
          </v-btn>
        </template>
        <template v-else>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" text>
                <v-icon left small>
                  fas fa-user
                </v-icon>
                {{ profile.username }}
                <v-icon right small>
                  fas fa-caret-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-subheader>{{ profile.isAdmin ? 'Admin' : 'Regular User' }}</v-subheader>
              <template v-for="(item, index) in items">
                <template v-if="index !== 1">
                  <v-list-item :to="item.link" :key="index">
                    <v-list-item-icon class="mr-1">
                      <v-icon small>
                        fas fa-{{ item.icon }}
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <template v-else>
                  <v-list-item :to="`/user/${profile.username}/setting`" :key="index">
                    <v-list-item-icon class="mr-1">
                      <v-icon small>
                        fas fa-{{ item.icon }}
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </template>
            </v-list>
          </v-menu>
        </template>
      </div>
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
        <v-list-item v-for="(btn, idx) in buttons" :key="idx" :to="btn.link" exact>
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
          icon: 'book-open',
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
