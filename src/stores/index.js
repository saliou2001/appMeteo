import { defineStore } from 'pinia'
import Axios from "axios";

export const useDefaultStore = defineStore({
  id: 'default',
  state: () => ({
    cle:'542ffd081e67f4512b705f89d2a611b2',
    base_url:'https://api.openweathermap.org/data/2.5/weather?lang=fr&units=metric&q=',
    villes:[]
  }),
  getters: {
    
  },
  actions: {

    ajoutVille(ville){
        this.villes.push(ville)
    },
    addToLocalStorage(){
        localStorage.setItem('villes',JSON.stringify(this.villes))
    },
    getFromLocalStorage(){
        if(localStorage.getItem('villes')){
            this.villes = JSON.parse(localStorage.getItem('villes'))
        }
    },
    modifVille(ville,oldVille){
        this.villes[this.villes.indexOf(oldVille)] = ville
    },
    supprVille(ville){
        this.villes.splice(this.villes.indexOf(ville),1)
    }




  }
})
