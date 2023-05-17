<template>
  <div>
    <h3>Ajouter une ville</h3>
    <form>
      <div class="input-field">
        <input type="text" id="city" v-model="newCity" required>
        <label for="city">Ville</label>
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
  // Ajout de la ville au tableau (supposons que vous avez un tableau cities dans votre composant parent)
  store.ajoutVille(newCity.value);
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