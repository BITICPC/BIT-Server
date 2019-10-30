<template></template>

<script>
export default {
    mounted () {
        this.$store.dispatch('clearProfile')
        this.$router.go(-1)
    }
}
</script>