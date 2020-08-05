<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
        <img
          v-if="user.profilePhotoUrl"
          :src="user.profilePhotoUrl"
          width="150" class="rounded"
        />
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <label for="name">Fullname</label>
        <b-input-group>
          <b-input
            v-focus
            id="name"
            v-model="user.name"
            type="text" 
            placeholder="Enter fullname"
            disabled
          ></b-input>
        </b-input-group>
      </b-col>
    </b-row> 
    <b-row>
      <b-col>
        <hr/>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <label for="email">Username</label>
        <b-input-group>
          <b-input
            id="email"
            disabled
            v-model="user.email"
            type="email"
            placeholder="Enter email address"
          ></b-input>
          <b-button
            v-if="user.emailVerify"
            variant="outline-secondary"
            class="ml-2"
            disabled
            >✓</b-button
          >
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <hr/>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <label for="user-role">User Role</label>
        <b-input-group>
          <b-input
            id="user-role"
            v-model="user.userRole"
            type="text"
            disabled
          ></b-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3" v-if="user.userRole !='user'">
      <b-col>
        <label for="slug">Slug</label>
        <b-input-group>
          <b-input
            id="slug"
            type="text"
            v-model="user.slug"
            placeholder="Enter Slug"
          >
          </b-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3" v-if="user.userRole !='user'">
      <b-col>
        <label for="website">Website Address</label>
        <b-input-group>
          <b-input
            id="website"
            type="url"
            v-model="user.urls.website"
            placeholder="Enter Website Address"
          >
          </b-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3" v-if="user.userRole !='user'">
      <b-col>
        <label for="facebook">Facebook Address</label>
        <b-input-group>
          <b-input
            id="facebook"
            type="url"
            v-model="user.urls.facebook"
            placeholder="Enter Facebook Page"
          >
          </b-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3" v-if="user.userRole !='user'">
      <b-col>
        <label for="instagram">Instagram Address</label>
        <b-input-group>
          <b-input
            id="instagram"
            type="url"
            v-model="user.urls.instagram"
            placeholder="Enter Instagram Page"
          >
          </b-input>
        </b-input-group>
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
    ApiService.get(`/users/profile-get-by-email/${this.$route.params.user}`)
      .then(response => (this.user = response.data))
      .catch( error => this.setAlert( { message: error.data.message } ))
  }
}
</script>

<style scoped>
#user-role {
  text-transform: capitalize;
}
</style>
