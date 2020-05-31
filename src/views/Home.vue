<template>
  <div>
    <h1>The home view</h1>
  </div>
</template>

<script>
  import ApiService from "../core/ApiService"
  
  export default {
    name: "Home",
    created: () => {
      console.log(`inside home view`);
      let a = async () => {
        const response = await ApiService.get('/');
        console.log(response.data);
        //return response;
      }
      
      a()
    }
    
  }
</script>

<style scoped>

</style>
