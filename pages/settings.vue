<template>
  <div class="container"><br>

  <b-alert v-model="formStatus.hasSucceed" variant="success" dismissible>{{ formStatus.message[0] }}</b-alert>

  <b-alert v-model="formStatus.hasError" variant="warning" dismissible>
    <h5><Strong>保存失败</strong></h5>
    <li v-for="message in formStatus.message" :key="message">{{ message }}</li>
  </b-alert>

	<b-card title="Card Title" no-body>
		<b-card-header header-tag="nav">
      <b-nav card-header pills tabs>
        <b-nav-item to="/settings/profile" exact exact-active-class="active">个人资料</b-nav-item>
        <b-nav-item to="/settings/account" exact exact-active-class="active">账号信息</b-nav-item>
        <b-nav-item disabled>安全设置</b-nav-item>
      </b-nav>
    </b-card-header>

		<b-card-body>
      <nuxt-child @status="showStatus"/>
    </b-card-body>
	</b-card>
	</div>
</template>

<script>
export default {
  data () {
    return {
      formStatus: {
        hasError: false,
        hasSucceed: false,
        message: []
      }
    }
  },
  methods: {
    showStatus (formStatus) {
      this.formStatus = formStatus
    }
  }
}
</script>