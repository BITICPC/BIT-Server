<template>
    <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top"><div class="container">
      <a class="navbar-brand hidden-sm-down">BIT Online Judge</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item"><router-link class="nav-link" to="/"><i class="fas fa-home"></i> 首页</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/problems"><i class="fas fa-book-open"></i> 题库</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/contests"><i class="fas fa-trophy"></i> 比赛</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/status"><i class="fas fa-tasks"></i> 评测</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/ranklist"><i class="fas fa-signal"></i> 排名</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/help"><i class="fas fa-question-circle"></i> 帮助</router-link></li>
        </ul>

        <template v-if="!isLogin">
          <router-link class="nav-link justify-content-center" to="/login"><button type="button" class="btn btn-outline-success btn-sm"><i class="fas fa-sign-in-alt"></i> 登录</button></router-link>

          <router-link class="nav-link justify-content-center" to="/join"><button type="button" class="btn btn-outline-info btn-sm"><i class="fas fa-user-plus"></i> 注册</button></router-link>
        </template>
        <template v-else>
          <ul class="navbar-nav ml-auto"><li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><i class="fas fa-user"></i> {{ profile.username }}</a>
            <div class="dropdown-menu pull-right">
              <a class="dropdown-item disabled">User</a>
              <a class="dropdown-item" href="#"><i class="fas fa-chart-pie"></i> 提交记录</a>
              <router-link class="dropdown-item" to="/settings"><i class="fas fa-edit"></i> 用户设置</router-link>
              <router-link class="dropdown-item" to="/logout"><i class="fas fa-sign-out-alt fa-fw"></i> 注销</router-link>
            </div>
          </li></ul>
        </template>
    </div></div></nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['profile', 'isLogin'])
  }
}
</script>
