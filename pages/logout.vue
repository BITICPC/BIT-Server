<template>
  <v-spacer />
</template>
<script>
import { mapActions } from 'vuex'

export default {
  mounted () {
    this.$store.dispatch('clearProfile')
    this.newToast({
      text: '注销成功！',
      color: 'blue'
    })
    this.$router.go(-1)
  },
  methods: {
    ...mapActions(['newToast'])
  }
}
</script>
