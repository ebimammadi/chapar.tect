<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
        <label for="current-mobile">Current Mobile</label>
        <b-input-group>
          <b-input disabled id="current-mobile" v-model="currentMobile"></b-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <label for="new-mobile">New Mobile Number</label>
        <b-input-group>
          <b-input id="new-mobile" v-model="mobile" placeholder="Enter new mobile number" />
          <b-form-invalid-feedback :state="validateNewMobile"
            >{{ mobile.length > 0 ? validation.mobile : "" }}
          </b-form-invalid-feedback>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <label for="password">Your Password</label>
        <b-input-group>
          <b-input id="password" v-model="password" type="password" placeholder="Enter your password" />
          <b-form-invalid-feedback :state="validatePassword"
            >{{ password.length > 0 ? validation.password : "" }}
          </b-form-invalid-feedback>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button variant="outline-success" @click="changeMobile">Save Mobile</b-button>
        <!-- <router-link :to="{ name: 'profile' }" class="ml-5">
            Back to Profile
        </router-link> -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { validate } from "secure-password-validator"
import { mapActions } from "vuex"
import ApiService from "@/core/ApiService"

export default {
  data() {
    return {
      confirmation: "",
      confirmCode: "",
      currentMobile: "",
      mobile: "",
      password: "",
      validation: {
        mobile: `'New Mobile Number' should be a valid mobile number in Sweden, 07xxxxxxxx
          and you should have access to your phone for validation.`,
        password: `Current password is required.`,
        confirmCode: `The code is not valid!`
      }
    }
  },
  methods: {
    ...mapActions(["setAlert"]),
    changeMobile() {
      if (!this.validateNewMobile)
        return this.setAlert({ message: this.validation.mobile })
      if (this.password.length < 8)
        return this.setAlert({ message: `Your password seems invalid!` })

      ApiService.post("/users/mobile-set", {
        mobile: this.mobile,
        password: this.password
      })
        .then(response => {
          if (response.data.response_type == 'success'){
            this.currentMobile = this.mobile
            return this.$router.push({ 
              name: 'verify mobile', 
              params: { message: response.data.message, variant: response.data.response_type }
            })
          }
          this.setAlert({
            message: response.data.message,
          })
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.mobile = ""
          this.password = ""
        })
    }
  },
  created() {
    ApiService.get("/users/profile-get")
      .then(response => (this.currentMobile = response.data.mobile))
      .catch( error => this.setAlert( { message: error.data.message } ))
  },
  computed: {
    validateNewMobile() {
      if (!this.mobile.startsWith("07")) return false
      if (!/^\d{10}$/.test(this.mobile)) return false 
      return true
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
