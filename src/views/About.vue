<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
        <h1>About this app</h1>
        <p></p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ApiService from "../core/ApiService";
import { mapActions } from "vuex";

export default {
  name: "About",
  methods: { ...mapActions(["setAlert"]) },
  created() {
    ApiService.get("/about")
      .then(response =>
        this.setAlert({
          message: `Message: ${response.data.message}`,
          variant: `success`
        })
      )
      .catch(
        error =>
          this.setAlert({ message: `Network Error!` }) && console.log(error)
      );
  }
};
</script>
