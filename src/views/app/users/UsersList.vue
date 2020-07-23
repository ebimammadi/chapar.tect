<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
        <h1 class="mb-3">User list</h1>
        <b-table 
          ref="userTable"
          responsive
          striped
          hover
          stacked="sm"
          :items="users"
          :fields="fields"
        >
          <template v-slot:cell(nameSlot)="data">
            <b-avatar :src="data.value.avatar" />
            {{ data.value.name }} 
            <p v-b-tooltip.hover title="Registration Time" class="mt-2">
              <b-icon-clock> </b-icon-clock> {{ data.value.date }}
              <!-- <b-tooltip target="registration"></b-tooltip> -->
            </p>
          </template>
          <!-- Contact column -->
          <template v-slot:cell(contact)="data">
            <span v-b-tooltip.hover :title="data.value.emailTooltip" >
              {{ data.value.email }} 
              
              <b-icon-check-all 
                v-if="data.value.emailVerify" 
                variant="success"
              > 
              </b-icon-check-all>
              <b-icon-exclamation-circle 
                v-if="!data.value.emailVerify" 
                variant="warning"
              > 
              </b-icon-exclamation-circle>
            </span> 
            <span v-if="data.value.mobile.length>0" v-b-tooltip.hover :title="data.value.mobileTooltip" >
              {{ data.value.mobile }} 
              <b-icon-check-all 
                v-if="data.value.mobileVerify" 
                variant="success"
              > 
              </b-icon-check-all>
              <b-icon-exclamation-circle 
                v-if="!data.value.mobileVerify" 
                variant="warning"
              > 
              </b-icon-exclamation-circle>
            </span> 
          </template>
          <!-- <template v-slot:cell(role)="data">
            <p>{{ data.value }}</p>
          </template> -->
          <!-- status column -->
          <template v-slot:cell(status)="data">
            {{ data.value.status }}
            <b-button @click="userActivateShowModal(data.value._id)"
              :variant=" data.value.status == `Active`? `outline-warning`: `outline-secondary` "
              :id="`activation`+ data.value._id" 
            >
              <b-tooltip :target="`activation`+ data.value._id" triggers="hover">
                {{ data.value.status == `Active`? `Suspend User` : `Activate User` }}
              </b-tooltip>
              <b-icon-pause v-if="data.value.status == `Active`"> </b-icon-pause>
              <b-icon-play v-if="data.value.status != `Active`"> </b-icon-play>
            </b-button>
          </template>
        </b-table>
        <modal-confirm :title="modalTitle" :body="modalBody" :_id="modalID" @ok="userActivateToggle" />
        <!-- <button v-b-modal="'mainModal'">Show Modal</button> -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ModalConfirm from "@/components/ModalConfirm"
// import Vue from "vue"
import ApiService from "@/core/ApiService"
import { mapActions } from "vuex"

export default {
  components: {
    ModalConfirm
  },
  data(){
    return {
      modalTitle: "",
      modalBody: "",
      modalID: "",
      usersRaw: [],
      fields: [
        { key: "nameSlot", label: "User" },
        { key: "contact" , label: "Email/Mobile" },  
        { key: "userRole", label: "Role" },
        { key: "status", label: "Status" },
      ]
    }
  },
  methods: {
    ...mapActions(["setAlert"]),
    userActivateToggle(_id){
       console.log(`process id `,_id) //call backend
      // console.log(_id)
      // this.usersRaw.map(item => {
      //   if (item._id == _id) item.name = item.name + " @@"
      //   return item
      // }) 
    },
    userActivateShowModal(_id){
      const item = this.usersRaw.find( item => item._id === _id)
      const action = item.isActive ? `suspend` : `activate`
      this.modalTitle = item.isActive ? `Suspend User` : `Activate User`
      this.modalBody = `Are you sure to ${action} user <b>${item.name} (${item.email})</b> ?`
      this.modalID = _id
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
        item.contact = {
          email: item.email,
          emailVerify: (item.emailVerify == "true"),
          emailTooltip: (item.emailVerify == "true") ?`Verified Email.` : `Not verified yet!` ,
          mobile: item.mobile ?? "",
          mobileVerify: (item.mobileVerify == "true"),
          mobileTooltip: "Mobile" + ( (item.mobileVerify == "true") ?` is verified.` : ` Not verified yet!` ),
        }
        item.nameSlot = {
          "name": item.name,
          "avatar": item.profilePhotoUrl,
          "date": item.date.split("T")[0]+'-'+(item.date.split("T")[1]).slice(0,5)
        }
        item.status = {
          "status": item.isActive ? `Active` : `Inactive`,
          "verb": item.isActive ? `Suspend` : `Activate`,
          "_id" : item._id,
          "name": item.name,
          "email": item.email
        }
        return item
      })
      return items
    }
  }
  
}
</script>

<style scoped>
p {
  display:inline-block;
}
</style>