<template>
  <div>
    <Navbar/>
    <nuxt/><br>
    <Footer/>
  </div>
</template>
<script>
import Navbar from '~/components/polygon/navbar.vue';
import Footer from '~/components/footer.vue';
export default {
  components: {
    Navbar,
    Footer
  }
}
</script>