<template>
    <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top">
      <a class="navbar-brand hidden-sm-down">BIT Online Judge</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <router-link class="nav-link" to="/"><i class="fas fa-home"></i> Home</router-link>
          <router-link class="nav-link" to="/problem"><i class="fas fa-book-open"></i> Problems</router-link>
          <router-link class="nav-link" to="/contest"><i class="fas fa-trophy"></i> Contests</router-link>
          <router-link class="nav-link" to="/status"><i class="fas fa-file-code"></i> Status</router-link>
          <router-link class="nav-link" to="/rank"><i class="fas fa-list-ol"></i> Rank</router-link>
          <router-link class="nav-link" to="/about"><i class="fas fa-question-circle"></i> About</router-link>
        </ul>

        <template v-if="!isLogin">
          <router-link class="nav-link justify-content-center" to="/login"><button type="button" class="btn btn-outline-secondary btn-sm"><i class="fas fa-sign-in-alt"></i> Login</button></router-link>

          <router-link class="nav-link justify-content-center" to="/join"><button type="button" class="btn btn-outline-info btn-sm"><i class="fas fa-user-plus"></i> Sign up</button></router-link>
        </template>
        <template v-else>
          <ul class="navbar-nav ml-auto"><li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><i class="fas fa-user"></i> {{ profile.username }}</a>
            <div class="dropdown-menu pull-right">
              <a class="dropdown-item disabled">User</a>
              <a class="dropdown-item" href="#"><i class="fas fa-history"></i> Submissions</a>
              <router-link class="dropdown-item" to="/setting"><i class="fas fa-user-cog"></i> Settings</router-link>
              <a class="dropdown-item" @click="logout()"><i class="fas fa-sign-out-alt fa-fw"></i> Logout</a>
            </div>
          </li></ul>
        </template>
    </div></nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['profile', 'isLogin'])
  },
  methods: {
    logout () {
      this.$store.dispatch('clearProfile')
    }
  }
}
</script>
