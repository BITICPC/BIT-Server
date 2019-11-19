<template>
  <footer class="bd-footer text-muted docs-border">
    <b-container>
      <b-row class="justify-content-center">
        <b-col md="3" class="text-left">
          <h5 class="text-purple-bright">服务</h5>
          <div class="list-unstyled">
            <li><nuxt-link to="/">首页</nuxt-link></li>
            <li>反馈</li>
            <li><nuxt-link to="/polygon">Polygon</nuxt-link></li>
            <li>Wiki</li>
          </div>
        </b-col>
        <b-col md="3" class="text-left">
          <h5 class="text-purple-bright">开源</h5>
          <div class="list-unstyled">
            <li> <a href="https://github.com/BITICPC">Github</a></li>
            <li> <a href="https://github.com/BITICPC/WaveTestLib">WaveTestlib</a></li>
          </div>
        </b-col>
        <b-col md="3" class="text-left">
          <h5 class="text-purple-bright">关于我们</h5>
          <div class="list-unstyled">
            <li>
              团队：
              <a href="mailto:msrlancern@126.com">@lancern</a>,
              <a href="mailto:dragon60066@163.com">@strawberry</a>
            </li>
            <li>
              联系方式：
              <a href="mailto:acmsupport@bit.edu.cn">acmsupport@bit.edu.cn</a>
            </li>
          </div>
        </b-col>
        <!-- <div class="text-center text-sm-right col-sm order-sm-3 col-12">
            <img src="~/static/img/BIT.png" alt="BIT logo" class="mb-4 mt-0 img-fluid" style="width: 100px;">
        </div>-->
      </b-row>
      <hr />
      <p class="mb-2">
        Powered by
        <a href="https://nuxtjs.org/">Nuxt.js</a> with Bootstrap-Vue v2.0.4
      </p>
      <p>BIT Online Judge Version: v{{ Version }}</p>
    </b-container>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      Version: "1.0"
    };
  }
};
</script>
