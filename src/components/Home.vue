<template>
  <div class="home" >
    <div class="overlay" v-if="openForm" >
      <div class="modalForm" >
        <AjoutVille @close-modal="openForm=false"/>
        <button class="btn waves-effect waves-light btn-block red close" @click="openForm=false">Fermer</button>
      </div>

    </div>


    <div class="container">
      <div class="row">
        <div class="col s12">
          <h1 class="title" style="color: white;font-weight: bold">Méteo</h1>
        </div>
      </div>
      <div class="row">
        <div class="offset-l8 col s4">
          <button class="btn waves-effect waves-light" @click="openForm=true" >Ajouter une ville</button>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <Meteo v-for="ville in store.villes" :ville="ville" :key="ville"  />
      </div>

    </div>

  </div>
  </div>

</template>

<script setup>

import Meteo from "@/components/Meteo.vue";
import {onMounted, onUpdated, ref} from "vue";
import AjoutVille from "@/components/AjoutVille.vue";
import {useDefaultStore} from "@/stores";
import ModifVille from "@/components/ModifVille.vue";
import MapContainer from "@/components/MapContainer.vue";
const openForm = ref(false)
const openForm2 = ref(false)
const store = useDefaultStore()
onMounted(() => {
  store.getFromLocalStorage()
})

onUpdated(() => {
  store.addToLocalStorage()
})

const modifVille = (ville) => {
  console.log(ville.value)
}
</script>

<style scoped>
.close
{
  margin-top: 20px;
  width: 100%;
}
.overlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);

  z-index: 10;
}
.modalForm{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 500px;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  z-index: 11;
}

</style>