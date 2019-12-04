<template>
  <v-spacer />
</template>
<script>
import { mapActions } from 'vuex'

export default {
  mounted () {
    this.$store.dispatch('clearProfile')
    this.$store.dispatch('clearJwt')
    this.newToast({
      text: '注销成功！',
      color: 'blue',
      icon: 'mdi-information'
    })
    this.$router.go(-1)
  },
  methods: {
    ...mapActions(['newToast'])
  }
}
</script>
