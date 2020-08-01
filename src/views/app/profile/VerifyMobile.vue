<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
        <h1>Verify Mobile Number</h1>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <label for="current-mobile">Mobile Number</label>
        <b-input-group>
          <b-input disabled id="current-mobile" v-model="mobile"></b-input>
        </b-input-group>
      </b-col>
    </b-row>
    
    <b-row class="mb-3"
      ><b-col>
        <label for="code">Verification Code</label>
        <b-input-group>
          <b-input
            id="code"
            v-model="code"
            placeholder="Enter verification code"
            maxlength="4"
          ></b-input>
          <b-form-invalid-feedback :state="validateCode"
            >{{ code.length > 0 ? validation.code : "" }}
          </b-form-invalid-feedback>
        </b-input-group></b-col
      >
    </b-row>

    <b-row>
      <b-col>
        <b-button variant="outline-success" @click="verifyMobile"
          >Verify Mobile
        </b-button>
        <router-link :to="{ name: 'profile' }" class="ml-5">
            Back to Profile
        </router-link>
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
      currentMobile: "",
      code: "",
      mobile: "",
      validation: {
        code: `The code is not valid!`
      }
    }
  },
  methods: {
    ...mapActions(["setAlert"]),
    verifyMobile() {
      if (!this.validateCode)
        return this.setAlert({ message: this.validation.mobile })
      
      ApiService.post("/users/receive-verification-sms", {
        mobile: this.mobile,
        code: this.code
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
          this.code = ""
        })
    }
  },
  created() {
    ApiService.get("/users/profile-get")
      .then(response => (this.mobile = response.data.mobile))
      .catch(
        error =>
          this.setAlert({ message: `Network Error!` }) && console.log(error)
      )
  },
  computed: {
    validateCode() {
      if (!/^\d{4}$/.test(this.code)) return false 
      return true
    }
  }
}
</script>
