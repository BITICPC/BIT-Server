<template>
  <v-spacer />
</template>
<script>
import { mapActions } from 'vuex'

export default {
  layout ({ from }) {
    if (from.name.includes('polygon')) {
      return 'polygon'
    }
  },
  mounted () {
    this.$store.dispatch('clearProfile')
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
