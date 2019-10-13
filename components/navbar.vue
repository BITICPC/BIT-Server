<template>
  <b-navbar toggleable="lg" type="dark" variant="purple" fixed="top">
    <b-navbar-brand>
      <b-navbar-brand tag="h1" class="mb-0">BIT Online Judge</b-navbar-brand>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/" active-class="active" exact><i class="fas fa-home"></i> 首页</b-nav-item>
        <b-nav-item to="/problems" active-class="active"><i class="fas fa-book-open"></i> 题库</b-nav-item>
        <b-nav-item to="/contests" active-class="active"><i class="fas fa-trophy"></i> 比赛</b-nav-item>
        <b-nav-item to="/status" active-class="active"><i class="fas fa-tasks"></i> 评测</b-nav-item>
        <b-nav-item to="/ranklist" active-class="active"><i class="fas fa-signal"></i> 排名</b-nav-item>
        <b-nav-item to="/help" active-class="active"><i class="fas fa-question-circle"></i> 帮助</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <template v-if="!isLogin">
          <b-nav-form>
            <b-button variant="success" to="/login"><i class="fas fa-sign-in-alt"></i> 登录</b-button>
            <b-button variant="info" to="/join"><i class="fas fa-user-plus"></i> 注册</b-button>
          </b-nav-form>
        </template>
        <template v-else>
          <b-nav-item-dropdown right>
            <template v-slot:button-content><i class="fas fa-user"></i> {{ profile.username }}</template>
            <b-dropdown-item href="#"><i class="fas fa-chart-pie"></i> 提交记录</b-dropdown-item>
            <b-dropdown-item to="/settings/profile"><i class="fas fa-edit"></i> 用户设置</b-dropdown-item>
            <b-dropdown-item to="/logout"><i class="fas fa-sign-out-alt fa-fw"></i> 注销</b-dropdown-item>
          </b-nav-item-dropdown>
        </template>
     </b-navbar-nav>
     </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['profile', 'isLogin'])
  }
}
</script>