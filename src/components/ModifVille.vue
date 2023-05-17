<template>
  <div>
    <h3>Modification</h3>
    <form>
      <div class="input-field">
        <input type="text" id="city" v-model="newCity" required placeholder="Ville">
      </div>
      <button class="btn waves-effect waves-light open" type="submit" @click.prevent="closeAndSave">Sauvegarder</button>
    </form>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useDefaultStore} from "@/stores";

let newCity = ref("");
const store = useDefaultStore();
const emit=defineEmits(["closeModal"])
const {ville}=defineProps(['ville'])

newCity.value=ville
function closeAndSave() {
  saveCity();
  emit("closeModal")
}
function saveCity() {
  // Vérification de la saisie de la ville
  if (newCity.value.trim() === '') {
    alert('Veuillez saisir une ville');
    return;
  }
  if (newCity.value.trim() === ville) {
    alert("Vous n'avez rien changé");
    return;
  }

  //modif
  store.modifVille(newCity.value,ville)
  // Réinitialisation du champ de saisie
  newCity.value = '';
}
</script>

<style scoped>
.open
{
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 0px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  font-size: 16px;
}
</style>