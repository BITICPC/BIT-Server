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
      <span>
        <v-icon dark left>
          {{ snackbar.icon }}
        </v-icon>
        {{ snackbar.text }}
      </span>
      <v-btn dark text @click="closeToast">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import Navbar from '@/components/common/jury-navbar.vue'
import Footer from '@/components/common/footer.vue'

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
