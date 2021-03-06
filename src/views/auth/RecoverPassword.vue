<template>
  <div class="entrance-jumbotron bg-ultra-light-gray" >
    <p class="align-center"><logo/></p>
    <h5 class="mt-2 align-center">Recover Your Password</h5>
    <b-form @submit.prevent="onSubmit" class="mt-4" v-if="email">
      <b-form-group label="Email address:" label-for="email">
        <b-form-input
          id="email"
          v-model="email"
          type="email"
          required
          disabled
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Password:" label-for="password">
        <b-form-input
          id="password"
          v-model="password"
          type="password"
          required
          placeholder="New Password"
        ></b-form-input>
        <b-form-invalid-feedback :state="validatePassword"
          >{{ password.length > 0 ? validation.password : "" }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Repeat Password:" label-for="repeat-password">
        <b-form-input
          id="repeat-password"
          v-model="confirmPassword"
          type="password"
          required
          placeholder="Repeat New Password"
        ></b-form-input>
        <b-form-invalid-feedback :state="validateConfirmPassword"
          >{{ validation.confirmPassword }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group>
        <b-button type="submit" variant="success">Set Password</b-button> <router-link to="/login" class="float-right">Log In?</router-link>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import { validate as validatePassword } from "secure-password-validator"
import ApiService from "@/core/ApiService"
import JwtService from "@/core/JwtService"
import Logo from "@/components/Logo.vue"

export default {
  components: { Logo },
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      validation: {
        password: `The 'Password' should be at least 8 characters, with
        at least one lowercase, uppercase, number and special character.`,
        confirmPassword: `'Confirm Password' Should match the 'Password'.`
      }
    }
  },
  methods: {
    ...mapActions(["setAlert", "setSingInStatus", "setProfilePhotoUrl"]),
    onSubmit: function() {
      if (!this.validatePassword)
        return this.setAlert({ message: this.validation.password })
      if (!this.validateConfirmPassword)
        return this.setAlert({ message: this.validation.confirmPassword })
      const payload = {
        password: this.password,
        code: this.$route.params.code
      }
      ApiService.post("/app-users/recover-password", payload)
        .then(response => {
          if (response.data.message)
            return this.setAlert({ message: response.data.message })
          this.setAlert({ message: "" })
          const token = response.headers["x-auth-token"]
          JwtService.setToken(token)
          const { profilePhotoUrl } = JwtService.decodeToken()
          this.setProfilePhotoUrl(profilePhotoUrl)
          this.setSingInStatus(true)
          this.$router.push("/app")
        })
        .catch( error => this.setAlert( { message: error.data.message } ))
    }
  },
  created() {
    if (JwtService.getToken()) return this.$router.push("/app") 

    ApiService.get(
      `/app-users/recover-password-verify-code/${this.$route.params.code}`
    )
      .then(response => {
        if (!response.data.email) {
          this.setAlert({ message: response.data.message })
        } else {
          this.email = response.data.email
          this.setAlert({ message: response.data.message, variant: "success" })
        }
      })
      .catch( error => this.setAlert( { message: error.data.message } ))
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
    validatePassword() {
      return validatePassword(this.password, this.passwordOptions).valid
    },
    validateConfirmPassword() {
      return this.password === this.confirmPassword
    }
  }
}
</script>
