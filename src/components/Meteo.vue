<template>
  <div class="container ">
    <div class="overlay" v-if="openForm2">
      <div class="modalForm" >
        <ModifVille :ville="ville" @close-modal="openForm2=false"/>
        <button class="btn waves-effect waves-light btn-block red close" @click="openForm2=false">Fermer</button>
      </div>
    </div>

    <div class="overlay" v-if="showMap">
      <div class="modalFormMap">
        <MapContainer :lat="weather.coord.lat" :lon="weather.coord.lon" :ville="ville" />
        <button class="btn waves-effect waves-light btn-block red close" @click="showMap=false">Fermer</button>
      </div>


    </div>


    <div class="row ">
      <div class="col s12">
        <div class="card z-depth-2 rounded carte">
          <div class="card-title " align="center"><h2>{{ville}}</h2></div>
          <div v-if="isLoading" class="spinner"></div>

          <div class="card-content" v-else>
            <div class="row">
              <div class="col s6">
                <p><i class="mdi mdi-thermometer" ></i><strong>Température :</strong> {{ weather.main.temp }}°C</p>
                <p> <i class="mdi mdi-water"></i> <strong>Humidité :</strong> {{ weather.main.humidity }}%</p>
              </div>
              <div class="col s6">
                <p><i class="mdi mdi-weather-windy"></i> <strong>Vitesse du vent :</strong> {{ weather.wind.speed }} km/h</p>
                <p><i class="mdi mdi-nature"> </i> <strong>Description :</strong> {{ weather.weather[0].description }}</p>
              </div>
            </div>
            <!-- Bouton voir plus -->
            <hr>
            <div class="row">
              <div class="col s2">
                <button :class="{'btn waves-effect waves-light btn-block red':showMore,'btn waves-effect waves-light btn-block ':!showMore }" @click="showMore=!showMore"><i class="material-icons">{{ showMore ? 'arrow_back':'arrow_forward' }}</i></button>
              </div>
              <div class="col s6" v-if="showMore" style="display: flex; justify-content: space-evenly">
                <button class="btn waves-effect waves-light btn-block blue"  @click="openForm2=true"><i class="large material-icons">edit</i></button>
                <button class="btn waves-effect waves-light btn-block blue" ><i class="material-icons" @click="store.supprVille(ville)">delete</i></button>
                <button class="btn waves-effect waves-light btn-block blue" ><i class="material-icons" @click="showMap=true">map</i></button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useDefaultStore} from "@/stores";
import {onMounted, ref} from "vue";
import Axios from "axios";
import ModifVille from "@/components/ModifVille.vue";
import MapContainer from "@/components/MapContainer.vue";

const openForm2 = ref(false)
const {ville}=defineProps(['ville'])
const store=useDefaultStore()
const showMap = ref(false)

let weather = ref({})
let isLoading = ref(true)
const showMore = ref(false)
let coordonne=ref([])

onMounted(() => {
  getWeatherAxios(ville,weather,isLoading,coordonne)
})

const emit=defineEmits(['edit'])

function editVille(){
  emit('edit')
}

function getWeatherAxios(city,weather,isLoading,coordonne){
  Axios.get(store.base_url+city+'&appid='+store.cle)
      .then((response) => {
            return response.data;
          }
      ).then((data) => {
        weather.value = data;
        coordonne.value=data.coord
        console.log(coordonne.value)
        isLoading.value = false;
  })
}
</script>

<style scoped>
.carte{
  background: rgb(18,8,193);
  background: radial-gradient(circle, rgba(18,8,193,0.9249824929971989) 1%, rgba(12,12,233,0.8577556022408963) 72%);
  color: white;
}
.spinner {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 4px solid #f3f3f3;
  margin-left: 100px;
  border-top: 4px solid #3498db;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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
  background-color: white;
  padding: 50px;
  border-radius: 10px;
  z-index: 11;
}

.modalFormMap{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  z-index: 11;
  //width: 100vw;
}

.close
{
  margin-top: 20px;
  width: 100%;
}

</style>