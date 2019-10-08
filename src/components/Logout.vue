<template>
<br>
</template>

<script>
export default {
  mounted () {
    this.$store.dispatch('clearProfile')
    this.$router.push('/')
  }
}
</script>
