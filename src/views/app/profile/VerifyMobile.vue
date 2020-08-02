<template>
  <b-container v-if="mobile.length>0">
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
          <b-button v-if="!mobileVerify" @click="sendCodeShowModal" variant="outline-secondary" class="ml-2">
            Send Code Again?
          </b-button>
          <b-button v-if="mobileVerify" variant="outline-secondary" class="ml-2" disabled>✓</b-button>
        </b-input-group>
        
      </b-col>
    </b-row>
    
    <b-row class="mb-3" v-if="!mobileVerify">
      <b-col>
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
        </b-input-group>
      </b-col>
    </b-row>
    <b-row v-if="!mobileVerify">
      <b-col>
        <b-button variant="outline-success" @click="verifyMobile"
          >Verify Mobile
        </b-button>
        <!-- <router-link :to="{ name: 'profile' }" class="ml-5">
            Back to Profile
        </router-link> -->
      </b-col>
    </b-row>
    <modal-confirm 
      :title="modal.title" 
      :body="modal.body" 
      @ok="sendCode()"
    />
  </b-container>
</template>

<script>
import ModalConfirm from "@/components/ModalConfirm"
import { mapActions } from "vuex"
import ApiService from "@/core/ApiService"

export default {
  props: [ 'message', 'variant' ],
  components: {
    ModalConfirm,
  },
  data() {
    return {
      modal: { _id: "", title: "", body:"", function:"" },
      code: "",
      mobile: "",
      mobileVerify: "",
      validation: {
        code: `The code is not valid!`
      }
    }
  },
  methods: {
    ...mapActions(["setAlert"]),
    sendCodeShowModal(){
      this.modal.title = `Confirm to Send a new code`
      this.modal.body = `Are you sure you want to send a code to this number <b>${this.mobile}</b>?`
      this.$root.$emit( 'bv::show::modal', 'mainModal', '#btnShow')
    },
    sendCode(){
      ApiService.post("/users/send-verification-sms",{ mobile: this.mobile } )
        .then(response => {
          this.setAlert({ message: response.data.message, variant: response.data.response_type})
        })
        .catch( error => this.setAlert({ message: `Network Error!` }) && console.log(error) )
    },

    verifyMobile() {
      if (!this.validateCode)
        return this.setAlert({ message: this.validation.code })
      
      ApiService.post("/users/receive-verification-sms", {
        mobile: this.mobile,
        code: this.code
      })
        .then(response => { 
          if (response.data.response_type=='success') {
            this.mobileVerify = true
          }
          this.setAlert({ message: response.data.message, variant: response.data.response_type}) 
        })
        .catch(error => this.setAlert({ message: `Network Error!` }) && console.log(error) )
        .finally(() => {this.code = "" })
    }
  },
  created() {
    ApiService.get("/users/profile-get")
      .then(response => {
        this.mobile = response.data.mobile
        this.mobileVerify = response.data.mobileVerify
        if (this.message) {
          const message = this.message
          const variant = this.variant
          this.setAlert({ message, variant })
        }
      })
      .catch(error => this.setAlert({ message: `Network Error!` }) && console.log(error) )
  },
  computed: {
    validateCode() {
      if (!/^\d{4}$/.test(this.code)) return false 
      return true
    }
  }
}
</script>
