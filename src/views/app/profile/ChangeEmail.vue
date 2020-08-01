<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
        <label for="current-email">Current Email</label>
        <b-input-group>
          <b-input disabled id="current-email" v-model="currentEmail"></b-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3"
      ><b-col>
        <label for="new-email">New Email</label>
        <b-input-group>
          <b-input
            id="new-email"
            v-model="email"
            type="email"
            placeholder="Enter new email address"
          ></b-input>
          <b-form-invalid-feedback :state="validateNewEmail"
            >{{ email.length > 0 ? validation.email : "" }}
          </b-form-invalid-feedback>
        </b-input-group></b-col
      >
    </b-row>
    <b-row class="mb-3"
      ><b-col>
        <label for="password">Your Password</label>
        <b-input-group>
          <b-input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
          ></b-input>
          <b-form-invalid-feedback :state="validatePassword"
            >{{ password.length > 0 ? validation.password : "" }}
          </b-form-invalid-feedback>
        </b-input-group></b-col
      >
    </b-row>
    <b-row
      ><b-col>
        <b-button variant="outline-success" @click="changeEmail"
          >Save Email
        </b-button>
        <router-link :to="{ name: 'profile' }" class="ml-5">
            Back to Profile
        </router-link></b-col
      >
    </b-row>
  </b-container>
</template>

<script>
import { validate } from "secure-password-validator"
import { mapActions } from "vuex"
import { validateEmail } from "@/core/lib.js"
import ApiService from "@/core/ApiService"

export default {
  data() {
    return {
      currentEmail: "",
      email: "",
      password: "",
      validation: {
        email: `'New Email' should be a valid email address,
          and you should have access to your new mailbox.`,
        password: `Current password is required.`
      }
    }
  },
  methods: {
    ...mapActions(["setAlert"]),
    changeEmail() {
      if (!this.validateNewEmail)
        return this.setAlert({ message: this.validation.email })
      if (this.password.length < 8)
        return this.setAlert({ message: `Your password seems invalid!` })

      ApiService.post("/users/email-set", {
        email: this.email,
        password: this.password
      })
        .then(response => {
          this.setAlert({
            message: response.data.message,
            variant: response.data.response_type
          })
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.email = ""
          this.password = ""
        })
    }
  },
  created() {
    ApiService.get("/users/profile-get")
      .then(response => (this.currentEmail = response.data.email))
      .catch(
        error =>
          this.setAlert({ message: `Network Error!` }) && console.log(error)
      )
  },
  computed: {
    validateNewEmail() {
      return validateEmail(this.email)
    },
    validatePassword() {
      const options = {
        minLength: 8,
        maxLength: 255,
        digits: true,
        letters: true,
        uppercase: true,
        lowercase: true,
        symbols: true
      }
      return validate(this.password, options).valid
    }
  }
}
</script>
