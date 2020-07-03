<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
        <h1>Welcome to this app, Under construction ...</h1>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ApiService from "../core/ApiService";
import Store from "../stores/stores";

export default {
  name: "Home",
  methods: {},

  created() {
    ApiService.get("/")
      .then(response => {
        Store.commit("changeAlert", {
          message: `Message from the api: ${response.data.message}`,
          variant: `success`
        });
      })
      .catch(err => {
        console.log("error home page", err);
        if (!err.status) Store.commit("changeMessage", "Network Error!");
      })
      .finally(function() {
        //test
        //Store.commit('changeOverlayShow', false);
      });
  }
};
</script>
