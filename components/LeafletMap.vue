<template>
  <div id="map" class="map-container"></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAsyncData, useNuxtApp } from '#app';

interface Location {
  lat: number;
  lng: number;
  name?: string;
}

const supabase = useSupabaseClient();
if (!supabase) {
  console.error('Supabase client is not available');
} else {
  console.log('Supabase client is available');
}
//TODO call to db for retrieving all the vet convenzionati

const locations = ref<Location[]>([]);
const { data } = await useFetch("/api/overpass", {
  query: { lat: 41.9028, lng: 12.4964, radius: 50000 },
});
locations.value = data.value || [];
//console.log('Locations:', locations.value);

const { $leaflet } = useNuxtApp();

onMounted(() => {
    var map = $leaflet.map('map').fitWorld();
    $leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    map.locate({ setView: true, maxZoom: 16 });

    
    // Definisci un'icona rossa per i marker delle location
    var redIcon = $leaflet.icon({
      iconUrl: 'https://i0.wp.com/www.filarmonicatresigallo.it/wp-content/uploads/2016/11/map-marker-icon-1.png?ssl=1',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41]
    });
    // Aggiungi un marker per ogni location
    locations.value.forEach(location => {
      $leaflet.marker([location.lat, location.lng], {icon: redIcon}).addTo(map)
        .bindPopup(location.name || "Location").openPopup();
    });
    map.locate({ setView: true, maxZoom: 16 });

    // Handle location found
    map.on('locationfound', (e) => {
      var radius = e.accuracy;
      $leaflet.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();
        $leaflet.circle(e.latlng, radius).addTo(map);
    });

    // Handle location error
    map.on('locationerror', (e) => {
      alert(e.message);
    });
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