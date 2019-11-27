<template>
  <v-app>
    <Navbar />

    <v-content>
      <nuxt />
    </v-content>

    <Footer />

    <v-snackbar
      :value="snackbar.display"
      :color="snackbar.color"
      :timeout="3000"
      @input="closeToast"
    >
      {{ snackbar.text }}
      <v-btn @click="closeToast" dark text>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import Navbar from '@/components/navbar.vue'
import Footer from '@/components/footer.vue'

export default {
  components: {
    Navbar,
    Footer
  },
  computed: {
    snackbar () {
      return this.$store.state.snackbar
    }
  },
  methods: {
    ...mapActions(['closeToast'])
  }
}
</script>
