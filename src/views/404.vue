<template>
  <div>
    <h1>Not Found!</h1>  
    <b-button variant="outline-primary" >
      <router-link to="/">
        Home
      </router-link>
    </b-button>
    <br/><br/>
    <b-button variant="outline-primary" @click="$router.go(-1)">Go Back</b-button>
  </div>
</template>

<script>
    export default {
        name: "error"
    }
</script>

<style >

</style>
