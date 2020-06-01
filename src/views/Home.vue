<template>
  <div>
    <h1>The home view</h1>
  </div>
</template>

<script>
  import ApiService from '../core/ApiService';
  import Store from "../stores/stores";

  export default {
    name: "Home",
    methods: {
      
    },
   
    created() {
      const checkApiConnection = async function() {

        ApiService.get('/')
        .then((response)=> {
          Store.commit('changeMessage',
            `Message rom the api side: ${response.data.message}`)
        })
        .catch(err =>{
          console.log(err)
        }).finally(function(){
          //test
        });
          
        
      }
      checkApiConnection();
    }
  }
</script>
