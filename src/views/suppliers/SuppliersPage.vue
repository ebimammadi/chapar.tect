<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
        <h1>Supplier page<br> under construction</h1>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex"
import ApiService from "@/core/ApiService"

export default {
  data() {
    return {
      user: { urls: { facebook: "", website: "", instagram: "" } },
      
    }
  },
  methods: {
    ...mapActions(["setAlert","setProfilePhotoUrl"]),
    imageShow(url) {
      this.user.profilePhotoUrl = url
      this.setProfilePhotoUrl(url)
    }
  },
  created() {
    ApiService.get(`/app-users/profile-get-by-email/${this.$route.params.slug}`)
      .then(response => (this.user = response.data))
      .catch( error => this.setAlert( { message: error.data.message } ))
  }
}
</script>
