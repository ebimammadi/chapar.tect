<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
        <h1>Contact Us</h1>
        <p class="mt-4" >
          <b-icon-telephone class="mr-3"/> 
          <a href="tel:0046732440940">+46 (0) 73 24 40 940</a>
        </p>
        <p class="mt-4">  
          <b-icon-envelope class="mr-3" /> 
          <a href="mailto:info@chapar.tech">info @ chapar.tech</a>
        </p>
        <p class="mt-4">  
          <b-icon-geo-alt class="mr-3" />Stenhammarsvägen 19, 802 67 Gävle, Sweden 
          <a target="_blank" href="https://www.google.com/maps/place/Stenhammarsvägen+19,+802+67+Gävle">
            <b-icon-box-arrow-up-right />
          </a>
        </p>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col class="col-12 col-lg-6">
        <b-card>
          <b-row class="mb-3">
            <b-col>
              <label for="name">Name</label>
              <b-input-group>
                <b-input id="name" v-model="name"  placeholder="Enter your name" />
                <b-form-invalid-feedback v-if="name.length>0" :state="validateName">
                  {{ validation.name }}
                </b-form-invalid-feedback>
              </b-input-group>
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col>
              <label for="email">Email</label>
              <b-input-group>
                <b-input id="email" v-model="email"  placeholder="Enter your email" />
                <b-form-invalid-feedback :state="validateEmail" v-if="email.length>0">
                  {{ validation.email }}
                </b-form-invalid-feedback>
              </b-input-group>
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col>
              <label for="phone">Phone</label>
              <b-input-group>
                <b-input id="phone" v-model="phone"  placeholder="Enter your phone" />
                <b-form-invalid-feedback :state="validatePhone" v-if="phone.length>0">
                  {{ validation.phone }}
                </b-form-invalid-feedback>
              </b-input-group>
            </b-col>
          </b-row>
          <b-row >
            <b-col>
              <h3>Send a message</h3>
              <hr/>
              <label for="update" >Add note</label>
              <b-input-group>
                <b-form-textarea id="update" v-model="message" placeholder="Add notes ..." max-rows="12" >
                </b-form-textarea>
                <b-form-invalid-feedback :state="validateMessage" v-if=" message.length>0 ">
                  {{ validation.message }} 
                </b-form-invalid-feedback>
              </b-input-group>
              <div class="mt-2">
                <b-button @click="submitMessage" variant="outline-success" class="mr-3 mt-2 mb-2">
                  Send Message <b-icon-cursor />
                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-card>
        
      </b-col>
      <b-col class="col-12 col-lg-6">
        <gmap-map :center="center" :zoom="15" style="width:100%;  height: 500px;">
          <gmap-marker :position="center"></gmap-marker>
        </gmap-map>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex"
import { validateEmail } from "@/core/lib.js"
import ApiService from "@/core/ApiService"

export default {
  data() {
    return {
      center: { lat: 60.66703, lng: 17.12173 },
      name: '',
      email: '',
      phone: '',
      message: '',
      validation: {
        name: 'Please enter a valid name.',
        email: 'Enter a valid email.',
        phone: 'Enter a valid phone.',
        message: 'Your message is very short.',
        emailOrPhone: 'Phone or email is required!'
      }
    }
  },
  methods: {
    ...mapActions([ "setAlert" ]),
    submitMessage(){
      if(!this.validateName) return this.setAlert({ message: this.validation.name })
      if (this.email.trim() === '' && this.phone.trim() === '') 
        return this.setAlert({ message: this.validation.emailOrPhone })
      if (this.email.trim() !== '' && !this.validateEmail) 
        return this.setAlert({ message: this.validation.email })
      if (this.phone.trim() !== '' && !this.validatePhone) 
        return this.setAlert({ message: this.validation.phone })
      if (!this.validateMessage) 
        return this.setAlert({ message: this.validation.message })
      const payload = { 
        email: this.email, 
        name: this.name,
        phone: this.phone,
        message: this.message
      }
      ApiService.post("/contact-us-send-message", payload)
        .then(response => {
          if (response.data.response_type == 'success')
            this.email = this.name = this.phone = this.message = ''
          this.setAlert({
            message: response.data.message,
            variant: response.data.response_type
          })
        })
        .catch( error => this.setAlert( { message: error.data.message } ))
        .finally(() => {
          this.email = ""
          this.password = ""
        })
    }
  },
  computed: {
    validateMessage: function(){
      if (this.message.length>10) return true
      return false
    },
    validateName() {
      if (this.name.length>5) return true
      return false
    },
    validateEmail(){
      return validateEmail(this.email)
    },
    validatePhone() {
      const regex = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/
      if (regex.test(this.phone)) return true
      return false
    }
  }
}
</script>
