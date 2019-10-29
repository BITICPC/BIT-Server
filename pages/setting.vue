<template>
  <b-container>
    <br />

    <b-alert
      v-model="formStatus.hasSucceed"
      variant="success"
      dismissible
    >{{ formStatus.message[0] }}</b-alert>

    <b-alert v-model="formStatus.hasError" variant="warning" dismissible>
      <h5>
        <strong>保存失败</strong>
      </h5>
      <li v-for="message in formStatus.message" :key="message">{{ message }}</li>
    </b-alert>

    <b-card>
      <div class="row">
        <div class="col-3">
          <p>
            <b-img thumbnail fluid src="~/static/img/user_ico.jpg" alt="default user"></b-img>
          </p>
          <b-nav class="flex-column" id="settings" pills>
            <b-nav-item to="/setting/profile" exact exact-active-class="active">个人资料</b-nav-item>
            <b-nav-item to="/setting/account" exact exact-active-class="active">账号信息</b-nav-item>
            <b-nav-item disabled>安全设置</b-nav-item>
          </b-nav>
        </div>
        <div class="col-9">
          <nuxt-child @status="showStatus" />
        </div>
      </div>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      formStatus: {
        hasError: false,
        hasSucceed: false,
        message: []
      }
    };
  },
  methods: {
    showStatus(formStatus) {
      this.formStatus = formStatus;
    }
  }
};
</script>