<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
        <h1 class="mb-3">User list</h1>
        <b-table 
          responsive
          striped
          hover
          stacked="sm"
          :items="users"
          :fields="fields"
          :class="'table'"
        >
          <!-- userSlot column -->
          <template v-slot:cell(nameSlot)="data">
            <b-avatar :src="data.item.profilePhotoUrl" />
            {{ data.item.name }}
            <router-link 
              variant="primary" 
              v-b-tooltip.hover title="View Profile"
              :to="{ name: 'user profile', params: { user: data.item.email } }"
            >
              <b-icon-person />                  
            </router-link>
            <router-link v-if="data.item.userRole != 'user' "
              variant="primary" 
              v-b-tooltip.hover title="View slug"
              :to="{ name: 'supplier slug', params: { slug: data.item.slug } }"
            >
              <b-icon-eye />                  
            </router-link>
          </template>
          <!-- EmailSlot column -->
          <template v-slot:cell(emailSlot)="data" v-bind:style="{ verticalAlign: 'middle' }">
            <span v-b-tooltip.hover :title="data.value.emailTooltip">
              <b-icon-check-all 
                v-if="data.value.emailVerify" 
                variant="success"
              /> 
              <b-icon-exclamation-circle 
                v-if="!data.value.emailVerify" 
                variant="warning"
              /> {{ data.value.email }} 
            </span> 
          </template>
          <!-- MobileSlot column -->
          <template v-slot:cell(mobileSlot)="data">
            <span v-if="data.value.mobile.length>0" v-b-tooltip.hover :title="data.value.mobileTooltip" >
              {{ data.value.mobile }} 
              <b-icon-check-all 
                v-if="data.value.mobileVerify" 
                variant="success"
              /> 
              <b-icon-exclamation-circle 
                v-if="!data.value.mobileVerify" 
                variant="warning"
              /> 
            </span>
          </template>
          <template v-slot:cell(userRole)="data">
            {{ data.item.userRole | titleize }}
          </template>
          <!-- status column -->
          <template v-slot:cell(status)="data">
            {{ data.value.status | titleize }}
            <b-button @click="userActivateShowModal(data.item._id)"
              variant="link"
              size="sm"
              :id="`activation`+ data.item._id" 
              >
              <b-icon-pencil />
            </b-button>
            <b-tooltip :target="`activation`+ data.item._id">
                {{ data.value.status == `Active`? `Suspend User` : `Activate User` | titleize}}
            </b-tooltip>
          </template>
          <template v-slot:cell(date)="data">
            {{ data.item.date | dateTime }} <b-icon-list-check />
          </template>
        </b-table>
        <modal-confirm 
          :title="modal.title" 
          :body="modal.body" 
          :_id="modalId" 
          @ok="userActivateToggle" 
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ModalConfirm from "@/components/ModalConfirm"
// import BootstrapToggle from 'vue-bootstrap-toggle'

import ApiService from "@/core/ApiService"
import { mapActions } from "vuex"

export default {
  components: {
    ModalConfirm,
  },
  data(){
    return {
      modal: {},
      modalId: "",
      usersRaw: [],
      fields: [
        { key: "nameSlot", label: "User" },
        { key: "emailSlot" , label: "Email" },  
        { key: "mobileSlot" , label: "Mobile" },  
        { key: "userRole", label: "Role" },
        { key: "status", label: "Status" },
        { key: "date", label: "Reg. Time"},
      ]
    }
  },
  methods: {
    ...mapActions(["setAlert"]),
    userActivateToggle(_id){
      _id = _id._id
      const item = this.usersRaw.find( item => item._id === _id )
      const request = item.isActive ? '/users/user-suspend' : '/users/user-activate'
      ApiService.post(request, { _id })
        .then(response => {
          this.setAlert({message: response.data.message, variant: response.data.response_type})
          if (response.data.response_type === "success"){
            this.usersRaw.map(item => {
              if (item._id === _id) item.isActive = !item.isActive
              return item
            })
          }
        })
        .catch(err => console.log(err))
    },
    userActivateShowModal(_id){
      const item = this.usersRaw.find( item => item._id === _id)
      const action = item.isActive ? `suspend` : `activate`
      this.modal.title = item.isActive ? `Suspend User` : `Activate User`
      this.modal.body = `Are you sure to ${action} user <b>${item.name} (${item.email})</b>?`
      this.modalId = _id
      //this.modal._id = _id
      console.log(this.modal._id)
      this.$root.$emit( 'bv::show::modal', 'mainModal', '#btnShow')
    }
  },
  created(){
    ApiService.get("/users/user-list")
      .then(response => (this.usersRaw = response.data))
      .catch(err => console.log(err))
  },
  computed: {
    users() {
      if (this.usersRaw.length == 0) return []
      const items = this.usersRaw.map( item => {
        item.emailSlot = {
          email: item.email,
          emailVerify: (item.emailVerify == "true"),
          emailTooltip: item.emailVerify == "true" ? `Verified Email.` : `Not verified yet!`,
        }
         item.mobileSlot = {
          mobile: item.mobile ?? "",
          mobileVerify: (item.mobileVerify == "true"),
          mobileTooltip: item.mobileVerify == "true" ?`Verified Mobile` : `Not verified yet!`,
        }
        item.status = {
          status: item.isActive ? `Active` : `Suspended`,
          verb: item.isActive ? `Suspend` : `Activate`
        }
        return item
      })
      return items
    }
  }
}
</script>
