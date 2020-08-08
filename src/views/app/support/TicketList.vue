<template>
  <b-container v-if="ticketsRaw.perPage">
    <b-row class="mb-3">
      <b-col>
        <h1>Ticket List 
          <span class="float-right small">
          <router-link :to="{ name: 'new ticket'}">New Support Ticket?</router-link>
          </span>
        </h1>
        <b-form inline class="mb-3">
          <b-pagination
            use-router
            v-model="currentPage"
            :total-rows="ticketsRaw.count || 0"
            :per-page="ticketsRaw.perPage"
            class="mb-2 mr-sm-3 mb-sm-0"
          ></b-pagination>
          <b-input 
            v-model="search"
            type="search"
            placeholder="Search subject"
            class="mb-2 mr-sm-3 mb-sm-0"
            debounce="1000"
          ></b-input>
          <div class="mb-2 mr-sm-3 mb-sm-0">Total: <b>{{ ticketsRaw.count }}</b></div>
        </b-form>
        <b-table 
          responsive
          striped
          hover
          stacked="sm"
          :items="tickets"
          :fields="fields"
          :class="'table'"
        >
          <template v-slot:cell(ticketId)="data">
            <router-link
              variant="primary" 
              v-b-tooltip.hover title="View Ticket Details"
              :to="{ name: 'ticket page', params: { ticketId: data.item.ticketId } }"
            >
            {{ data.item.ticketId }}</router-link>
          </template>
          <template v-slot:cell(subject)="data">
            <router-link
              variant="primary" 
              v-b-tooltip.hover title="View Ticket Details"
              :to="{ name: 'ticket page', params: { ticketId: data.item.ticketId } }"
            >
            {{ data.item.subject }}</router-link>
          </template>
          <template v-slot:cell(ownerEmail)="data">
            {{ data.item.ownerName }}, {{ data.item.ownerEmail}} 
            <router-link 
              variant="primary" 
              v-b-tooltip.hover title="View User Profile"
              :to="{ name: 'user profile', params: { user: data.item.ownerEmail } }"
            >
              <b-icon-person />                  
            </router-link>
          </template>
          <template v-slot:cell(updated_at)="data">
            {{ data.item.updated_at | localTimeFormat }} 
          </template>
          <template v-slot:cell(date)="data">
            {{ data.item.date | localTimeFormat }} 
          </template>
        </b-table>
        <!-- <modal-confirm :title="modal.title" 
          :body="modal.body" 
          :_id="modal._id" 
          @ok="handleConfirmOk(modal.function)"
        /> -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex"
import ApiService from "@/core/ApiService"

// import ModalConfirm from "@/components/ModalConfirm"

export default {
  // components: {
  //   ModalConfirm,
  // },
  data(){
    return {
      //modal: { _id: "", title: "", body:"", function:"" },
      ticketsRaw: { tickets: [] },
      fields: [
        { key: "ticketId" , label: "Id" },  
        { key: "subject" , label: "Subject" },  
        { key: "ownerEmail", label: "User" },
        { key: "status" , label: "Status" },  
        { key: "date", label: "Creation Time" },
        { key: "updated_at", label: "Update Time" }
      ]
    }
  },
  methods: {
    ...mapActions(["setAlert"]),
    invokeTickets() {
      ApiService.get(`/tickets/ticket-list`)
      .then(response => this.ticketsRaw = response.data )
      .catch( error => this.setAlert({ message: error.data.message }) )      
    }
  },

  created() {
    this.invokeTickets()
    // ApiService.get(`/tickets/ticket-list`)
    //   .then(response => this.ticketsRaw = response.data )
    //   .catch( error => this.setAlert({ message: error.data.message }) )
  },
  computed: {
    tickets() {
      return this.ticketsRaw.tickets
    },
    currentPage: {
      get() { 
        return this.$route.query.page || 1 
      },
      set(newPage) {
        this.$router.push({ query: { ...this.$route.query, page: newPage }}).catch(()=>{})
        this.invokeTickets()
      }
    },
    search: {
      get() {
        return this.$route.query.search || ''
      },
      set(search) {
        this.$router.push({ query: { ...this.$route.query, search:search }}).catch(()=>{})
        this.invokeTickets()
      }
    },
  }
}
</script>
