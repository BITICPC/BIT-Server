<template></template>

<script>
export default {
  mounted() {
    this.$store.dispatch("clearProfile");
    this.$router.go(-1);
    this.$root.$bvToast.toast('注销成功，欢迎再次登陆！', {
      title: '系统提示',
      toaster: 'b-toaster-bottom-right',
      variant: 'info',
      solid: true
    })
  }
};
</script>