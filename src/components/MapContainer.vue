<template>
  <div>
    <h1 class="title" align="center">Carte</h1>
  </div>
  <div id="map">

  </div>
</template>

<script setup>
import L from "leaflet"
import 'leaflet/dist/leaflet.css'

import {onBeforeMount, onMounted, onUnmounted, ref} from "vue";
const {lat,lon,ville}=defineProps(['lat','lon','ville'])

let map=null
onMounted(()=>{
  createMap(lat,lon,ville)
})

onBeforeMount(()=>{
  if(map!=null)
  {
    map.remove()
  }
})

onUnmounted(()=>{
  if(map!=null)
  {
    map.remove()
  }
})

const createMap=(lat,lon,ville)=>{
   map = L.map('map').setView([lat, lon], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 20,
  }).addTo(map);
  const marker=L.marker([lat,lon]).addTo(map)
  marker.bindPopup("Ici c'est "+ville).openPopup()
}

function fillCoord(lat,lon)
{
  lat.value=lat
  long.value=lon
}

</script>

<style scoped>
#map{
  height: 250px;
  width: 50vw;
}
</style>