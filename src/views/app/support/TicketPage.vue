<template>
  <b-container v-if="ticket.ticketId">
    <b-row>
      <b-col>
        <h5 class="mb-3"><b>{{ ticket.subject }}</b></h5>
        <h1 class="mb-4">
          Support Ticket Id: {{$route.params.ticketId}} 
          <span class="bg-light dark p-2"> {{ticket.status | titleize}}</span> 
          <span class="small float-right" v-if="this.ticket.status =='closed' "> 
            <router-link :to="'/app/support/new'">Add a new support ticket?
            </router-link>
          </span>
        </h1>
        <p v-if="userRole== 'admin'">Associated user: <b>{{ ticket.ownerName }} ({{ticket.ownerEmail}})</b>, 
        <span class="float-right">status: <b>{{ ticket.status || '' | titleize }}</b></span></p>
      </b-col>
    </b-row>
    <b-row v-if="ticket.status !== 'closed'">
      <b-col>
        <hr/>
        <label for="update" >Add note</label>
        <b-input-group>
          <b-form-textarea id="update" v-model="updateText" placeholder="Add notes ..." max-rows="12" >
          </b-form-textarea>
          <b-form-invalid-feedback :state="validateUpdate" v-if=" updateText!='' ">
            {{ validation }} 
          </b-form-invalid-feedback>
        </b-input-group>
        <div class="mt-2">
          <b-button @click="updateTicket" variant="outline-success" class="mr-3 mt-2 mb-2">
            Update Ticket
          </b-button>
          <div class="float-right visible-lg">
            <b-form-checkbox v-model="close" value="closed"  unchecked-value="not-closed" >
              Close Ticket
            </b-form-checkbox>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-3 mb-3" v-for="(update, no) in ticket.updates" :key="update._id"> 
      <b-col>
        <!-- <hr/> -->
        <b-card >
        <p class="small">#{{ ticket.updates.length - no }}, 
          Updated by {{ update.userName }} ({{update.userEmail}}) 
          <span class="float-right">{{update.date | localTimeFormat }}</span>
          
        </p>
        <div style="white-space: pre-line" v-html="update.text"></div>
        </b-card>
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
  props: [ 'message', 'response_type' ],
  data() {
    return {
      ticket: { },
      updateText: '',
      validation: 'Your note is very short ...',
      close: 'not-closed'
    }
  },
  methods: {
    ...mapActions(["setAlert"]),
    updateTicket() {
      if (!this.validateUpdate) return this.setAlert(this.validation)
      const payload = {
        ticketId: this.ticket.ticketId,
        ownerEmail: this.ticket.ownerEmail,
        status: (this.close !== 'closed' ) ? this.ticket.status.toLowerCase().replace(' ','-') : 'closed',
        text: this.updateText
      }
      ApiService.post(`/app-tickets/ticket-update`, payload)
        .then(response => {
         if (response.data.response_type == 'success') {
           this.ticket.updates.unshift(response.data.update) 
           this.ticket.status = (this.close !== 'closed' ) ? this.ticket.status : 'closed'
           this.updateText = ''
         } 
         this.setAlert( _.pick(response.data, ['message', 'response_type']))
        })
        .catch( error => this.setAlert( { message: error.data.message } ))
    }
  },
  created() {
    ApiService.get(`/app-tickets/ticket-get/${this.$route.params.ticketId}`)
      .then(response => {
        this.ticket = response.data
        if (this.message) {
          const message = this.message
          const response_type = this.response_type
          this.setAlert({ message, response_type })
        }
        //if (this.ticket.updates) this.ticket.updates.reverse() 
      })
      .catch( error => this.setAlert( { message: error.data.message } ))
  },
  computed: {
    validateUpdate() {
      if (this.updateText.length>10) return true
      return false
    },
    userRole() {
      const { userRole } = JwtService.decodeToken()
      return userRole
    }
  }
  
}
</script>
