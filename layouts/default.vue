<template>
  <v-app>
    <Navbar />

    <v-content>
      <nuxt />
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import Navbar from '~/components/navbar.vue'
import Footer from '~/components/footer.vue'

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>
