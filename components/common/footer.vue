<template>
  <v-footer dark padless>
    <v-container>
      <v-row justify="center">
        <v-col lg="3">
          <h3>服务</h3>
          <ul>
            <li>
              <nuxt-link to="/">
                首页
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/feedback">
                反馈
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/polygon">
                Polygon
              </nuxt-link>
            </li>
            <li>Wiki</li>
          </ul>
        </v-col>
        <v-col lg="3">
          <h3>开源</h3>
          <ul>
            <li>
              <a href="https://github.com/BITICPC">Github</a>
            </li>
            <li>
              <a href="https://github.com/BITICPC/WaveTestLib">WaveTestlib</a>
            </li>
          </ul>
        </v-col>
        <v-col lg="4">
          <h3>关于我们</h3>
          <ul>
            <li>
              团队：
              <a href="mailto:msrlancern@126.com">@lancern</a>,
              <a href="mailto:dragon60066@163.com">@strawberry</a>
            </li>
            <li>
              联系方式：
              <a href="mailto:acmsupport@bit.edu.cn">acmsupport@bit.edu.cn</a>
            </li>
          </ul>
        </v-col>
      </v-row>
      <v-divider />
      <v-card-text class="py-2 grey--text text-center">
        Powered by
        <a href="https://nuxtjs.org/">Nuxt.js</a>
        with Vuetify - {{ new Date().getFullYear() }}
        <br>
        BIT Online Judge Version: v{{ Version }}
      </v-card-text>
    </v-container>
  </v-footer>
</template>
<script>
export default {
  data () {
    return {
      Version: '1.0'
    }
  }
}
</script>
