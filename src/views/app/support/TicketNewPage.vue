<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
        <h1>New Support Ticket</h1>
      </b-col>
    </b-row>
    <b-row class="mb-3"
      ><b-col>
        <label for="subject">Subject</label>
        <b-input-group>
          <b-input
            id="subject"
            v-model="subject"
            placeholder="Enter a subject"
          ></b-input>
          <b-form-invalid-feedback :state="validateSubject"
            >{{ subject.length > 0 ? validationSubject : "" }}
          </b-form-invalid-feedback>
        </b-input-group></b-col
      >
    </b-row>
    <b-row >
      <b-col>
        <label for="update" >Add note</label>
        <b-input-group>
          <b-form-textarea id="update" v-model="updateText" placeholder="Add notes ..." max-rows="12" >
          </b-form-textarea>
          <b-form-invalid-feedback :state="validateUpdate" v-if=" updateText!='' ">
            {{ validation }} 
          </b-form-invalid-feedback>
        </b-input-group>
        <div class="mt-2">
          <b-button @click="createTicket" variant="outline-success" class="mr-3 mt-2 mb-2">
            Create Ticket
          </b-button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import _ from "lodash"
import { mapActions } from "vuex"
import ApiService from "@/core/ApiService"
import JwtService from "@/core/JwtService"

export default {
  data() {
    return {
      updateText: '',
      subject: '',
      validation: 'Your note is very short ...',
      validationSubject: 'Your subject is very short ...'
    }
  },
  methods: {
    ...mapActions(["setAlert"]),
    createTicket() {
      if (!this.validateSubject) return this.setAlert(this.validationSubject)
      if (!this.validateUpdate) return this.setAlert(this.validation)
      //todo add select user for ownerEmail
      const { email } = JwtService.decodeToken()
      const payload = {
        subject: this.subject,
        ownerEmail: email,
        text: this.updateText
      }
      ApiService.post(`/app-tickets/ticket-create`, payload)
        .then(response => {
         if (response.data.response_type == 'success') {
           // redirect to the ticket page
           return this.$router.push({ 
              name: 'ticket page', 
              params: _.pick( response.data, ['message','response_type', 'ticketId'])
            })
         } 
         this.setAlert( _.pick(response.data, ['message', 'response_type']))
        })
        .catch( error => this.setAlert( { message: error.data.message } ))
     }
  },
  computed: {
    validateUpdate() {
      if (this.updateText.length>10) return true
      return false
    },
    validateSubject() {
      if (this.subject.length>5) return true
      return false
    }
  }
}
</script>
