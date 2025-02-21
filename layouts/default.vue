<template>
  <div>
    <header>
      <Header />
    </header>
    <slot /> <!-- Qui verrà caricata la pagina -->
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script lang="ts" setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
</script>

<style>

</style>