<template>
  <div>
    <h1>The home view</h1>
  </div>
</template>

<script>
  import ApiService from '../core/ApiService';
  import Store from "../stores/stores";
  import JwtService from '../core/JwtService';

  export default {
    name: "Home",
    methods: {

    },

    created() {

      ApiService.get('/')
      .then( response => {
        Store.commit('changeMessage',`Message from the api: ${response.data.message}`);
        Store.commit('changeVariant','success');
        console.log(JwtService.decodeToken());

      })
      .catch( err => {
        console.log(err)
        console.log('sadsa')
        if (!err.status)
          Store.commit('changeMessage', 'Network Error!');
      }).finally(function(){
        //test
        //Store.commit('changeOverlayShow', false);
      });

    }
  }
</script>
