<script setup>
import { useColorMode } from "@vueuse/core";

// Gestione del tema (dark/light mode)
const mode = useColorMode();
mode.value = "light";
</script>

<template>
  <div :class="mode">
     <!-- Gestione di un layout globale -->
    <NuxtLayout>
      <!-- Gestione delle transizioni di pagina -->
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
/* Stili globali per tutta l'app */
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background: var(--bg-color);
  color: var(--text-color);
}

.dark {
  --bg-color: #121212;
  --text-color: #ffffff;
}

.light {
  --bg-color: #ffffff;
  --text-color: #000000;
}
</style>
