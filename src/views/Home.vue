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
        await ApiService.get('/')
        .then((response)=> {
          Store.commit('changeMessage',
            `Message from the api: ${response.data.message}`)
          Store.commit('changeVariant','success')  
        })
        .catch(err =>{
          if (!err.status)
            Store.commit('changeMessage', 'Network Error!');
        }).finally(function(){
          //test
          //Store.commit('changeOverlayShow', false);
        });
      }
      checkApiConnection();
    }
  }
</script>
