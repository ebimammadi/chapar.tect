<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
        <img
          v-if="user.profilePhotoUrl"
          :src="user.profilePhotoUrl"
          width="150"
        />
        <b-button
          v-if="user.profilePhotoUrl"
          @click="deleteImage"
          variant="outline-secondary"
          class="ml-1 mt-1 align-bottom"
          >Remove/Change Photo</b-button
        >
        <image-upload
          v-if="!user.profilePhotoUrl"
          crop_width="800"
          crop_height="800"
          unique="true"
          usage="profile"
          placeholder="Select Profile Photo"
          @url="imageShow"
        >
        </image-upload>
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
          ></b-input>
          <b-form-invalid-feedback :state="validateName">
            {{ validation.name }}
          </b-form-invalid-feedback>
        </b-input-group>
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
          <b-form-invalid-feedback :state="validateName">
            {{ validation.name }}
          </b-form-invalid-feedback>
        </b-input-group>
        <!-- <a href="http://chapar-tech-api.herokuapp.com/users/user-list" target="_blank">Users</a> -->
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
          <router-link
            v-if="user.emailVerify"
            :to="{ name: 'change email' }"
            class="ml-2 float-right"
          >
            <b-button to variant="outline-secondary">
              Change Email
            </b-button>
          </router-link>
          <b-button
            @click="confirmEmail"
            v-if="!user.emailVerify"
            variant="outline-secondary"
            class="ml-2"
            >Confirm Email
          </b-button>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3">
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
          <b-form-invalid-feedback :state="validateSlug">
            {{ validation.slug }}
          </b-form-invalid-feedback>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3">
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
          <b-form-invalid-feedback :state="validateWebsite">
            {{ validation.urls.website }}
          </b-form-invalid-feedback>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3">
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
          <b-form-invalid-feedback :state="validateFacebook">
            {{ validation.urls.facebook }}
          </b-form-invalid-feedback>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3">
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
          <b-form-invalid-feedback :state="validateInstagram">
            {{ validation.urls.instagram }}
          </b-form-invalid-feedback>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mt-5 mb-3">
      <b-col>
        <b-button @click="sendProfile" variant="outline-success"
          >Save Profile</b-button
        >
        <router-link :to="{ name: 'address' }" class="ml-2 float-right">
          <b-button to variant="outline-secondary">
            Add/Edit Addresses
          </b-button>
        </router-link>
        <router-link :to="{ name: 'change password' }" class="ml-2 float-right">
          <b-button variant="outline-secondary">
            Change Password
          </b-button>
        </router-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex"
import { validateURL, validateSlug } from "@/core/lib.js"
import ApiService from "@/core/ApiService"
import ImageUpload from "@/components/ImageUpload.vue"

export default {
  data() {
    return {
      user: { urls: { facebook: "", website: "", instagram: "" } },
      validation: {
        name: `Your 'Fullname' should be at least 5 characters, including first name and last name.`,
        slug: `'Slug' should contain only lowercase characters and numbers separated by hyphen (-). For example if the name is 'John Smith Foods' you can use 'john-smith-foods'.`,
        urls: {
          website: `Website Address (URL) format is not valid. It should start with http:// or https://`,
          instagram: `Instagram Address (URL) format is not valid. It should start with https://`,
          facebook: `Facebook Address (URL) format is not valid. It should start with https://`
        }
      }
    }
  },
  components: {
    ImageUpload
  },
  methods: {
    ...mapActions(["setAlert"]),
    confirmEmail() {
      ApiService.get("/users/send-verification-link")
        .then(response => {
          if (response.data.message)
            return this.setAlert({
              message: response.data.message,
              variant: response.data.response_type
            })
        })
        .catch(
          error =>
            this.setAlert({ message: `Network Error!` }) && console.log(error)
        )
    },
    sendProfile() {
      if (!this.validateName)
        return this.setAlert({ message: this.validation.name })

      if (!this.validateSlug)
        return this.setAlert({ message: this.validation.slug })

      if (!this.validateWebsite)
        return this.setAlert({
          message: this.validation.urls.website
        })
      if (!this.validateFacebook)
        return this.setAlert({
          message: this.validation.urls.facebook
        })
      if (!this.validateInstagram)
        return this.setAlert({
          message: this.validation.urls.instagram
        })

      ApiService.post("/users/profile-set", {
        name: this.user.name,
        slug: this.user.slug,
        urls: this.user.urls
      })
        .then(response => {
          console.log("response profile-set", response)
          this.setAlert({
            message: response.data.message,
            variant: response.data.response_type
          })
        })
        .catch(
          error =>
            this.setAlert({ message: `Network Error!` }) && console.log(error)
        )
    },
    imageShow(url) {
      this.user.profilePhotoUrl = url
    },
    deleteImage() {
      const pathArr = this.user.profilePhotoUrl.split("/")
      ApiService.get(
        `/files/delete-image/${pathArr[pathArr.length - 2]}/${
          pathArr[pathArr.length - 1]
        }`
      )
        .then(() => (this.user.profilePhotoUrl = ""))
        .catch(
          error =>
            (this.user.profilePhotoUrl = "") &&
            this.setAlert({ message: `Network Error!` }) &&
            console.log(error)
        )
    }
  },
  created() {
    ApiService.get("/users/profile-get")
      .then(response => (this.user = response.data))
      .catch(
        error =>
          this.setAlert({ message: `Network Error!` }) && console.log(error)
      )
  },
  computed: {
    validateName() {
      return (
        this.user.name &&
        this.user.name.length > 5 &&
        this.user.name.split(" ").length > 1
      )
    },
    validateWebsite() {
      const url = this.user.urls.website
      return url.length == 0 || validateURL(url)
    },
    validateFacebook() {
      const url = this.user.urls.facebook
      return url.length == 0 || validateURL(url)
    },
    validateInstagram() {
      const url = this.user.urls.instagram
      return url.length == 0 || validateURL(url)
    },
    validateSlug() {
      // console.log(`sdsa`, this.user.slug);
      if (this.user.slug === undefined) return false
      // if (this.user.slug) console.log(this.user.slug.length);
      return (
        this.user.slug &&
        this.user.slug.length > 0 &&
        validateSlug(this.user.slug)
      )
    }
  }
}
</script>

<style scoped>
#user-role {
  text-transform: capitalize;
}
</style>
