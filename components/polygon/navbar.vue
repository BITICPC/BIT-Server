<template>
  <b-navbar toggleable="lg" type="dark" variant="purple" fixed="top" id="navbar">
    <b-container>
      <b-navbar-brand>
        <b-navbar-brand class="active">
          <img
            src="~/static/img/BIT.png"
            alt="BIT logo"
            class="mt-0 img-fluid"
            style="width: 35px;"
          />
        </b-navbar-brand>
        <b-navbar-brand tag="h1" class="mb-0">BIT Online Judge</b-navbar-brand>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/polygon" active-class="active" exact>
            <i class="fas fa-home"></i> Home
          </b-nav-item>
          <b-nav-item to="/polygon/problem" active-class="active">
            <i class="fas fa-code-branch"></i> Problem
          </b-nav-item>
          <b-nav-item to="/polygon/contest" active-class="active">
            <i class="fas fa-flag"></i> Contest
          </b-nav-item>
          <!-- <b-nav-item to="/" exact-active-class="active"><i class="fas fa-arrow-right"></i> 返回首页</b-nav-item> -->
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <template v-if="!isLogin">
            <b-nav-form>
              <b-button variant="success" to="/login">
                <i class="fas fa-sign-in-alt"></i> Sign in
              </b-button>
              <b-button variant="info" to="/join">
                <i class="fas fa-user-plus"></i> Sign up
              </b-button>
            </b-nav-form>
          </template>
          <template v-else>
            <b-nav-item-dropdown right>
              <template v-slot:button-content>
                <i class="fas fa-user"></i>
                {{ profile.username }}
              </template>
              <b-dropdown-item to="/logout">
                <i class="fas fa-sign-out-alt fa-fw"></i> 注销
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["profile", "isLogin"])
  }
};
</script>