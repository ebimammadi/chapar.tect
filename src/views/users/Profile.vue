//TODO all requests should be checked 
//TODO email verify! 
//TODO paasswrod change! 
//TODO email change
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
        </image-upload> </b-col
      ><b-col></b-col>
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
            class="full-width"
          ></b-input>
          <b-form-invalid-feedback :state="nameValidation">
            {{validation.name}}
          </b-form-invalid-feedback>
        </b-input-group>
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
            >Verified ✓</b-button
          >
          <b-button
            v-if="user.emailVerify"
            variant="outline-secondary"
            class="ml-2"
            v-b-toggle.email-collapse
            >Change Email
          </b-button>
          <b-button
            v-if="!user.emailVerify"
            variant="outline-secondary"
            class="ml-2"
            >Verify email?
          </b-button>
        </b-input-group>
      </b-col>
    </b-row>
    <b-collapse
      id="email-collapse"
      v-model="newEmailCollapseVisible"
      class="mb-3"
    >
      <b-card>
        <b-container>
          <b-row class="mb-3">
            <label for="new-email">New Email</label>
            <b-input-group>
              <b-input
                id="new-email"
                v-model="newEmail"
                type="email"
                placeholder="Enter new address"
              ></b-input>
              <b-form-invalid-feedback :state="validateNewEmail">{{ validation.newEmail}}
              </b-form-invalid-feedback>
            </b-input-group>
          </b-row>
          <b-row>
            <label for="current-password">Current Password</label>
            <b-input-group>
              <b-input
                id="current-password"
                v-model="currentPassword"
                type="password"
                placeholder="Enter current address"
              ></b-input>
              <b-button
                variant="outline-success"
                class="ml-2"
                @click="changeEmail"
                >Save Email
              </b-button>
            </b-input-group>
          </b-row>
        </b-container>
      </b-card>
    </b-collapse>
    <!-- <b-row class="mb-3">
      <b-col>
        <label for="phone">Mobile</label>
        <b-input-group>
          <b-input
            id="phone"
            disabled
            v-model="user.mobile"
            type="text"
            placeholder="Enter mobile number"
          ></b-input>
          <b-button
            v-if="user.mobileVerify"
            variant="outline-secondary"
            class="ml-2"
            disabled
            >Verified ✓</b-button
          >
          <b-button
            v-if="user.mobileVerify"
            variant="outline-secondary"
            class="ml-2"
            @click="changeEmail"
            >Change</b-button
          >
          <b-button
            v-if="!user.mobileVerify && user.mobile"
            variant="outline-secondary"
            class="ml-2"
            @click="changeEmail"
            >Verify Mobile?</b-button
          >
        </b-input-group>
      </b-col>
    </b-row> -->
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
          >Save changes</b-button
        >
        <router-link to="/profile/address" class="float-right">
          <b-button to variant="outline-secondary">
            Add/Edit Addresses
          </b-button>
        </router-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

import { validateURL, validateEmail } from "@/core/lib.js";
import ApiService from "@/core/ApiService";
import ImageUpload from "@/components/ImageUpload.vue";

export default {
  data() {
    return {
      currentPassword: "",
      newEmail: "",
      newEmailCollapseVisible: false,
      user: { urls: { facebook: '', website: '', instagram: '' } },
      validation: {
        name: `Your 'Fullname' should be at least 5 charecters, including first name and last name.`,
        newEmail: `'New Email' account should be a valid email address, and you should have access to your new mailbox.
`,
        urls: {
          website: `Website Address (URL) format is not valid. It should start with http:// or https://`,
          instagram: `Instagram Address (URL) format is not valid. It should start with https://`,
          facebook: `Facebook Address (URL) format is not valid. It should start with https://`
        }
      }
    };
  },
  components: {
    ImageUpload
  },
  methods: {
    ...mapActions(["setAlert"]),
    sendProfile() {
      if (this.user.name.length < 5)
        return this.setAlert({ message: this.validation.name });

      if (
        this.user.urls.website.length > 0 &&
        !validateURL(this.user.urls.website)
      )
        return this.setAlert({
          message: this.validation.urls.website
        });
      if (
        this.user.urls.facebook.length > 0 &&
        !validateURL(this.user.urls.facebook)
      )
        return this.setAlert({
          message: this.validation.urls.facebook
        });
      if (
        this.user.urls.instagram.length > 0 &&
        !validateURL(this.user.urls.instagram)
      )
        return this.setAlert({
          message: this.validation.urls.instagram
        });

      ApiService.post("/users/profile-set", {
        name: this.user.name,
        urls: this.user.urls
      })
        .then(response => {
          console.log('response profile-set',response);
          this.setAlert({
            message: response.data.message,
            variant: response.data.response_type
          });
        })
        .catch(
          error =>
            this.setAlert({ message: `Network Error!` }) && console.log(error)
        );
    },
    changeEmail() {
      //check for valid input
      if (!validateEmail(this.newEmail)) return this.setAlert({ message: this.validation.newEmail });
      if ( this.currentPassword.length < 8 ) return this.setAlert({ message: `Your password seems invalid!` });
      
      ApiService.post('/users/email-set', { newEmail: this.newEmail, currentPassword: this.currentPassword})
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
      //submit the form to the backend/

      //show the message

      //close the toggle
      this.newEmailCollapseVisible = false;

      //change the user.verifyEmail
    },
    imageShow(url) {
      this.user.profilePhotoUrl = url;
    },
    deleteImage() {
      const pathArr = this.user.profilePhotoUrl.split("/");
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
        );
    }
  },
  created() {
    ApiService.get("/users/profile-get")
      .then(response => (this.user = response.data))
      .catch(
        error =>
          this.setAlert({ message: `Network Error!` }) && console.log(error)
      );
  },
  computed: {
    emailVerify: function() {
      if (this.user.emailVerify)
        return `<b-button variant="outline-success">verified</b-button>`;
      return "";
    },
    nameValidation() {
      return (
        this.user.name &&
        this.user.name.length > 5 &&
        this.user.name.split(" ").length > 1
      );
    },
    validateWebsite() {
      const url = this.user.urls.website;
      return url.length == 0 || validateURL(url);
    },
    validateFacebook() {
      const url = this.user.urls.facebook;
      return url.length == 0 || validateURL(url);
    },
    validateInstagram() {
      const url = this.user.urls.instagram;
      return url.length == 0 || validateURL(url);
    },
    validateNewEmail() {
      return validateEmail(this.newEmail);
    }
  }
};
</script>
