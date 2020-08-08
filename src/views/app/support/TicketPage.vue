<template>
  <b-container v-if="ticket.ticketId">
    <b-row>
      <b-col>
        <h5 class="mb-3"><b>{{ ticket.subject }}</b></h5>
        <h1 class="mb-4">Support Ticket Id: {{$route.params.ticketId}} <span class="bg-light dark p-2"> {{ticket.status | titleize}}</span>  </h1>
        
        <p>Associated user: <b>{{ ticket.ownerName }} ({{ticket.ownerEmail}})</b>, 
        <span class="float-right">status: <b>{{ ticket.status || '' | titleize }}</b></span></p>
      </b-col>
    </b-row>
    <b-row v-if="ticket.status !== 'closed'">
      <b-col>
        <hr/>
        <label for="update" >Add note</label>
        <b-input-group>
          <b-form-textarea id="update" v-model="updateText" placeholder="Add notes ..." max-rows="12" ></b-form-textarea>
          <b-form-invalid-feedback :state="validateUpdate" v-if=" updateText!='' "> {{ validation }} </b-form-invalid-feedback>
        </b-input-group>
        <div class="mt-2">
          <b-button @click="updateTicket" variant="outline-success" class="mr-3 mt-2 mb-2">
            Update Ticket
          </b-button>
          <div class="float-right visible-lg">
            <b-form-checkbox v-model="close" value="closed"  unchecked-value="not-closed" >Close Ticket</b-form-checkbox>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="mb-3" v-for="(update, no) in ticket.updates" :key="update._id"> 
      <b-col>
        <hr/>
        <p class="small">#{{ ticket.updates.length - no }}, Updated by {{ update.userName }} ({{update.userEmail}}) <span class="float-right">{{update.date | dateTime}}</span></p>
        <div v-html="update.text"></div>
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
      ticket: { },
      updateText: '',
      validation: 'Your note is very short ...',
      close: 'not-closed'
    }
  },
  methods: {
    ...mapActions(["setAlert"]),
    updateTicket(){
      //validate the update,
      //handle the close
      //submit to the backend
      //update the updates array 
      //update the close button
      //if closed close the update box, show add another ticket?! (new tickat page link)
    

    }
  },
  created() {
    ApiService.get(`/tickets/ticket-get/${this.$route.params.ticketId}`)
      .then(response => {
        this.ticket = response.data
        if (this.ticket.updates) this.ticket.updates.reverse() 
      })
      .catch( error => this.setAlert( { message: error.data.message } ))
  },
  computed: {
    validateUpdate() {
      if (this.updateText.length>10) return true
      return false
    }
  }
}
</script>
