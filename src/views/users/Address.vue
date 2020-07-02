<template>
  <b-container>
    <b-row class="mb-3">
      <b-col >
        <h1>Under construction ...</h1>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import ApiService from "@/core/ApiService";
// import Store from "@/stores/stores";

export default {
  name: "About",
  methods: {},

  created() {
    // ApiService.get("/about")
    //   .then(response => {
    //     Store.commit("changeMessage", `${response.data.message}`);
    //     Store.commit("changeVariant", "success");
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     console.log("error in about/validate page");
    //     if (!err.status) Store.commit("changeMessage", "Network Error!");
    //   })
    //   .finally(function() {
    //     //test
    //     //Store.commit('changeOverlayShow', false);
    //   });
  }
};
</script>
