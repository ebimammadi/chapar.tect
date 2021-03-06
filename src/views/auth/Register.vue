<template>
  <div class="entrance-jumbotron bg-ultra-light-gray">
    <p class="align-center"><logo/></p>
    <h5 class="mt-2 align-center">Sign Up</h5>
    <b-form @submit.prevent="onSubmit" class="mt-4">
      <b-form-group label="Fullname" label-for="name">
        <b-form-input
          id="name"
          v-model="name"
          v-focus
          type="text"
          required
          placeholder="Enter your fullname"
        >
        </b-form-input>
        <b-form-invalid-feedback :state="validateName"
          >{{ name.length > 0 ? validation.name : "" }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Email Address" label-for="email">
        <b-form-input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="Enter email address"
        >
        </b-form-input>
        <b-form-invalid-feedback :state="validateEmail"
          >{{ email.length > 0 ? validation.email : "" }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input
          id="password"
          v-model="password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
        <b-form-invalid-feedback :state="validatePassword"
          >{{ password.length > 0 ? validation.password : "" }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Confirm Password" label-for="confirm-password">
        <b-form-input
          id="confirm-password"
          v-model="confirmPassword"
          type="password"
          required
          placeholder="Confirm Password"
        ></b-form-input>
        <b-form-invalid-feedback :state="validateConfirmPassword"
          >{{ validation.confirmPassword }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group>
        <b-button type="submit" variant="outline-success">Sign Up</b-button>
      </b-form-group>

      <b-form-group class="mt-20 align-center">
        <p class="align-justify">
          By signing up, you agree to our
          <router-link target="_blank" to="/terms">Terms</router-link>. Learn
          how we collect, use and share your data in our Data Policy and how we
          use cookies and similar technology in our Cookies Policy.
        </p>
        Have an account? <router-link to="/login">Log In</router-link>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import _ from "lodash"
import { validate as validatePassword } from "secure-password-validator"
import { validateEmail } from "@/core/lib.js"
import { mapActions } from "vuex"
import ApiService from "@/core/ApiService"
import JwtService from "@/core/JwtService"
import Logo from "@/components/Logo.vue"

export default {
  components: { Logo },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      validation: {
        name: `Your 'Fullname' should be at least 5 characters, 
        including first name and last name.`,
        email: `'Email Address' should be a valid email address,
          and you should have access to your mailbox.`,
        password: `The 'Password' should be at least 8 characters, with
        at least one lowercase, uppercase, number and special character.`,
        confirmPassword: `'Confirm Password' Should match the 'Password'.`
      }
    }
  },
  methods: {
    ...mapActions(["setAlert", "setSingInStatus"]),
    onSubmit: function() {
      if (!this.validateName)
        return this.setAlert({ message: this.validation.name })
      if (!this.validateEmail)
        return this.setAlert({ message: this.validation.email })
      if (!this.validatePassword)
        return this.setAlert({ message: this.validation.password })
      if (!this.validateConfirmPassword)
        return this.setAlert({ message: this.validation.confirmPassword })

      ApiService.post( "/app-users/register", _.pick(this, ["name", "email", "password"]) )
        .then( response => {
          if (response.data.message) return this.setAlert({ message: response.data.message })
          this.setAlert({ message: "" })
          const token = response.headers["x-auth-token"]
          JwtService.setToken(token)
          this.setSingInStatus(true)
          this.$router.push("/app")
        })
        .catch( error => this.setAlert( { message: error.data.message } ) )
    }
  },
  created() {
    //if we have logged in before
    if (JwtService.getToken()) return this.$router.push("/app")
  },
  computed: {
    passwordOptions() {
      return {
        minLength: 8,
        maxLength: 255,
        digits: true,
        letters: true,
        uppercase: true,
        lowercase: true,
        symbols: true
      }
    },
    validateName() {
      return (
        this.name && this.name.length > 5 && this.name.split(" ").length > 1
      )
    },
    validateEmail() {
      return validateEmail(this.email)
    },
    validatePassword() {
      return validatePassword(this.password, this.passwordOptions).valid
    },
    validateConfirmPassword() {
      return this.password === this.confirmPassword
    }
  }
}
</script>
