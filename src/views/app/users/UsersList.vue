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
            <p v-b-tooltip.hover title="Registration Time" class="mt-2 ml-3">
              <b-icon-clock> </b-icon-clock> {{ data.value.date }}
              <!-- <b-tooltip target="registration"></b-tooltip> -->
            </p>
          </template>
          <template v-slot:cell(contact)="data">
            <p v-b-tooltip.hover :title="data.value.emailToltip" >
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
            </p> 
            <p v-if="data.value.mobile.length>0" v-b-tooltip.hover :title="data.value.mobileToltip" >
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
            </p> 
            <button @click="show(data.value._id)">Click</button>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Vue from "vue"
import ApiService from "@/core/ApiService"
import { mapActions } from "vuex"

export default {
  data(){
    return {
      usersRaw: [],
      fields: [
        "_id",
        { key: "nameSlot", label: "name" },
        { key: "contact" , label: "Email/Mobile" },  
        { key: "userRole", label: "Role" },
        "status"
      ]
    }
  },
  methods: {
    ...mapActions(["setAlert"]),
    show(_id){
      console.log(_id)
      this.usersRaw.map(item => {
        if (item._id == _id) item.name = item.name + "@@"
        return item
      }) 
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
        item.status = item.isActive ? `Active` : `In-active`
        item.contact = {
          _id: item._id,
          email: item.email,
          emailVerify: (item.emailVerify == "true"),
          emailToltip: "Email" + ( (item.emailVerify == "true") ?` is verified.` : ` Not verified yet!` ),
          mobile: item.mobile ?? "",
          mobileVerify: (item.mobileVerify == "true"),
          mobileToltip: "Mobile" + ( (item.mobileVerify == "true") ?` is verified.` : ` Not verified yet!` ),
        }
        item.nameSlot = {
          "name": item.name,
          "avatar": item.profilePhotoUrl,
          "date": item.date.split("T")[0]+'-'+(item.date.split("T")[1]).slice(0,5)
        }
        return item
      })
      return items
    },
    verifyIcon(){
    //const div = `<div`
    console.log (Vue.compile(`<b-icon-check2> </b-icon-check2>`))
    return "2"
    }
  }
  
}
</script>

<style scoped>
p {
  display:inline-block;
}
</style>