<template>
  <div id="map" class="map-container"></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAsyncData, useNuxtApp } from '#app';

const supabase = useSupabaseClient();
if (!supabase) {
  console.error('Supabase client is not available');
} else {
  console.log('Supabase client is available');
}
//TODO call to db for retrieving all the vet convenzionati

const locations = ref([]);
/*const { data } = await useFetch("/api/overpass", {
  query: { lat: 45.4642, lng: 9.1900, radius: 50000 },
});
locations.value = data.value || [];
console.log('Locations:', locations.value);*/


const { $leaflet } = useNuxtApp();

onMounted(() => {
  const map = $leaflet.map("map").setView([41.9028, 12.4964], 13); // Roma

  $leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
});
</script>

<style>
.map-container {
  width: 95vw;
  height: 75vh; /*400px*/
  margin: 2.5vw;
  border-radius: 15px;
  overflow: hidden;
}
</style>