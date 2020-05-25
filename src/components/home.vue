<template>
  <div>
    <h1>the home view</h1>
  </div>
</template>

<script>
  import ApiService from "../core/api"
  
  export default {
    name: "Home",
    created: () => {
      console.log(`inside home creatation`);
      let a = async () => {
        const response = await ApiService.get('/');
        console.log(response);
        //return response;
      }
      
      a()
    }
    
  }
</script>

<style scoped>

</style>
